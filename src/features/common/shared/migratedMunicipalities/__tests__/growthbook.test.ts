const init = jest.fn();
const refreshFeatures = jest.fn();
const construtor = jest.fn();
const captureMessage = jest.fn();

jest.mock("@growthbook/growthbook", () => ({
    GrowthBookClient: jest.fn().mockImplementation((options: unknown) => {
        construtor(options);
        return { init, refreshFeatures };
    }),
}));
// As jest.fn() ficam fora da factory porque o resetModules abaixo faz a factory
// rodar de novo: nascendo lá dentro, o módulo recarregado chamaria uma
// instância diferente da que o teste inspeciona.
jest.mock("@sentry/nextjs", () => ({
    captureMessage,
    captureException: jest.fn(),
}));

const carregar = async (): Promise<typeof import("../growthbook")> => {
    jest.resetModules();
    return import("../growthbook");
};

describe("getClient", () => {
    beforeEach(() => {
        process.env.GROWTHBOOK_CLIENT_KEY = "sdk-de-teste";
        init.mockResolvedValue({ success: true, source: "network" });
        refreshFeatures.mockResolvedValue(undefined);
    });

    it("Deve desistir e avisar quando falta GROWTHBOOK_CLIENT_KEY", async () => {
        delete process.env.GROWTHBOOK_CLIENT_KEY;
        const { getClient } = await carregar();

        await expect(getClient()).resolves.toBeUndefined();
        expect(captureMessage).toHaveBeenCalledWith(
            expect.stringContaining("GROWTHBOOK_CLIENT_KEY ausente"),
            "error"
        );
    });

    it("Deve inicializar uma vez só e reaproveitar o cliente", async () => {
        const { getClient } = await carregar();

        const primeiro = await getClient();
        const segundo = await getClient();

        expect(primeiro).toBe(segundo);
        expect(init).toHaveBeenCalledTimes(1);
        expect(construtor).toHaveBeenCalledTimes(1);
    });

    it("Deve pedir o payload sem streaming e com teto de tempo", async () => {
        const { getClient } = await carregar();

        await getClient();

        expect(init).toHaveBeenCalledWith({ timeout: 1500, streaming: false });
        expect(refreshFeatures).toHaveBeenCalledWith({ timeout: 1500 });
    });

    it("Deve parar de tentar por um tempo quando o init falha", async () => {
        init.mockResolvedValue({
            success: false,
            source: "timeout",
            error: new Error("timeout"),
        });
        const { getClient } = await carregar();

        await expect(getClient()).resolves.toBeUndefined();
        await expect(getClient()).resolves.toBeUndefined();

        expect(init).toHaveBeenCalledTimes(1);
    });

    it("Deve seguir com o último payload bom quando o refresh falha", async () => {
        refreshFeatures.mockRejectedValue(new Error("cdn fora"));
        const { getClient } = await carregar();

        await expect(getClient()).resolves.toBeDefined();
    });
});

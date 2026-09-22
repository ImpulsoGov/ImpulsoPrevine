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
// As jest.fn() vivem fora da factory porque o resetModules abaixo faz a
// factory rodar de novo: se elas nascessem lá dentro, o módulo recarregado
// chamaria uma instância diferente da que o teste inspeciona.
jest.mock("@sentry/nextjs", () => ({
    captureMessage,
    captureException: jest.fn(),
}));

// O módulo guarda cliente, inicialização e bloqueio em escopo de módulo — cada
// teste precisa de um registro limpo.
const carregar = async (): Promise<typeof import("../growthbook")> => {
    jest.resetModules();
    return import("../growthbook");
};

describe("obterCliente", () => {
    beforeEach(() => {
        process.env.GROWTHBOOK_CLIENT_KEY = "sdk-de-teste";
        init.mockResolvedValue({ success: true, source: "network" });
        refreshFeatures.mockResolvedValue(undefined);
    });

    it("desiste sem GROWTHBOOK_CLIENT_KEY, e avisa", async () => {
        delete process.env.GROWTHBOOK_CLIENT_KEY;
        const { obterCliente } = await carregar();

        await expect(obterCliente()).resolves.toBeUndefined();
        expect(captureMessage).toHaveBeenCalledWith(
            expect.stringContaining("GROWTHBOOK_CLIENT_KEY ausente"),
            "error"
        );
    });

    it("inicializa uma vez só e reaproveita o cliente", async () => {
        const { obterCliente } = await carregar();

        const primeiro = await obterCliente();
        const segundo = await obterCliente();

        expect(primeiro).toBe(segundo);
        expect(init).toHaveBeenCalledTimes(1);
        expect(construtor).toHaveBeenCalledTimes(1);
    });

    it("pede o payload sem streaming e com teto de tempo", async () => {
        const { obterCliente } = await carregar();

        await obterCliente();

        expect(init).toHaveBeenCalledWith({ timeout: 1500, streaming: false });
        expect(refreshFeatures).toHaveBeenCalledWith({ timeout: 1500 });
    });

    it("para de tentar por um tempo quando o init falha", async () => {
        init.mockResolvedValue({
            success: false,
            source: "timeout",
            error: new Error("timeout"),
        });
        const { obterCliente } = await carregar();

        await expect(obterCliente()).resolves.toBeUndefined();
        await expect(obterCliente()).resolves.toBeUndefined();

        // A segunda chamada cai no bloqueio: não paga o timeout de novo.
        expect(init).toHaveBeenCalledTimes(1);
    });

    it("segue com o último payload bom quando o refresh falha", async () => {
        refreshFeatures.mockRejectedValue(new Error("cdn fora"));
        const { obterCliente } = await carregar();

        await expect(obterCliente()).resolves.toBeDefined();
    });
});

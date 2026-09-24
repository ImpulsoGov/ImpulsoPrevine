import { isMigratedMunicipality } from "../index";
import { getClient } from "../growthbook";

jest.mock("../growthbook");
jest.mock("@sentry/nextjs", () => ({
    captureMessage: jest.fn(),
    captureException: jest.fn(),
}));

const getClientMock = getClient as jest.MockedFunction<typeof getClient>;

type Evaluation = { value: unknown; source: string };

const comMapa = (value: unknown, source = "defaultValue"): void => {
    const evalFeature = jest.fn((): Evaluation => ({ value, source }));
    getClientMock.mockResolvedValue({
        evalFeature,
    } as unknown as Awaited<ReturnType<typeof getClient>>);
};

const mapaDeExemplo = {
    ondas: [
        {
            onda: 1,
            liberada_em: "2026-07-24",
            municipios: ["350190", "230125"],
            conecta: ["350190"],
        },
        {
            onda: 2,
            liberada_em: "2026-08-04",
            municipios: ["110014"],
            conecta: [],
        },
    ],
    demo: { municipios: ["111111", "222222"], conecta: ["111111"] },
};

describe("isMigratedMunicipality", () => {
    it("Deve achar município de qualquer onda", async () => {
        comMapa(mapaDeExemplo);

        await expect(isMigratedMunicipality("350190")).resolves.toBe(true);
        await expect(isMigratedMunicipality("110014")).resolves.toBe(true);
    });

    it("Deve ignorar o bloco demo, deixando o município de demonstração no IP", async () => {
        comMapa(mapaDeExemplo);

        await expect(isMigratedMunicipality("111111")).resolves.toBe(false);
        await expect(isMigratedMunicipality("222222")).resolves.toBe(false);
    });

    it("Deve seguir valendo quando o bloco demo está torto", async () => {
        comMapa({
            ondas: [{ municipios: ["350190"] }],
            demo: { municipios: ["1111"], conecta: "nem é lista" },
        });

        await expect(isMigratedMunicipality("350190")).resolves.toBe(true);
    });

    it("Deve negar município fora do mapa", async () => {
        comMapa(mapaDeExemplo);

        await expect(isMigratedMunicipality("999999")).resolves.toBe(false);
    });

    it("Deve ignorar a sublista conecta, porque mensageria não é migração", async () => {
        comMapa({
            ondas: [{ municipios: ["350190"], conecta: ["123456"] }],
        });

        await expect(isMigratedMunicipality("123456")).resolves.toBe(false);
    });

    it("Deve descartar lote malformado sem derrubar os outros", async () => {
        comMapa({
            ondas: [
                { onda: 1, municipios: ["35019"] },
                { onda: 2, municipios: ["110014"] },
            ],
        });

        await expect(isMigratedMunicipality("35019")).resolves.toBe(false);
        await expect(isMigratedMunicipality("110014")).resolves.toBe(true);
    });

    it("Deve negar todo mundo quando o mapa é inválido", async () => {
        comMapa({ oi: "tudo errado" });

        await expect(isMigratedMunicipality("350190")).resolves.toBe(false);
    });

    it("Deve negar todo mundo quando a feature não existe", async () => {
        comMapa(undefined, "unknownFeature");

        await expect(isMigratedMunicipality("350190")).resolves.toBe(false);
    });

    it("Deve negar todo mundo quando o GrowthBook não responde", async () => {
        getClientMock.mockResolvedValue(undefined);

        await expect(isMigratedMunicipality("350190")).resolves.toBe(false);
    });

    it("Deve segurar exceção do SDK para não derrubar o middleware", async () => {
        getClientMock.mockResolvedValue({
            evalFeature: jest.fn(() => {
                throw new Error("o SDK explodiu");
            }),
        } as unknown as Awaited<ReturnType<typeof getClient>>);

        await expect(isMigratedMunicipality("350190")).resolves.toBe(false);
    });

    it("Deve nem consultar o GrowthBook sem código de município", async () => {
        await expect(isMigratedMunicipality(undefined)).resolves.toBe(false);
        expect(getClientMock).not.toHaveBeenCalled();
    });
});

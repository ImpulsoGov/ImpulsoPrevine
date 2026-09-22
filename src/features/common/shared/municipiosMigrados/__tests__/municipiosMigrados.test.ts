import { isMunicipioMigrado } from "../index";
import { obterCliente } from "../growthbook";

jest.mock("../growthbook");
jest.mock("@sentry/nextjs", () => ({
    captureMessage: jest.fn(),
    captureException: jest.fn(),
}));

const obterClienteMock = obterCliente as jest.MockedFunction<
    typeof obterCliente
>;

type Avaliacao = { value: unknown; source: string };

const comMapa = (value: unknown, source = "defaultValue"): void => {
    const evalFeature = jest.fn((): Avaliacao => ({ value, source }));
    obterClienteMock.mockResolvedValue({
        evalFeature,
    } as unknown as Awaited<ReturnType<typeof obterCliente>>);
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

describe("isMunicipioMigrado", () => {
    it("acha município de qualquer onda", async () => {
        comMapa(mapaDeExemplo);

        await expect(isMunicipioMigrado("350190")).resolves.toBe(true);
        await expect(isMunicipioMigrado("110014")).resolves.toBe(true);
    });

    it("acha município de demonstração", async () => {
        comMapa(mapaDeExemplo);

        await expect(isMunicipioMigrado("222222")).resolves.toBe(true);
    });

    it("nega município fora do mapa", async () => {
        comMapa(mapaDeExemplo);

        await expect(isMunicipioMigrado("999999")).resolves.toBe(false);
    });

    it("ignora a sublista conecta: mensageria não é migração", async () => {
        comMapa({
            ondas: [{ municipios: ["350190"], conecta: ["123456"] }],
            demo: { municipios: [], conecta: ["654321"] },
        });

        await expect(isMunicipioMigrado("123456")).resolves.toBe(false);
        await expect(isMunicipioMigrado("654321")).resolves.toBe(false);
    });

    it("descarta lote malformado sem derrubar os outros", async () => {
        comMapa({
            ondas: [
                { onda: 1, municipios: ["35019"] },
                { onda: 2, municipios: ["110014"] },
            ],
            demo: { municipios: [] },
        });

        await expect(isMunicipioMigrado("35019")).resolves.toBe(false);
        await expect(isMunicipioMigrado("110014")).resolves.toBe(true);
    });

    it("não redireciona ninguém quando o mapa é inválido", async () => {
        comMapa({ oi: "tudo errado" });

        await expect(isMunicipioMigrado("350190")).resolves.toBe(false);
    });

    it("não redireciona ninguém quando a feature não existe", async () => {
        comMapa(undefined, "unknownFeature");

        await expect(isMunicipioMigrado("350190")).resolves.toBe(false);
    });

    it("não redireciona ninguém quando o GrowthBook não responde", async () => {
        obterClienteMock.mockResolvedValue(undefined);

        await expect(isMunicipioMigrado("350190")).resolves.toBe(false);
    });

    it("nem consulta o GrowthBook sem código de município", async () => {
        await expect(isMunicipioMigrado(undefined)).resolves.toBe(false);
        expect(obterClienteMock).not.toHaveBeenCalled();
    });
});

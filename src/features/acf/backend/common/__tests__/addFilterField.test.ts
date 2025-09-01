import { addFilterField } from "../QueryBuilder";

describe("addFilterField", () => {
    it("Deve retornar o where sem modificações quando receber um array vazio", () => {
        const result = addFilterField(
            {},
            { microAreaName: [] },
            "microAreaName"
        );
        expect(result).toStrictEqual({});
    });
    it("Deve adicionar o campo corretamente quando receber um array de strings", () => {
        const result = addFilterField(
            {},
            { microAreaName: ["Área 19", "Área 20"] },
            "microAreaName"
        );
        expect(result).toEqual({
            microAreaName: { in: ["Área 19", "Área 20"] },
        });
    });
    it("Deve adicionar o campo corretamente quando receber apenas null", () => {
        const result = addFilterField(
            {},
            { microAreaName: [null] },
            "microAreaName"
        );
        expect(result).toEqual({ microAreaName: null });
    });

    it("Deve adicionar o campo corretamente quando receber null e strings", () => {
        const result = addFilterField(
            {},
            { microAreaName: [null, "Área 19", "Área 20"] },
            "microAreaName"
        );
        expect(result).toEqual({
            OR: [
                { microAreaName: { in: ["Área 19", "Área 20"] } },
                { microAreaName: null },
            ],
        });
    });

    it("Deve mergear o campo corretamente quando receber um objeto where", () => {
        const result = addFilterField(
            { municipalityIdSus: { in: ["111111", "222222"] } },
            { microAreaName: [null, "Área 19", "Área 20"] },
            "microAreaName"
        );
        expect(result).toEqual({
            municipalityIdSus: { in: ["111111", "222222"] },
            OR: [
                { microAreaName: { in: ["Área 19", "Área 20"] } },
                { microAreaName: null },
            ],
        });
    });
});

import { nameFormatter } from "../logic";

describe("nameFormatter", () => {
    it("formata corretamente um nome sem preposições ", () => {
        expect(nameFormatter("SEVERINO BILL")).toBe("Severino Bill");
    });

    it("formata corretamente um único nome", () => {
        expect(nameFormatter("mariazinha")).toBe("Mariazinha");
    });

    it("formata corretamente um nome com preposições", () => {
        expect(nameFormatter("ANA MARIA DA SILVA E SOUZA")).toBe(
            "Ana Maria da Silva e Souza"
        );
    });
});

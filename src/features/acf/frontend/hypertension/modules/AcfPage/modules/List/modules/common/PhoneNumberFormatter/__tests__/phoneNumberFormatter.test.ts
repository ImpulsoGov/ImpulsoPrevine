import { phoneNumberFormatter } from "..";

describe("phoneNumberFormatter", () => {
    it("deve retornar '-' quando o número de telefone for nulo", () => {
        const formatted = phoneNumberFormatter(null);
        expect(formatted).toBe("-");
    });

    describe("quando o número de telefone não pode ser parseado", () => {
        it("deve retornar Inválido se o número não possuir DDI válido", () => {
            const formatted = phoneNumberFormatter("+0098984684501");
            expect(formatted).toBe("Inválido");
        });

        it("deve retornar Inválido se o número não for válido", () => {
            const formatted = phoneNumberFormatter("98984-a84501");
            expect(formatted).toBe("Inválido");
        });
    });

    describe("quando o número de telefone tem DDD", () => {
        it("deve remover caracteres não númericos (exceto + e -) ao redor do número e formata-lo", () => {
            const formatted = phoneNumberFormatter("a/98984684501*");
            expect(formatted).toBe("(98) 98468-4501");
        });

        it("deve formatar o número de telefone celular com o 9 na frente", () => {
            const formatted = phoneNumberFormatter("98984684501");
            expect(formatted).toBe("(98) 98468-4501");
        });

        it("deve formatar o número de telefone fixo", () => {
            const formatted = phoneNumberFormatter("9832564501");
            expect(formatted).toBe("(98) 3256-4501");
        });

        it("deve formatar o número de telefone celular sem o 9 na frente", () => {
            const formatted = phoneNumberFormatter("7399568450");
            expect(formatted).toBe("(73) 9956-8450");
        });
    });

    describe("quando o número de telefone não tem DDD", () => {
        it("deve formatar o número de telefone celular sem o 9 na frente", () => {
            const formatted = phoneNumberFormatter("81568450");
            expect(formatted).toBe("( ) 8156-8450");
        });

        it("deve formatar o número de telefone fixo", () => {
            const formatted = phoneNumberFormatter("33167890");
            expect(formatted).toBe("( ) 3316-7890");
        });

        it("deve formatar o número de telefone celular com o 9 na frente", () => {
            const formatted = phoneNumberFormatter("981568450");
            expect(formatted).toBe("( ) 98156-8450");
        });
    });
});

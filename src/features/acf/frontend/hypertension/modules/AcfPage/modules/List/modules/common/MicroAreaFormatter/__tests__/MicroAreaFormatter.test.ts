import { microAreaFormatter } from "..";

describe("microAreaFormatter", () => {
    it("Deve retornar a string 'Área + número' quando recebe um número sem 0 na frente", () => {
        const string = "123";
        const expectedString = "Área 123";
        expect(microAreaFormatter(string)).toBe(expectedString);
    });

    it("Deve retornar a string 'Área + número' quando recebe um número com 0 na frente", () => {
        const string = "02";
        const expectedString = "Área 2";
        expect(microAreaFormatter(string)).toBe(expectedString);
    });

    it("Deve retornar a string Fora de área quando receber a string 'FA'", () => {
        const string = "FA";
        const expectedString = "Fora de área";
        expect(microAreaFormatter(string)).toBe(expectedString);
    });

    it("Deve retornar '-' quando alguma coisa diferente de um numero ou da string 'FA'so acontece", () => {
        const nullValue = null;
        const expectedString = "-";
        expect(microAreaFormatter(nullValue)).toBe(expectedString);
    });
});

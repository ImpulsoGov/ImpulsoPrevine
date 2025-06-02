import { extractFilters } from "@/features/common/searchParams";

describe("dadosPublicos", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Retorna {} se a URL não contém um searchParam filters", () => {
        const params = new URLSearchParams();
        expect(extractFilters(params)).toEqual({});
    });

    test("Retorna {} se filters é uma string vazia", () => {
        const params = new URLSearchParams();
        params.set("filters", "");
        expect(extractFilters(params)).toEqual({});
    });

    test("Retorna FilterItem se filters contém um valor válido", () => {
        const params = new URLSearchParams();
        params.set("filters", "campo:valor");
        expect(extractFilters(params)).toEqual({ campo: "valor" });
    });

    test("Retorna FilterItem se filters contém mais de um valor válidos", () => {
        const params = new URLSearchParams();
        params.set("filters", "campo:valor;campo2:valor2");
        expect(extractFilters(params)).toEqual({
            campo: "valor",
            campo2: "valor2",
        });
    });

    test("Deve filtrar campos com valores vazios", () => {
        const params = new URLSearchParams();
        params.set("filters", "campo:;campo2:valor2");
        expect(extractFilters(params)).toEqual({
            campo: "",
            campo2: "valor2",
        });
    });

    test("Deve filtrar campos com valores vazios", () => {
        const params = new URLSearchParams();
        params.set("filters", "campo:,;campo2:valor2");
        expect(extractFilters(params)).toEqual({
            campo: ["", ""],
            campo2: "valor2",
        });
    });

    test("Retorna FilterItem com um array caso campo tenha multiplos valores", () => {
        const params = new URLSearchParams();
        params.set("filters", "campo:valor;campo2:valor2,valor3");
        expect(extractFilters(params)).toEqual({
            campo: "valor",
            campo2: ["valor2", "valor3"],
        });
    });
});

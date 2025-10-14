import { BreastCancerCalculator } from "..";
//TODO: Revisar esses testes de unidade
describe("BreastCancerCalculator", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        // Fixa a criação de datas com new Date() para 10 de outubro de 2025
        jest.useFakeTimers().setSystemTime(new Date("2025-10-10"));
    });

    const baseData = {
        birthDay: new Date("1974-01-01"),
        mammographyLastRequestDate: new Date("2022-01-01"),
        mammographyLastEvaluationDate: new Date("2022-02-01"),
    };

    describe("computeLastDate", () => {
        it("deve retornar a data mais recente entre request e evaluation", () => {
            const calc = new BreastCancerCalculator(baseData);
            const result = calc.computeLastDate();
            expect(result).toEqual(new Date("2022-02-01"));
        });

        it("deve retornar a data de request quando evaluation é null", () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                mammographyLastEvaluationDate: null,
            });
            const result = calc.computeLastDate();
            expect(result).toEqual(new Date("2022-01-01"));
        });

        it("deve retornar a data de evaluation quando request é null", () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                papTestLastRequestDate: null,
            });
            const result = calc.computeLastDate();
            expect(result).toEqual(new Date("2022-02-01"));
        });

        it("deve retornar null quando ambas são null", () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                mammographyLastRequestDate: null,
                mammographyLastEvaluationDate: null,
            });
            const result = calc.computeLastDate();
            expect(result).toBeNull();
        });
    });

    describe("computeStatus", () => {
        it('retorna "Não aplica" quando idade está fora da faixa (menor de 50)', () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                birthDay: new Date("2010-01-01"), // 15 anos
            });
            expect(calc.computeStatus()).toBe("Não aplica");
        });

        it('retorna "Não aplica" quando idade está fora da faixa (maior de 69)', () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                birthDay: new Date("1950-01-01"), // 75 anos
            });
            expect(calc.computeStatus()).toBe("Não aplica");
        });

        it('retorna "Nunca realizado" quando não há data de exame', () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                mammographyLastRequestDate: null,
                mammographyLastEvaluationDate: null,
            });
            expect(calc.computeStatus()).toBe("Nunca realizado");
        });

        it('retorna "Atrasada" quando a data de vencimento já passou', () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                mammographyLastRequestDate: new Date("2019-01-01"), // muito antigo
                mammographyLastEvaluationDate: new Date("2019-02-01"),
            });
            expect(calc.computeStatus()).toBe("Atrasada");
        });

        it('retorna "Vence dentro do Q3" quando o prazo vence no quadrimestre atual', () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                mammographyLastRequestDate: new Date("2023-10-01"), // vence antes de 31/12
                mammographyLastEvaluationDate: new Date("2023-10-15"),
            });

            expect(calc.computeStatus()).toBe("Vence dentro do Q3");
        });

        it('retorna "Vence dentro do Q3" quando idade no Exame é menor que 50 anos', () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                birthDay: new Date("1975-01-01"),
                mammographyLastRequestDate: new Date("2023-10-25"),
                mammographyLastEvaluationDate: new Date("2023-10-25"),
            });

            expect(calc.computeStatus()).toBe("Vence dentro do Q3");
        });

        it('retorna "Em dia" quando todos os critérios são atendidos', () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                mammographyLastRequestDate: new Date("2024-01-01"),
                mammographyLastEvaluationDate: new Date("2024-02-01"),
            });
            expect(calc.computeStatus()).toBe("Em dia");
        });
    });
});

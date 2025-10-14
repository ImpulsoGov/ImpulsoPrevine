import { CervixCancerCalculator } from "..";

describe("CervixCancerCalculator", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        // Fixa a criação de datas com new Date() para 10 de outubro de 2025
        jest.useFakeTimers().setSystemTime(new Date("2025-10-10"));
    });

    const baseData = {
        birthDay: new Date("1990-01-01"),
        papTestLastRequestDate: new Date("2022-01-01"),
        papTestLastEvaluationDate: new Date("2022-02-01"),
    };

    describe("computeLastDate", () => {
        it("deve retornar a data mais recente entre request e evaluation", () => {
            const calc = new CervixCancerCalculator(baseData);
            const result = calc.computeLastDate();
            expect(result).toEqual(new Date("2022-02-01"));
        });

        it("deve retornar a data de request quando evaluation é null", () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLastEvaluationDate: null,
            });
            const result = calc.computeLastDate();
            expect(result).toEqual(new Date("2022-01-01"));
        });

        it("deve retornar a data de evaluation quando request é null", () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLastRequestDate: null,
            });
            const result = calc.computeLastDate();
            expect(result).toEqual(new Date("2022-02-01"));
        });

        it("deve retornar null quando ambas são null", () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLastRequestDate: null,
                papTestLastEvaluationDate: null,
            });
            const result = calc.computeLastDate();
            expect(result).toBeNull();
        });
    });

    describe("computeStatus", () => {
        it('retorna "Não aplica" quando idade está fora da faixa (menor de 25)', () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                birthDay: new Date("2010-01-01"), // 15 anos
            });
            expect(calc.computeStatus()).toBe("Não aplica");
        });

        it('retorna "Não aplica" quando idade está fora da faixa (maior de 64)', () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                birthDay: new Date("1950-01-01"), // 75 anos
            });
            expect(calc.computeStatus()).toBe("Não aplica");
        });

        it('retorna "Nunca realizado" quando não há data de exame', () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLastRequestDate: null,
                papTestLastEvaluationDate: null,
            });
            expect(calc.computeStatus()).toBe("Nunca realizado");
        });

        it('retorna "Atrasada" quando a data de vencimento já passou', () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLastRequestDate: new Date("2019-01-01"), // muito antigo
                papTestLastEvaluationDate: new Date("2019-02-01"),
            });
            expect(calc.computeStatus()).toBe("Atrasada");
        });

        it('retorna "Vence dentro do Q3" quando o prazo vence no quadrimestre atual', () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLastRequestDate: new Date("2021-10-01"), // vence antes de 31/12
                papTestLastEvaluationDate: new Date("2022-10-15"),
            });

            expect(calc.computeStatus()).toBe("Vence dentro do Q3");
        });

        it('retorna "Vence dentro do Q3" quando idade no Exame é menor que 25 anos', () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                birthDay: new Date("2000-01-01"),
                papTestLastRequestDate: new Date("2022-10-25"),
                papTestLastEvaluationDate: new Date("2022-10-25"),
            });

            expect(calc.computeStatus()).toBe("Vence dentro do Q3");
        });

        it('retorna "Em dia" quando todos os critérios são atendidos', () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLastRequestDate: new Date("2024-01-01"),
                papTestLastEvaluationDate: new Date("2024-02-01"),
            });
            expect(calc.computeStatus()).toBe("Em dia");
        });
    });
});

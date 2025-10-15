import { CervixCancerCalculator } from "..";

describe("CervixCancerCalculator", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        // Fixa a criação de datas com new Date() para 10 de outubro de 2025
        jest.useFakeTimers().setSystemTime(new Date("2025-10-10"));
    });

    const baseData = {
        birthDate: new Date("1990-01-01"),
        papTestLastRequestDate: new Date("2022-01-01"),
        papTestLastEvaluationDate: new Date("2022-02-01"),
        mammographyLastRequestDate: new Date("2022-01-01"),
        mammographyLastEvaluationDate: new Date("2022-02-01"),
        createdAt: new Date("2025-10-10"),
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
        describe("A boa prática se aplica para essa pessoa?", () => {
            it('retorna "Não aplica" quando idade está fora da faixa (menor de 25)', () => {
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    birthDate: new Date("2010-01-01"), // 15 anos
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });

            it('retorna "Não aplica" quando idade está fora da faixa (maior de 64)', () => {
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    birthDate: new Date("1950-01-01"), // 75 anos
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });
        });

        describe("Essa pessoa possui data do último exame?", () => {
            it('retorna "Nunca realizado" quando não há data de exame', () => {
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    papTestLastRequestDate: null,
                    papTestLastEvaluationDate: null,
                });
                expect(calc.computeStatus()).toBe("Nunca realizado");
            });
        });

        describe("Essa boa prática ainda está dentro do prazo preconizado no indicador?", () => {
            it('retorna "Atrasada" quando a data prazo é anterior a data atual', () => {
                const calc = new CervixCancerCalculator({
                    ...baseData,
                });
                expect(calc.computeStatus()).toBe("Atrasada");
            });
        });

        describe("O prazo dessa boa prática vence no quadrimestre atual?", () => {
            it('retorna "Vence dentro do Q3" quando o prazo vence no quadrimestre atual', () => {
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    papTestLastRequestDate: new Date("2021-10-01"), // vence antes de 31/12
                    papTestLastEvaluationDate: new Date("2022-10-15"),
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        describe("O exame foi realizado ANTES da pessoa estar na faixa etária da boa prática?", () => {
            it('retorna "Vence dentro do Q3" quando idade no Exame é menor que 25 anos', () => {
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    birthDate: new Date("2000-01-01"),
                    papTestLastRequestDate: new Date("2022-10-25"),
                    papTestLastEvaluationDate: new Date("2022-10-25"),
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
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

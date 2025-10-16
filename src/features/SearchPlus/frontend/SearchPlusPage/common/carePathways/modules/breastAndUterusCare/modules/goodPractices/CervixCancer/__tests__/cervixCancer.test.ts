import { CervixCancerCalculator } from "..";

describe("CervixCancerCalculator", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        // Fixa a criação de datas com new Date() para 10 de outubro de 2025
        jest.useFakeTimers().setSystemTime(new Date("2025-10-10"));
    });

    const papTestLastRequestDate = new Date("2022-01-01");
    const papTestLastEvaluationDate = new Date("2022-02-01");
    const baseData = {
        birthDate: new Date("1990-01-01"),
        papTestLastRequestDate: papTestLastRequestDate,
        papTestLastEvaluationDate: papTestLastEvaluationDate,
        mammographyLastRequestDate: new Date("2022-01-01"),
        mammographyLastEvaluationDate: new Date("2022-02-01"),
        lastSexualAndReproductiveHealthAppointmentDate: new Date("2022-01-01"),
        createdAt: new Date("2025-10-10"),
    };

    describe("computeLastDate", () => {
        it("deve retornar a data mais recente entre request e evaluation", () => {
            const calc = new CervixCancerCalculator(baseData);
            const result = calc.computeLastDate();
            expect(result).toEqual(papTestLastEvaluationDate);
        });

        it("deve retornar a data de request quando evaluation é null", () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLastEvaluationDate: null,
            });
            const result = calc.computeLastDate();
            expect(result).toEqual(papTestLastRequestDate);
        });

        it("deve retornar a data de evaluation quando request é null", () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLastRequestDate: null,
            });
            const result = calc.computeLastDate();
            expect(result).toEqual(papTestLastEvaluationDate);
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
                const birthDateFor15YearsOld = new Date("2010-01-01");
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    birthDate: birthDateFor15YearsOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });

            it('retorna "Não aplica" quando idade está fora da faixa (maior de 64)', () => {
                const birthDateFor75YearsOld = new Date("1950-01-01");
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    birthDate: birthDateFor75YearsOld,
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
                //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
                const validDateSmallerThanEndOfQ3 = new Date("2022-10-15");
                const unselectedDate = new Date("2021-10-01");
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    papTestLastRequestDate: unselectedDate,
                    papTestLastEvaluationDate: validDateSmallerThanEndOfQ3,
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        describe("O exame foi realizado ANTES da pessoa estar na faixa etária da boa prática?", () => {
            it('retorna "Vence dentro do Q3" quando idade no Exame é menor que 25 anos', () => {
                // Essa data gera uma idade na data da consulta de 22 anos
                const birthDateFor25YearOld = new Date("2000-01-01");
                //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
                const validDateSmallerThanEndOfQ3 = new Date("2022-10-25");
                const unselectedDate = new Date("2022-10-24");
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    birthDate: birthDateFor25YearOld,
                    papTestLastRequestDate: unselectedDate,
                    papTestLastEvaluationDate: validDateSmallerThanEndOfQ3,
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        it('retorna "Em dia" quando todos os critérios são atendidos', () => {
            //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
            const validDateSmallerThanEndOfQ3 = new Date("2024-02-01");
            const unselectedDate = new Date("2024-01-01");
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLastRequestDate: unselectedDate,
                papTestLastEvaluationDate: validDateSmallerThanEndOfQ3,
            });
            expect(calc.computeStatus()).toBe("Em dia");
        });
    });
});

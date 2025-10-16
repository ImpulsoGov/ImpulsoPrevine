import { SexualAndReproductiveHealthCareCalculator } from "..";

describe("SexualAndReproductiveCare", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        // Fixa a criação de datas com new Date() para 10 de outubro de 2025
        jest.useFakeTimers().setSystemTime(new Date("2025-10-10"));
    });
    const lastSexualAndReproductiveHealthAppointmentDate = new Date(
        "2022-01-01"
    );

    const baseData = {
        birthDate: new Date("1990-01-01"),
        papTestLastRequestDate: new Date("2022-01-01"),
        papTestLastEvaluationDate: new Date("2022-02-01"),
        mammographyLastRequestDate: new Date("2022-01-01"),
        mammographyLastEvaluationDate: new Date("2022-02-01"),
        lastSexualAndReproductiveHealthAppointmentDate:
            lastSexualAndReproductiveHealthAppointmentDate,
        createdAt: new Date("2025-10-10"),
    };

    describe("computeLastDate", () => {
        it("deve retornar a data da última consulta", () => {
            const calc = new SexualAndReproductiveHealthCareCalculator(
                baseData
            );
            const result = calc.computeLastDate();
            expect(result).toEqual(
                lastSexualAndReproductiveHealthAppointmentDate
            );
        });

        it("deve retornar null quando a data da última consulta é null", () => {
            const calc = new SexualAndReproductiveHealthCareCalculator({
                ...baseData,
                lastSexualAndReproductiveHealthAppointmentDate: null,
            });
            const result = calc.computeLastDate();
            expect(result).toBeNull();
        });
    });

    describe("computeStatus", () => {
        describe("A boa prática se aplica para essa pessoa?", () => {
            it('retorna "Não aplica" quando idade está fora da faixa (menor de 14)', () => {
                const birthDateFor10YearOld = new Date("2015-01-01");
                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                    birthDate: birthDateFor10YearOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });

            it('retorna "Não aplica" quando idade está fora da faixa (maior de 69)', () => {
                const birthDateFor75YearOld = new Date("1950-01-01");

                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                    birthDate: birthDateFor75YearOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });
        });

        describe("Essa pessoa possui data do último exame?", () => {
            it('retorna "Nunca realizado" quando não há data de exame', () => {
                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                    lastSexualAndReproductiveHealthAppointmentDate: null,
                });
                expect(calc.computeStatus()).toBe("Nunca realizado");
            });
        });

        describe("Essa boa prática ainda está dentro do prazo preconizado no indicador?", () => {
            it('retorna "Atrasada" quando a data prazo é anterior a data atual', () => {
                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                });
                expect(calc.computeStatus()).toBe("Atrasada");
            });
        });

        describe("O prazo dessa boa prática vence no quadrimestre atual?", () => {
            it('retorna "Vence dentro do Q3" quando o prazo vence no quadrimestre atual', () => {
                //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
                const validDateSmallerThanEndOfQ3 = new Date("2024-10-15");
                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                    lastSexualAndReproductiveHealthAppointmentDate:
                        validDateSmallerThanEndOfQ3,
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        describe("O exame foi realizado ANTES da pessoa estar na faixa etária da boa prática?", () => {
            it('retorna "Vence dentro do Q3" quando idade no Exame é menor que 14 anos', () => {
                // Essa data gera uma idade na data da consulta de 13 anos
                const birthDateFor14YearOld = new Date("2011-01-01");
                //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e > final do Q3 (31/12/2025)
                const validDateGreaterThanEndOfQ3 = new Date("2024-12-01"); //Data prazo 2025-12-01

                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                    birthDate: birthDateFor14YearOld,
                    lastSexualAndReproductiveHealthAppointmentDate:
                        validDateGreaterThanEndOfQ3,
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        it('retorna "Em dia" quando todos os critérios são atendidos', () => {
            // Essa data gera uma idade na data da consulta de 15 anos
            const birthDateFor15YearOld = new Date("2010-01-01");
            //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e > final do Q3 (31/12/2025)
            const validDateGreaterThanEndOfQ3 = new Date("2025-01-01"); //Data prazo 2026-01-01

            const calc = new SexualAndReproductiveHealthCareCalculator({
                ...baseData,
                birthDate: birthDateFor15YearOld,
                lastSexualAndReproductiveHealthAppointmentDate:
                    validDateGreaterThanEndOfQ3,
            });
            expect(calc.computeStatus()).toBe("Em dia");
        });
    });
});

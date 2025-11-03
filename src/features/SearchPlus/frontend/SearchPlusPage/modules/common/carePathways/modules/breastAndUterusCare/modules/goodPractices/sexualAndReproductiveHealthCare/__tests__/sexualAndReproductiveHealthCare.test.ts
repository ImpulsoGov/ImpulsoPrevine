import { SexualAndReproductiveHealthCareCalculator } from "../sexualAndReproductiveHealthCareCalculator";
import { LocalDate } from "@js-joda/core";
describe("SexualAndReproductiveCare", () => {
    const latestSexualAndReproductiveHealthAppointmentDate =
        LocalDate.parse("2022-01-01");

    const baseData = {
        patientBirthDate: LocalDate.parse("1990-01-01"),
        papTestLatestRequestDate: LocalDate.parse("2022-01-01"),
        papTestLatestEvaluationDate: LocalDate.parse("2022-02-01"),
        mammographyLatestRequestDate: LocalDate.parse("2022-01-01"),
        mammographyLatestEvaluationDate: LocalDate.parse("2022-02-01"),
        latestSexualAndReproductiveHealthAppointmentDate:
            latestSexualAndReproductiveHealthAppointmentDate,
        createdAt: LocalDate.parse("2025-10-10"),
    };

    describe("computelatestDate", () => {
        it("deve retornar a data da última consulta", () => {
            const calc = new SexualAndReproductiveHealthCareCalculator(
                baseData
            );
            const result = calc.computelatestDate();
            expect(result).toEqual(
                latestSexualAndReproductiveHealthAppointmentDate
            );
        });

        it("deve retornar null quando a data da última consulta é null", () => {
            const calc = new SexualAndReproductiveHealthCareCalculator({
                ...baseData,
                latestSexualAndReproductiveHealthAppointmentDate: null,
            });
            const result = calc.computelatestDate();
            expect(result).toBeNull();
        });
    });

    describe("computeStatus", () => {
        describe("A boa prática se aplica para essa pessoa?", () => {
            it('retorna "Não aplica" quando idade está fora da faixa (menor de 14)', () => {
                const patientBirthDateFor10YearOld =
                    LocalDate.parse("2015-01-01");
                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                    patientBirthDate: patientBirthDateFor10YearOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });

            it('retorna "Não aplica" quando idade está fora da faixa (maior de 69)', () => {
                const patientBirthDateFor75YearOld =
                    LocalDate.parse("1950-01-01");

                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                    patientBirthDate: patientBirthDateFor75YearOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });
        });

        describe("Essa pessoa possui data do último exame?", () => {
            it('retorna "Nunca realizado" quando não há data de exame', () => {
                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                    latestSexualAndReproductiveHealthAppointmentDate: null,
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
                const validDateSmallerThanEndOfQ3 =
                    LocalDate.parse("2024-10-15");
                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                    latestSexualAndReproductiveHealthAppointmentDate:
                        validDateSmallerThanEndOfQ3,
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        describe("O exame foi realizado ANTES da pessoa estar na faixa etária da boa prática?", () => {
            it('retorna "Vence dentro do Q3" quando idade no Exame é menor que 14 anos', () => {
                // Essa data gera uma idade na data da consulta de 13 anos
                const patientBirthDateFor14YearOld =
                    LocalDate.parse("2011-01-01");
                //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e > final do Q3 (31/12/2025)
                const validDateGreaterThanEndOfQ3 =
                    LocalDate.parse("2024-12-01"); //Data prazo 2025-12-01

                const calc = new SexualAndReproductiveHealthCareCalculator({
                    ...baseData,
                    patientBirthDate: patientBirthDateFor14YearOld,
                    latestSexualAndReproductiveHealthAppointmentDate:
                        validDateGreaterThanEndOfQ3,
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        it('retorna "Em dia" quando todos os critérios são atendidos', () => {
            // Essa data gera uma idade na data da consulta de 15 anos
            const patientBirthDateFor15YearOld = LocalDate.parse("2010-01-01");
            //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e > final do Q3 (31/12/2025)
            const validDateGreaterThanEndOfQ3 = LocalDate.parse("2025-01-01"); //Data prazo 2026-01-01

            const calc = new SexualAndReproductiveHealthCareCalculator({
                ...baseData,
                patientBirthDate: patientBirthDateFor15YearOld,
                latestSexualAndReproductiveHealthAppointmentDate:
                    validDateGreaterThanEndOfQ3,
            });
            expect(calc.computeStatus()).toBe("Em dia");
        });
    });
});

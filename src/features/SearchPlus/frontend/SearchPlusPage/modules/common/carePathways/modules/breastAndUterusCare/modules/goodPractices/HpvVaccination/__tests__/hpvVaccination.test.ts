import { HpvVaccinationCalculator } from "../hpvVaccinationCalculator";
import { LocalDate } from "@js-joda/core";

describe("HpvVaccinationCalculator", () => {
    const baseData = {
        patientBirthDate: LocalDate.parse("1990-01-01"),
        papTestLatestRequestDate: LocalDate.parse("2022-01-01"),
        papTestLatestEvaluationDate: LocalDate.parse("2022-02-01"),
        mammographyLatestRequestDate: LocalDate.parse("2022-01-01"),
        mammographyLatestEvaluationDate: LocalDate.parse("2022-02-01"),
        latestSexualAndReproductiveHealthAppointmentDate:
            LocalDate.parse("2022-01-01"),
        hpvVaccinationDates: [
            LocalDate.parse("2022-02-01"),
            LocalDate.parse("2021-02-01"),
            LocalDate.parse("2020-02-01"),
        ],
        createdAt: LocalDate.parse("2025-10-10"),
    };

    describe("computelatestDate", () => {
        it("deve retornar a data de ultima vacinacao mais recente", () => {
            const calc = new HpvVaccinationCalculator(baseData);
            const result = calc.computelatestDate();
            expect(result).toEqual(baseData.hpvVaccinationDates[0]);
        });

        it("deve retornar null quando nao houver data de ultima vacinacao", () => {
            const calc = new HpvVaccinationCalculator({
                ...baseData,
                hpvVaccinationDates: [],
            });
            const result = calc.computelatestDate();
            expect(result).toBeNull();
        });
    });

    describe("computeStatus", () => {
        describe("A boa prática se aplica para essa pessoa?", () => {
            it('retorna "Não aplica" quando idade está fora da faixa (menor de 9)', () => {
                const birthDateFor5YearsOld = LocalDate.parse("2020-01-01");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    patientBirthDate: birthDateFor5YearsOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });

            it('retorna "Não aplica" quando idade está fora da faixa (maior de 15 anos)', () => {
                const birthDateFor16YearsOld = LocalDate.parse("2009-01-01");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    patientBirthDate: birthDateFor16YearsOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });
            it('retorna "Não aplica" quando completou 15 anos em quadrimestre anterior', () => {
                const birthDateFor15YearsOld = LocalDate.parse("2010-08-31");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    patientBirthDate: birthDateFor15YearsOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });
        });

        describe("Essa pessoa completou 15 anos neste quadrimestre.", () => {
            it('retorna "Perdido" quando a pessoa não possui data da última vacinação e COMPLETOU 15 anos depois do ínicio do quadrimestre e ANTES da data atual', () => {
                //hoje é 10 de outubro, no dia 05 a pessoa já completou 15 anos
                const birthDateFor15YearsOld = LocalDate.parse("2010-10-05");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    hpvVaccinationDates: [],
                    patientBirthDate: birthDateFor15YearsOld,
                });
                expect(calc.computeStatus()).toBe("Perdido");
            });

            it('retorna "Perdido" quando a pessoa não possui data da última vacinação e COMPLETOU 15 anos depois do ínicio do quadrimestre e no dia da exportação da lista do PEC', () => {
                //hoje é 14 de novembro, no dia 14 de novembro a pessoa já completou 15 anos
                const birthDateFor15YearsOld = LocalDate.parse("2010-11-14");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    hpvVaccinationDates: [],
                    patientBirthDate: birthDateFor15YearsOld,
                    createdAt: LocalDate.parse("2025-11-14"),
                });
                expect(calc.computeStatus()).toBe("Perdido");
            });
        });

        describe("Essa pessoa irá completar 15 anos este quadrimestre?", () => {
            it('retorna "Última chance no Q" quando a pessoa irá completar entre a data atual e o final do quadrimestre', () => {
                //a pessoa irá completar 15 anos em 20 de novembro
                const birthDateFor15YearsOldThisQuadri =
                    LocalDate.parse("2010-11-20");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    hpvVaccinationDates: [],
                    patientBirthDate: birthDateFor15YearsOldThisQuadri,
                });
                expect(calc.computeStatus()).toBe("Última chance no Q3");
            });
            it('retorna "Vence dentro do Q" quando a pessoa irá completar 15 anos depois do final do quadrimestre', () => {
                //a pessoa irá completar 15 anos em 01 de janeiro de 2026
                const birthDateFor15YearsOldAfterEndOfQuadri =
                    LocalDate.parse("2011-01-01");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    hpvVaccinationDates: [],
                    patientBirthDate: birthDateFor15YearsOldAfterEndOfQuadri,
                });
                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        describe("A vacinação foi realizada em dose múltipla ANTES da pessoa estar na faixa etária da boa prática ?", () => {
            it("retorna Em dia quando a pessoa realizou pelo menos uma vacinação dentro da faixa etária da boa prática", () => {
                //completou 10 anos na data da vacinação
                const birthDateFor10YearsOldAtVaccination =
                    LocalDate.parse("2014-11-30");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    hpvVaccinationDates: [
                        LocalDate.parse("2024-12-01"),
                        LocalDate.parse("2022-12-01"),
                    ],
                    patientBirthDate: birthDateFor10YearsOldAtVaccination,
                });
                expect(calc.computeStatus()).toBe("Em dia");
            });
            it("retorna Perdido quando a pessoa realizou todas as vacinações antes da faixa etária da boa prática", () => {
                //completou 6 anos na data da vacinação mais recente
                const birthDateFor6YearsOldAtVaccination =
                    LocalDate.parse("2014-11-30");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    hpvVaccinationDates: [
                        LocalDate.parse("2020-12-01"),
                        LocalDate.parse("2019-12-01"),
                    ],
                    patientBirthDate: birthDateFor6YearsOldAtVaccination,
                });
                expect(calc.computeStatus()).toBe("Perdido");
            });
        });

        describe("A vacinação foi realizada em dose única ANTES da pessoa estar na faixa etária da boa prática ?", () => {
            it("retorna Em dia quando a pessoa realizou a vacinação dentro da faixa etária da boa prática", () => {
                //completou 10 anos na data da vacinação
                const birthDateFor10YearsOldAtVaccination =
                    LocalDate.parse("2014-11-30");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    hpvVaccinationDates: [LocalDate.parse("2024-12-01")],
                    patientBirthDate: birthDateFor10YearsOldAtVaccination,
                });
                expect(calc.computeStatus()).toBe("Em dia");
            });
            it("retorna Perdido quando a pessoa realizou a vacinação antes da faixa etária da boa prática", () => {
                //completou 6 anos na data da vacinação
                const birthDateFor6YearsOldAtVaccination =
                    LocalDate.parse("2014-11-30");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    hpvVaccinationDates: [LocalDate.parse("2020-12-01")],
                    patientBirthDate: birthDateFor6YearsOldAtVaccination,
                });
                expect(calc.computeStatus()).toBe("Perdido");
            });
        });
    });
});

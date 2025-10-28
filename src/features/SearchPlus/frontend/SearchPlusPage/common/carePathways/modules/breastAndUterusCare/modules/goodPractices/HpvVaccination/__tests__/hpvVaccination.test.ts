import { HpvVaccinationCalculator } from "../hpvVaccinationCalculator";

describe("HpvVaccinationCalculator", () => {
    const baseData = {
        patientBirthDate: new Date("1990-01-01"),
        papTestLatestRequestDate: new Date("2022-01-01"),
        papTestLatestEvaluationDate: new Date("2022-02-01"),
        mammographyLatestRequestDate: new Date("2022-01-01"),
        mammographyLatestEvaluationDate: new Date("2022-02-01"),
        latestSexualAndReproductiveHealthAppointmentDate: new Date(
            "2022-01-01"
        ),
        latestHpvVaccinationDate: new Date("2022-02-01"),
        createdAt: new Date("2025-10-10"),
    };

    describe("computelatestDate", () => {
        it("deve retornar a data de ultima vacinacao", () => {
            const calc = new HpvVaccinationCalculator(baseData);
            const result = calc.computelatestDate();
            expect(result).toEqual(baseData.latestHpvVaccinationDate);
        });

        it("deve retornar null quando nao houver data de ultima vacinacao", () => {
            const calc = new HpvVaccinationCalculator({
                ...baseData,
                latestHpvVaccinationDate: null,
            });
            const result = calc.computelatestDate();
            expect(result).toBeNull();
        });
    });

    describe("computeStatus", () => {
        describe("A boa prática se aplica para essa pessoa?", () => {
            it('retorna "Não aplica" quando idade está fora da faixa (menor de 9)', () => {
                const birthDateFor5YearsOld = new Date("2020-01-01");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    patientBirthDate: birthDateFor5YearsOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });

            it('retorna "Não aplica" quando idade está fora da faixa (maior de 15 anos)', () => {
                const birthDateFor16YearsOld = new Date("2009-01-01");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    patientBirthDate: birthDateFor16YearsOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });
        });
        //Essa pessoa possui data da última vacinação?
        describe("Essa pessoa NÃO possui data da última vacinação", () => {
            it('retorna "Perdido" quando a pessoa completou 15 anos nesse quadrimestre', () => {
                //hoje é 10 de outubro, no dia 05 a pessoa já completou 15 anos
                const birthDateFor15YearsOldThisQuadri = new Date("2010-10-05");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    latestHpvVaccinationDate: null,
                    patientBirthDate: birthDateFor15YearsOldThisQuadri,
                });
                expect(calc.computeStatus()).toBe("Perdido");
            });

            it('retorna "Última chance no Q" quando a pessoa irá completar 15 anos nesse quadrimestre', () => {
                //hoje é 10 de outubro, a pessoa irá completar 15 anos em 20 de novembro
                const birthDateFor15YearsOldThisQuadri = new Date("2010-11-20");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    latestHpvVaccinationDate: null,
                    patientBirthDate: birthDateFor15YearsOldThisQuadri,
                });
                expect(calc.computeStatus()).toBe("Última chance no Q3");
            });

            it('retorna "Vence dentro do Q" quando a pessoa NÃO irá completar 15 anos nesse quadrimestre', () => {
                //a pessoa irá completar 14 anos em 20 de novembro
                const birthDateFor15YearsOldThisQuadri = new Date("2011-11-20");
                const calc = new HpvVaccinationCalculator({
                    ...baseData,
                    latestHpvVaccinationDate: null,
                    patientBirthDate: birthDateFor15YearsOldThisQuadri,
                });
                expect(calc.computeStatus()).toBe("Última chance no Q3");
            });
        });
    });
});

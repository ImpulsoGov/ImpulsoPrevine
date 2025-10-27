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

    //     describe("computeStatus", () => {
    //         describe("A boa prática se aplica para essa pessoa?", () => {
    //             it('retorna "Não aplica" quando idade está fora da faixa (menor de 25)', () => {
    //                 const birthDateFor15YearsOld = new Date("2010-01-01");
    //                 const calc = new CervixCancerCalculator({
    //                     ...baseData,
    //                     patientBirthDate: birthDateFor15YearsOld,
    //                 });
    //                 expect(calc.computeStatus()).toBe("Não aplica");
    //             });

    //             it('retorna "Não aplica" quando idade está fora da faixa (maior de 64)', () => {
    //                 const birthDateFor75YearsOld = new Date("1950-01-01");
    //                 const calc = new CervixCancerCalculator({
    //                     ...baseData,
    //                     patientBirthDate: birthDateFor75YearsOld,
    //                 });
    //                 expect(calc.computeStatus()).toBe("Não aplica");
    //             });
    //         });

    //         describe("Essa pessoa possui data do último exame?", () => {
    //             it('retorna "Nunca realizado" quando não há data de exame', () => {
    //                 const calc = new CervixCancerCalculator({
    //                     ...baseData,
    //                     papTestLatestRequestDate: null,
    //                     papTestLatestEvaluationDate: null,
    //                 });
    //                 expect(calc.computeStatus()).toBe("Nunca realizado");
    //             });
    //         });

    //         describe("Essa boa prática ainda está dentro do prazo preconizado no indicador?", () => {
    //             it('retorna "Atrasada" quando a data prazo é anterior a data atual', () => {
    //                 const calc = new CervixCancerCalculator({
    //                     ...baseData,
    //                 });
    //                 expect(calc.computeStatus()).toBe("Atrasada");
    //             });
    //         });

    //         describe("O prazo dessa boa prática vence no quadrimestre atual?", () => {
    //             it('retorna "Vence dentro do Q3" quando o prazo vence no quadrimestre atual', () => {
    //                 //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
    //                 const validDateSmallerThanEndOfQ3 = new Date("2022-10-15");
    //                 const unselectedDate = new Date("2021-10-01");
    //                 const calc = new CervixCancerCalculator({
    //                     ...baseData,
    //                     papTestLatestRequestDate: unselectedDate,
    //                     papTestLatestEvaluationDate: validDateSmallerThanEndOfQ3,
    //                 });

    //                 expect(calc.computeStatus()).toBe("Vence dentro do Q3");
    //             });
    //         });

    //         describe("O exame foi realizado ANTES da pessoa estar na faixa etária da boa prática?", () => {
    //             it('retorna "Vence dentro do Q3" quando idade no Exame é menor que 25 anos', () => {
    //                 // Essa data gera uma idade na data da consulta de 22 anos
    //                 const birthDateFor25YearOld = new Date("2000-01-01");
    //                 //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
    //                 const validDateSmallerThanEndOfQ3 = new Date("2022-10-25");
    //                 const unselectedDate = new Date("2022-10-24");
    //                 const calc = new CervixCancerCalculator({
    //                     ...baseData,
    //                     patientBirthDate: birthDateFor25YearOld,
    //                     papTestLatestRequestDate: unselectedDate,
    //                     papTestLatestEvaluationDate: validDateSmallerThanEndOfQ3,
    //                 });

    //                 expect(calc.computeStatus()).toBe("Vence dentro do Q3");
    //             });
    //         });

    //         it('retorna "Em dia" quando todos os critérios são atendidos', () => {
    //             //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
    //             const validDateSmallerThanEndOfQ3 = new Date("2024-02-01");
    //             const unselectedDate = new Date("2024-01-01");
    //             const calc = new CervixCancerCalculator({
    //                 ...baseData,
    //                 papTestLatestRequestDate: unselectedDate,
    //                 papTestLatestEvaluationDate: validDateSmallerThanEndOfQ3,
    //             });
    //             expect(calc.computeStatus()).toBe("Em dia");
    //         });
    //     });
});

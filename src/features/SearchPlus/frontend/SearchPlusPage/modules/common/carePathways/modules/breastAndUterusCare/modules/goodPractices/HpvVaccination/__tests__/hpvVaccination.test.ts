// import { HpvVaccinationCalculator } from "../hpvVaccinationCalculator";
// import { LocalDate } from "@js-joda/core";

// describe("HpvVaccinationCalculator", () => {
//     const baseData = {
//         patientBirthDate: LocalDate.parse("1990-01-01"),
//         papTestLatestRequestDate: LocalDate.parse("2022-01-01"),
//         papTestLatestEvaluationDate: LocalDate.parse("2022-02-01"),
//         mammographyLatestRequestDate: LocalDate.parse("2022-01-01"),
//         mammographyLatestEvaluationDate: LocalDate.parse("2022-02-01"),
//         latestSexualAndReproductiveHealthAppointmentDate:
//             LocalDate.parse("2022-01-01"),
//         latestHpvVaccinationDate: LocalDate.parse("2022-02-01"),
//         createdAt: LocalDate.parse("2025-10-10"),
//     };

//     describe("computelatestDate", () => {
//         it("deve retornar a data de ultima vacinacao", () => {
//             const calc = new HpvVaccinationCalculator(baseData);
//             const result = calc.computelatestDate();
//             expect(result).toEqual(baseData.latestHpvVaccinationDate);
//         });

//         it("deve retornar null quando nao houver data de ultima vacinacao", () => {
//             const calc = new HpvVaccinationCalculator({
//                 ...baseData,
//                 latestHpvVaccinationDate: null,
//             });
//             const result = calc.computelatestDate();
//             expect(result).toBeNull();
//         });
//     });

//     describe("computeStatus", () => {
//         describe("A boa prática se aplica para essa pessoa?", () => {
//             it('retorna "Não aplica" quando idade está fora da faixa (menor de 9)', () => {
//                 const birthDateFor5YearsOld = LocalDate.parse("2020-01-01");
//                 const calc = new HpvVaccinationCalculator({
//                     ...baseData,
//                     patientBirthDate: birthDateFor5YearsOld,
//                 });
//                 expect(calc.computeStatus()).toBe("Não aplica");
//             });

//             it('retorna "Não aplica" quando idade está fora da faixa (maior de 15 anos)', () => {
//                 const birthDateFor16YearsOld = LocalDate.parse("2009-01-01");
//                 const calc = new HpvVaccinationCalculator({
//                     ...baseData,
//                     patientBirthDate: birthDateFor16YearsOld,
//                 });
//                 expect(calc.computeStatus()).toBe("Não aplica");
//             });
//             it('retorna "Não aplica" quando completou 15 anos em quadrimestre anterior', () => {
//                 const birthDateFor15YearsOld = LocalDate.parse("2010-08-31");
//                 const calc = new HpvVaccinationCalculator({
//                     ...baseData,
//                     patientBirthDate: birthDateFor15YearsOld,
//                 });
//                 expect(calc.computeStatus()).toBe("Não aplica");
//             });
//         });

//         describe("Essa pessoa completou 15 anos neste quadrimestre.", () => {
//             it('retorna "Perdido" quando a pessoa não possui data da última vacinação e COMPLETOU 15 anos depois do ínicio do quadrimestre e ANTES da data atual', () => {
//                 //hoje é 10 de outubro, no dia 05 a pessoa já completou 15 anos
//                 const birthDateFor15YearsOld = LocalDate.parse("2010-10-05");
//                 const calc = new HpvVaccinationCalculator({
//                     ...baseData,
//                     latestHpvVaccinationDate: null,
//                     patientBirthDate: birthDateFor15YearsOld,
//                 });
//                 expect(calc.computeStatus()).toBe("Perdido");
//             });
//             it("retorna Em dia quando a pessoa realizou a vacinação dentro da faixa etária da boa prática", () => {
//                 //completou 13 anos em 30 de novembro
//                 const birthDateFor13YearsOld = LocalDate.parse("2012-11-30");
//                 const calc = new HpvVaccinationCalculator({
//                     ...baseData,
//                     latestHpvVaccinationDate: null,
//                     patientBirthDate: birthDateFor13YearsOld,
//                 });
//                 expect(calc.computeStatus()).toBe("Em dia");
//             });

//             it('retorna "Vence dentro do Q" quando a pessoa se vacinou ANTES de estar na faixa etária da boa prática e NÃO irá completar 15 anos nesse quadrimestre', () => {
//                 //a pessoa irá completar 14 anos em 20 de novembro
//                 const birthDateFor15YearsOldThisQuadri =
//                     LocalDate.parse("2011-11-20");
//                 const calc = new HpvVaccinationCalculator({
//                     ...baseData,
//                     //A pessoa se vacinou com 8 anos
//                     latestHpvVaccinationDate: null,
//                     patientBirthDate: birthDateFor15YearsOldThisQuadri,
//                 });
//                 expect(calc.computeStatus()).toBe("Vence dentro do Q3");
//             });

//             it('retorna "Última chance no Q " quando a pessoa se vacinou ANTES de estar na faixa etária da boa prática e IRÁ completar 15 anos nesse quadrimestre', () => {
//                 //hoje é 10 de outubro, a pessoa irá completar 15 anos em 30 de novembro
//                 const birthDateFor15YearsOldThisQuadri =
//                     LocalDate.parse("2010-11-30");
//                 const calc = new HpvVaccinationCalculator({
//                     ...baseData,
//                     latestHpvVaccinationDate: null,
//                     patientBirthDate: birthDateFor15YearsOldThisQuadri,
//                 });
//                 expect(calc.computeStatus()).toBe("Última chance no Q3");
//             });
//         });
//         describe("Essa pessoa irá completar 15 anos este quadrimestre?", () => {});

//         //Ainda falta confirmar o fluxo
//         describe("A vacinação foi realizada ANTES da pessoa estar na faixa etária da boa prática ?", () => {});
//     });
// });

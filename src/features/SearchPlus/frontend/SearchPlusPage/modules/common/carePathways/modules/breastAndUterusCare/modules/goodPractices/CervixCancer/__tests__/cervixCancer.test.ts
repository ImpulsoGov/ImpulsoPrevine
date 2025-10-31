import { CervixCancerCalculator } from "../cervixCancerCalculator";
import { LocalDate } from "@js-joda/core";
describe("CervixCancerCalculator", () => {
    const papTestLatestRequestDate = LocalDate.parse("2022-01-01");
    const papTestLatestEvaluationDate = LocalDate.parse("2022-02-01");
    const baseData = {
        patientBirthDate: LocalDate.parse("1990-01-01"),
        papTestLatestRequestDate: papTestLatestRequestDate,
        papTestLatestEvaluationDate: papTestLatestEvaluationDate,
        mammographyLatestRequestDate: LocalDate.parse("2022-01-01"),
        mammographyLatestEvaluationDate: LocalDate.parse("2022-02-01"),
        latestSexualAndReproductiveHealthAppointmentDate:
            LocalDate.parse("2022-01-01"),
        createdAt: LocalDate.parse("2025-10-10"),
    };

    describe("computelatestDate", () => {
        it("deve retornar a data mais recente entre request e evaluation", () => {
            const calc = new CervixCancerCalculator(baseData);
            const result = calc.computelatestDate();
            expect(result).toEqual(papTestLatestEvaluationDate);
        });

        it("deve retornar a data de request quando evaluation é null", () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLatestEvaluationDate: null,
            });
            const result = calc.computelatestDate();
            expect(result).toEqual(papTestLatestRequestDate);
        });

        it("deve retornar a data de evaluation quando request é null", () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLatestRequestDate: null,
            });
            const result = calc.computelatestDate();
            expect(result).toEqual(papTestLatestEvaluationDate);
        });

        it("deve retornar null quando ambas são null", () => {
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLatestRequestDate: null,
                papTestLatestEvaluationDate: null,
            });
            const result = calc.computelatestDate();
            expect(result).toBeNull();
        });
    });

    describe("computeStatus", () => {
        describe("A boa prática se aplica para essa pessoa?", () => {
            it('retorna "Não aplica" quando idade está fora da faixa (menor de 25)', () => {
                const birthDateFor15YearsOld = LocalDate.parse("2010-01-01");
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    patientBirthDate: birthDateFor15YearsOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });

            it('retorna "Não aplica" quando idade está fora da faixa (maior de 64)', () => {
                const birthDateFor75YearsOld = LocalDate.parse("1950-01-01");
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    patientBirthDate: birthDateFor75YearsOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });
        });

        describe("Essa pessoa possui data do último exame?", () => {
            it('retorna "Nunca realizado" quando não há data de exame', () => {
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    papTestLatestRequestDate: null,
                    papTestLatestEvaluationDate: null,
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
                const validDateSmallerThanEndOfQ3 =
                    LocalDate.parse("2022-10-15");
                const unselectedDate = LocalDate.parse("2021-10-01");
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    papTestLatestRequestDate: unselectedDate,
                    papTestLatestEvaluationDate: validDateSmallerThanEndOfQ3,
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        describe("O exame foi realizado ANTES da pessoa estar na faixa etária da boa prática?", () => {
            it('retorna "Vence dentro do Q3" quando idade no Exame é menor que 25 anos', () => {
                // Essa data gera uma idade na data da consulta de 22 anos
                const birthDateFor25YearOld = LocalDate.parse("2000-01-01");
                //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
                const validDateSmallerThanEndOfQ3 =
                    LocalDate.parse("2022-10-25");
                const unselectedDate = LocalDate.parse("2022-10-24");
                const calc = new CervixCancerCalculator({
                    ...baseData,
                    patientBirthDate: birthDateFor25YearOld,
                    papTestLatestRequestDate: unselectedDate,
                    papTestLatestEvaluationDate: validDateSmallerThanEndOfQ3,
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        it('retorna "Em dia" quando todos os critérios são atendidos', () => {
            //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
            const validDateSmallerThanEndOfQ3 = LocalDate.parse("2024-02-01");
            const unselectedDate = LocalDate.parse("2024-01-01");
            const calc = new CervixCancerCalculator({
                ...baseData,
                papTestLatestRequestDate: unselectedDate,
                papTestLatestEvaluationDate: validDateSmallerThanEndOfQ3,
            });
            expect(calc.computeStatus()).toBe("Em dia");
        });
    });
});

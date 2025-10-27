import { BreastCancerCalculator } from "../breastCancerCalculator";

describe("BreastCancerCalculator", () => {
    const mammographyLatestRequestDate = new Date("2022-01-01");
    const mammographyLatestEvaluationDate = new Date("2022-02-01");
    const baseData = {
        patientBirthDate: new Date("1974-01-01"),
        mammographyLatestRequestDate: mammographyLatestRequestDate,
        mammographyLatestEvaluationDate: mammographyLatestEvaluationDate,
        papTestLatestRequestDate: new Date("2022-01-01"),
        papTestLatestEvaluationDate: new Date("2022-01-01"),
        latestSexualAndReproductiveHealthAppointmentDate: new Date(
            "2022-01-01"
        ),
        createdAt: new Date("2025-10-10"),
    };

    describe("computelatestDate", () => {
        it("deve retornar a data mais recente entre request e evaluation", () => {
            const calc = new BreastCancerCalculator(baseData);
            const result = calc.computelatestDate();
            expect(result).toEqual(mammographyLatestEvaluationDate);
        });

        it("deve retornar a data de request quando evaluation é null", () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                mammographyLatestEvaluationDate: null,
            });
            const result = calc.computelatestDate();
            expect(result).toEqual(mammographyLatestRequestDate);
        });

        it("deve retornar a data de evaluation quando request é null", () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                mammographyLatestRequestDate: null,
            });
            const result = calc.computelatestDate();
            expect(result).toEqual(mammographyLatestEvaluationDate);
        });

        it("deve retornar null quando ambas são null", () => {
            const calc = new BreastCancerCalculator({
                ...baseData,
                mammographyLatestRequestDate: null,
                mammographyLatestEvaluationDate: null,
            });
            const result = calc.computelatestDate();
            expect(result).toBeNull();
        });
    });

    describe("computeStatus", () => {
        describe("A boa prática se aplica para essa pessoa?", () => {
            it('retorna "Não aplica" quando idade está fora da faixa (menor de 50)', () => {
                const patientBirthDateFor15YearsOld = new Date("2010-01-01");
                const calc = new BreastCancerCalculator({
                    ...baseData,
                    patientBirthDate: patientBirthDateFor15YearsOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });

            it('retorna "Não aplica" quando idade está fora da faixa (maior de 69)', () => {
                const patientBirthDateFor75YearsOld = new Date("1950-01-01");
                const calc = new BreastCancerCalculator({
                    ...baseData,
                    patientBirthDate: patientBirthDateFor75YearsOld,
                });
                expect(calc.computeStatus()).toBe("Não aplica");
            });
        });

        describe("Essa pessoa possui data do último exame?", () => {
            it('retorna "Nunca realizado" quando não há data de exame', () => {
                const calc = new BreastCancerCalculator({
                    ...baseData,
                    mammographyLatestRequestDate: null,
                    mammographyLatestEvaluationDate: null,
                });
                expect(calc.computeStatus()).toBe("Nunca realizado");
            });
        });

        describe("Esta boa prática ainda está dentro do prazo preconizado no indicador?", () => {
            it('retorna "Atrasada" quando a data prazo é anterior a data atual', () => {
                const calc = new BreastCancerCalculator(baseData);
                expect(calc.computeStatus()).toBe("Atrasada");
            });
        });

        describe("O prazo dessa boa prática vence no quadrimestre atual?", () => {
            it('retorna "Vence dentro do Q3" quando o prazo vence no quadrimestre atual', () => {
                //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
                const validDateSmallerThanEndOfQ3 = new Date("2023-10-15");
                const unselectedDate = new Date("2023-10-01");
                const calc = new BreastCancerCalculator({
                    ...baseData,
                    mammographyLatestRequestDate: unselectedDate,
                    mammographyLatestEvaluationDate:
                        validDateSmallerThanEndOfQ3,
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        describe("O exame foi realizado ANTES da pessoa estar na faixa etária da boa prática? ", () => {
            it('retorna "Vence dentro do Q3" quando idade no Exame é menor que 50 anos', () => {
                // Essa data gera uma idade na data da consulta de 48 anos
                const patientBirthDateFor50YearOld = new Date("1975-01-01");
                //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
                const validDateSmallerThanEndOfQ3 = new Date("2023-10-25");
                const unselectedDate = new Date("2023-10-24");
                const calc = new BreastCancerCalculator({
                    ...baseData,
                    patientBirthDate: patientBirthDateFor50YearOld,
                    mammographyLatestRequestDate: validDateSmallerThanEndOfQ3,
                    mammographyLatestEvaluationDate: unselectedDate,
                });

                expect(calc.computeStatus()).toBe("Vence dentro do Q3");
            });
        });

        it('retorna "Em dia" quando todos os critérios são atendidos', () => {
            //Essa data de consulta resulta em uma data prazo >= data atual (createdAt) e <= final do Q3 (31/12/2025)
            const validDateSmallerThanEndOfQ3 = new Date("2024-02-01");
            const unselectedDate = new Date("2024-01-01");
            const calc = new BreastCancerCalculator({
                ...baseData,
                mammographyLatestRequestDate: unselectedDate,
                mammographyLatestEvaluationDate: validDateSmallerThanEndOfQ3,
            });
            expect(calc.computeStatus()).toBe("Em dia");
        });
    });
});

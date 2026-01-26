import { WeightAndHeightMeasurementCalculator } from "../WeightAndHeightMeasurementCalculator";
import type { InputData } from "../WeightAndHeightMeasurementCalculator";

const baseInput = (): InputData => ({
    gestationalAgeByLastMenstrualPeriodWeeks: 20,
    gestationalAgeByLastMenstrualPeriodDays: 0,
    gestationalAgeByObstreticalUltrasoundWeeks: null,
    gestationalAgeByObstreticalUltrasoundDays: null,
    weightAndHeightMeasurements: 0,
    appointmentsDuringPuerperium: 0,
    homeVisitsDuringPuerperium: 0,
});

describe("WeightAndHeightMeasurementCalculator", () => {
    describe("computeMeasurements", () => {
        it("retorna o número de medições simultâneas informado", () => {
            const data = {
                ...baseInput(),
                weightAndHeightSimultaneousMeasurements: 5,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeMeasurements()).toBe(5);
        });
    });

    describe("computeStatus - IG inválida", () => {
        it("retorna 'disabled' quando semanas da gestação são null", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: null,
                gestationalAgeByObstreticalUltrasoundWeeks: null,
                gestationalAgeByObstreticalUltrasoundDays: null,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });

        it("retorna 'disabled' quando dias da gestação são null", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodDays: null,
                gestationalAgeByObstreticalUltrasoundWeeks: null,
                gestationalAgeByObstreticalUltrasoundDays: null,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });
    });

    describe("computeStatus - cálculo durante o pré-natal (IG <= 42 semanas e 0 dias)", () => {
        it("retorna 'danger' quando não há medições simultâneas", () => {
            const data = {
                ...baseInput(),
                weightAndHeightSimultaneousMeasurements: 0,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "danger" });
        });

        it("retorna 'warning' quando foram feitas menos de 4 medições simultâneas", () => {
            const data = {
                ...baseInput(),
                weightAndHeightSimultaneousMeasurements: 3,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "warning" });
        });

        it("retorna 'attention' quando foram feitas entre 4 e 6 medições simultâneas", () => {
            const data = {
                ...baseInput(),
                weightAndHeightSimultaneousMeasurements: 5,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "attention" });
        });

        it("retorna 'success' quando foram feitas 7 ou mais medições simultâneas", () => {
            const data = {
                ...baseInput(),
                weightAndHeightSimultaneousMeasurements: 7,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });
    });

    describe("computeStatus - uso de ultrassom obstétrico", () => {
        it("prioriza idade gestacional por ultrassom quando disponível", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 10,
                gestationalAgeByLastMenstrualPeriodDays: 0,
                gestationalAgeByObstreticalUltrasoundWeeks: 30,
                gestationalAgeByObstreticalUltrasoundDays: 0,
                weightAndHeightSimultaneousMeasurements: 0,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "danger" });
        });
    });

    describe("computeStatus - limite máximo de idade gestacional", () => {
        it("retorna 'disabled' quando IG >= 42 semanas + 0 dias e medições simultâneas < 7", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 1,
                weightAndHeightSimultaneousMeasurements: 6,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });

        it("retorna 'success' quando IG >= 42 semanas + 0 dias e medições simultâneas >= 7", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 1,
                weightAndHeightSimultaneousMeasurements: 7,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });

        it("retorna 'danger' quando IG = 42 semanas + 0 dias e medições simultâneas = 0", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 0,
                weightAndHeightSimultaneousMeasurements: 0,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "danger" });
        });
    });

    describe("computeStatus - há consulta ou visita feita durante o purpério", () => {
        it("retorna 'disabled' quando a quantidade de medições simultâneas é menor que 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightSimultaneousMeasurements: 6,
                appointmentsDuringPuerperium: 1,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });

        it("retorna 'success' quando a quantidade de medições simultâneas é 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightSimultaneousMeasurements: 7,
                homeVisitsDuringPuerperium: 1,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });

        it("retorna 'success' quando a quantidade de medições simultâneas é maior que 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightSimultaneousMeasurements: 8,
                homeVisitsDuringPuerperium: 1,
                appointmentsDuringPuerperium: 2,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });
    });
});

import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import { WeightAndHeightMeasurementCalculator } from "../WeightAndHeightMeasurementCalculator";
import type { CalculatorInput } from "../WeightAndHeightMeasurementCalculator";
const TARGET_NUMBER_OF_MEASUREMENTS = 7;

const baseInput = (): CalculatorInput => ({
    weightAndHeightMeasurements: 0,
    appointmentsDuringPuerperium: 0,
    homeVisitsDuringPuerperium: 0,
});

const baseGestationalAge: GestationalAge = {
    weeks: 20,
    days: 0,
};

describe("WeightAndHeightMeasurementCalculator", () => {
    describe("computeMeasurements", () => {
        it("retorna o número de medições informado", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 5,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeMeasurements()).toEqual({
                current: 5,
                total: TARGET_NUMBER_OF_MEASUREMENTS,
            });
        });
    });

    describe("computeStatus - IG inválida", () => {
        it("retorna 'disabled' quando semanas da gestação são null", () => {
            const data = {
                ...baseInput(),
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: null,
                days: 1,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'disabled' quando dias da gestação são null", () => {
            const data = {
                ...baseInput(),
            };
            const gestationalAge = {
                ...baseGestationalAge,
                days: null,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });
    });

    describe("computeStatus - cálculo durante o pré-natal (IG <= 42 semanas e 0 dias)", () => {
        it("retorna 'danger' quando não há medições", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 0,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "danger",
            });
        });

        it("retorna 'warning' quando foram feitas menos de 4 medições", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 3,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "warning",
            });
        });

        it("retorna 'attention' quando foram feitas entre 4 e 6 medições", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 5,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "attention",
            });
        });

        it("retorna 'success' quando foram feitas 7 ou mais medições", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 7,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });

    describe("computeStatus - limite máximo de idade gestacional", () => {
        it("retorna 'disabled' quando IG = 42 semanas + 1 dia e medições < 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 6,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 1,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando IG = 42 semanas + 1 dia e medições >= 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 7,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 1,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("retorna 'danger' quando IG = 42 semanas + 0 dias e medições = 0", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 0,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 0,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "danger",
            });
        });

        it("retorna 'disabled' quando IG = 43 semanas + 0 dias e medições < 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 3,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 43,
                days: 0,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando IG = 43 semanas + 0 dias e medições >= 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 9,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 43,
                days: 0,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("retorna 'disabled' quando IG = 43 semanas + 15 dias e medições < 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 5,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 43,
                days: 15,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando IG = 43 semanas + 15 dias e medições >= 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 7,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 43,
                days: 15,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });

    describe("computeStatus - há consulta ou visita feita durante o purpério", () => {
        it("retorna 'disabled' quando a quantidade de medições é menor que 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 6,
                appointmentsDuringPuerperium: 1,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando a quantidade de medições é 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 7,
                homeVisitsDuringPuerperium: 1,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("retorna 'success' quando a quantidade de medições é maior que 7", () => {
            const data = {
                ...baseInput(),
                weightAndHeightMeasurements: 8,
                homeVisitsDuringPuerperium: 1,
                appointmentsDuringPuerperium: 2,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new WeightAndHeightMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });
});

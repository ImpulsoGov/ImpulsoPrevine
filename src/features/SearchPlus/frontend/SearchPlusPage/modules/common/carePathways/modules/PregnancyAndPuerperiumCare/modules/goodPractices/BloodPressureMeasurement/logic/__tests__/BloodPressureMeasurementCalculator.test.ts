import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import { BloodPressureMeasurementCalculator } from "../BloodPressureMeasurementCalculator";
import type { InputData } from "../BloodPressureMeasurementCalculator";
const TARGET_NUMBER_OF_MEASUREMENTS = 7;

const baseInput = (): InputData => ({
    appointmentsDuringPuerperium: 0,
    homeVisitsDuringPuerperium: 0,
    bloodPressureMeasurements: 0,
});

const baseGestationalAge: GestationalAge = {
    weeks: 20,
    days: 0,
};

describe("BloodPressureMeasurementsCalculator", () => {
    describe("computeAppointmentsDuringPrenatal", () => {
        it("retorna o número de aferições de pressão arterial informado e o total", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 5,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeNumberOfBloodPressureMeasurements()).toEqual({
                current: 5,
                total: TARGET_NUMBER_OF_MEASUREMENTS,
            });
        });
    });

    describe("computeStatus - dados inválidos", () => {
        it("retorna 'disabled' quando semanas são null", () => {
            const data = {
                ...baseInput(),
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: null,
                days: 1,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'disabled' quando dias são null", () => {
            const data = {
                ...baseInput(),
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 40,
                days: null,
            };
            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });
    });

    describe("computeStatus - cálculo durante o pré-natal", () => {
        it("retorna 'danger' quando não há aferições de pressão arterial", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 0,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "danger",
            });
        });

        it("retorna 'warning' quando tem menos de 4 aferições de pressão arterial", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 3,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "warning",
            });
        });

        it("retorna 'attention' quando tem entre 4 e 6 aferições de pressão arterial", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 5,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "attention",
            });
        });

        it("retorna 'success' quando tem 7 ou mais aferições de pressão arterial", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 7,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });

    describe("computeStatus - limite máximo de idade gestacional", () => {
        it("retorna 'disabled' quando >= 42 semanas + dias > 0 e aferições < 7", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 6,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 1,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando >= 42 semanas + dias > 0 e aferições >= 7", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 7,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 1,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("não entra na regra especial quando semanas = 42 e dias = 0", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 0,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 0,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "danger",
            });
        });
    });

    describe("computeStatus - há consulta ou visita feita durante o purpério", () => {
        it("retorna 'disabled' quando a quantidade de aferições de pressão arterial no pré-natal é menor que 7", () => {
            const data = {
                ...baseInput(),
                appointmentsDuringPuerperium: 1,
                bloodPressureMeasurements: 6,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando a quantidade de aferições de pressão arterial no pré-natal é 7", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 7,
                homeVisitsDuringPuerperium: 1,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("retorna 'success' quando a quantidade de aferições de pressão arterial no pré-natal é maior que 7", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 8,
                homeVisitsDuringPuerperium: 1,
                appointmentsDuringPuerperium: 2,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new BloodPressureMeasurementCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });
});

import { BloodPressureMeasurementsCalculator } from "../BloodPressureMeasurementsCalculator";
import type { InputData } from "../BloodPressureMeasurementsCalculator";

const baseInput = (): InputData => ({
    gestationalAgeByLastMenstrualPeriodWeeks: 20,
    gestationalAgeByLastMenstrualPeriodDays: 0,
    gestationalAgeByObstreticalUltrasoundWeeks: null,
    gestationalAgeByObstreticalUltrasoundDays: null,
    appointmentsDuringPuerperium: 0,
    homeVisitsDuringPuerperium: 0,
    bloodPressureMeasurements: 0,
});

describe("BloodPressureMeasurementsCalculator", () => {
    describe("computeAppointmentsDuringPrenatal", () => {
        it("retorna o número de aferições de pressão arterial informado", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 5,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeNumberOfBloodPressureMeasurements()).toBe(5);
        });
    });

    describe("computeStatus - dados inválidos", () => {
        it("retorna 'disabled' quando semanas são null", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: null,
                gestationalAgeByObstreticalUltrasoundWeeks: null,
                gestationalAgeByObstreticalUltrasoundDays: null,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });

        it("retorna 'disabled' quando dias são null", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodDays: null,
                gestationalAgeByObstreticalUltrasoundWeeks: null,
                gestationalAgeByObstreticalUltrasoundDays: null,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });
    });

    describe("computeStatus - cálculo durante o pré-natal", () => {
        it("retorna 'danger' quando não há aferições de pressão arterial e IG maior que 42 semanas e 0 dias", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 0,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "danger" });
        });

        it("retorna 'warning' quando tem menos de 4 aferições de pressão arterial e IG maior que 42 semanas e 0 dias", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 3,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "warning" });
        });

        it("retorna 'attention' quando tem entre 4 e 6 aferições de pressão arterial e IG maior que 42 semanas e 0 dias", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 5,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "attention" });
        });

        it("retorna 'success' quando tem 7 ou mais aferições de pressão arterial e IG maior que 42 semanas e 0 dias", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 7,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

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
                bloodPressureMeasurements: 0,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "danger" });
        });
    });

    describe("computeStatus - limite máximo de idade gestacional", () => {
        it("retorna 'disabled' quando >= 42 semanas + dias > 0 e aferições < 7", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 1,
                bloodPressureMeasurements: 6,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });

        it("retorna 'success' quando >= 42 semanas + dias > 0 e aferições >= 7", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 1,
                bloodPressureMeasurements: 7,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });

        it("não entra na regra especial quando semanas = 42 e dias = 0", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 0,
                bloodPressureMeasurements: 0,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "danger" });
        });
    });

    describe("computeStatus - há consulta ou visita feita durante o purpério", () => {
        it("retorna 'disabled' quando a quantidade de aferições de pressão arterial no pré-natal é menor que 7", () => {
            const data = {
                ...baseInput(),
                appointmentsDuringPuerperium: 1,
                bloodPressureMeasurements: 6,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });

        it("retorna 'success' quando a quantidade de aferições de pressão arterial no pré-natal é 7", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 7,
                homeVisitsDuringPuerperium: 1,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });

        it("retorna 'success' quando a quantidade de aferições de pressão arterial no pré-natal é maior que 7", () => {
            const data = {
                ...baseInput(),
                bloodPressureMeasurements: 8,
                homeVisitsDuringPuerperium: 1,
                appointmentsDuringPuerperium: 2,
            };

            const calc = new BloodPressureMeasurementsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });
    });
});

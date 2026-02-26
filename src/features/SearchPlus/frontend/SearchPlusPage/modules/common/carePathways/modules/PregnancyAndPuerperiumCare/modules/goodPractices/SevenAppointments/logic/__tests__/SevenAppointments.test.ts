import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import { SevenAppointmentsCalculator } from "../SevenAppointmentsCalculator";
import type { CalculatorInput } from "../SevenAppointmentsCalculator";
const TARGET_NUMBER_OF_APPOINTMENTS = 7;

const baseInput = (): CalculatorInput => ({
    appointmentsDuringPrenatal: 0,
    appointmentsDuringPuerperium: 0,
    homeVisitsDuringPuerperium: 0,
});
const baseGestationalAge: GestationalAge = {
    weeks: 20,
    days: 0,
};

describe("SevenAppointmentsCalculator", () => {
    describe("computeAppointmentsDuringPrenatal", () => {
        it("retorna o número de consultas informado e o total", () => {
            const data = {
                ...baseInput(),
                appointmentsDuringPrenatal: 5,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeAppointmentsDuringPrenatal()).toEqual({
                current: 5,
                total: TARGET_NUMBER_OF_APPOINTMENTS,
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
            };
            const calc = new SevenAppointmentsCalculator(data);

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
                days: null,
            };
            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });
    });

    describe("computeStatus - cálculo durante o pré-natal", () => {
        it("retorna 'danger' quando não há consultas ", () => {
            const data = {
                ...baseInput(),
                appointmentsDuringPrenatal: 0,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "danger",
            });
        });

        it("retorna 'warning' quando tem menos de 4 consultas", () => {
            const data = {
                ...baseInput(),
                appointmentsDuringPrenatal: 3,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "warning",
            });
        });

        it("retorna 'attention' quando tem entre 4 e 6 consultas", () => {
            const data = {
                ...baseInput(),
                appointmentsDuringPrenatal: 5,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "attention",
            });
        });

        it("retorna 'success' quando tem 7 ou mais consultas", () => {
            const data = {
                ...baseInput(),
                appointmentsDuringPrenatal: 7,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });

    describe("computeStatus - limite máximo de idade gestacional", () => {
        it("retorna 'disabled' quando semanas = 42 + dias = 1 e consultas < 7", () => {
            const data = {
                ...baseInput(),

                appointmentsDuringPrenatal: 6,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 1,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando semanas = 42 + dias = 1 e consultas >= 7", () => {
            const data = {
                ...baseInput(),

                appointmentsDuringPrenatal: 7,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 1,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("não entra na regra especial quando semanas = 42 e dias = 0", () => {
            const data = {
                ...baseInput(),

                appointmentsDuringPrenatal: 0,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 0,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "danger",
            });
        });

        it("retorna 'disabled' quando semanas = 43 + dias = 0 e consultas < 7", () => {
            const data = {
                ...baseInput(),

                appointmentsDuringPrenatal: 5,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 43,
                days: 0,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando semanas = 43 + dias = 0 e consultas >= 7", () => {
            const data = {
                ...baseInput(),

                appointmentsDuringPrenatal: 8,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 43,
                days: 0,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("retorna 'disabled' quando semanas = 43 + dias = 15 e consultas < 7", () => {
            const data = {
                ...baseInput(),

                appointmentsDuringPrenatal: 4,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 43,
                days: 15,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando semanas = 43 + dias = 15 e consultas >= 7", () => {
            const data = {
                ...baseInput(),

                appointmentsDuringPrenatal: 7,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 43,
                days: 15,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });

    describe("computeStatus - há consulta ou visita feita durante o purpério", () => {
        it("retorna 'disabled' quando a quantidade de consultas no pré-natal é menor que 7", () => {
            const data = {
                ...baseInput(),
                appointmentsDuringPrenatal: 6,
                appointmentsDuringPuerperium: 1,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando a quantidade de consultas no pré-natal é 7", () => {
            const data = {
                ...baseInput(),
                appointmentsDuringPrenatal: 7,
                homeVisitsDuringPuerperium: 1,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("retorna 'success' quando a quantidade de consultas no pré-natal é maior que 7", () => {
            const data = {
                ...baseInput(),
                appointmentsDuringPrenatal: 8,
                homeVisitsDuringPuerperium: 1,
                appointmentsDuringPuerperium: 2,
            };

            const calc = new SevenAppointmentsCalculator(data);

            expect(calc.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });
});

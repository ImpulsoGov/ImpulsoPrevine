import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import { OralHealthCalculator } from "../OralHealthCalculator";
import type { CalculatorInput } from "../OralHealthCalculator";
const TARGET_NUMBER_OF_DENTAL_APPOINTMENTS = 1;

const baseInput: CalculatorInput = {
    homeVisitsDuringPuerperium: 0,
    appointmentsDuringPuerperium: 0,
    dentalAppointmentsDuringPrenatal: 0,
};

const baseGestationalAge: GestationalAge = {
    weeks: 20,
    days: 0,
};

describe("OralHealthCalculator", () => {
    describe("computeAppointmentsDuringPrenatal", () => {
        it("deve retornar a quantidade de consultas odontológicas durante o pré-natal", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                dentalAppointmentsDuringPrenatal: 2,
            });

            expect(calculator.computeAppointmentsDuringPrenatal()).toEqual({
                current: 2,
                total: TARGET_NUMBER_OF_DENTAL_APPOINTMENTS,
            });
        });
    });

    describe("computeStatus", () => {
        it("deve retornar 'disabled' quando os dados de idade gestacional não estiverem disponíveis", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
            });

            const gestationalAge = {
                ...baseGestationalAge,
                weeks: null,
                days: null,
            };

            expect(calculator.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("deve retornar 'success' quando atingir o número alvo de consultas odontológicas no pré-natal", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                dentalAppointmentsDuringPrenatal: 1,
            });

            expect(calculator.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("deve retornar 'disabled' quando estiver no período puerperal, mesmo sem consultas odontológicas", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                homeVisitsDuringPuerperium: 1,
                dentalAppointmentsDuringPrenatal: 0,
            });

            expect(calculator.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("deve retornar 'disabled' quando a idade gestacional ultrapassar o limite máximo de semanas e dias", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
            });

            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 1,
            };

            expect(calculator.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("deve retornar 'danger' quando não atingir o número alvo de consultas e estiver dentro do limite gestacional", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                dentalAppointmentsDuringPrenatal: 0,
            });
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 30,
            };

            expect(calculator.computeStatus(gestationalAge)).toEqual({
                tagStatus: "danger",
            });
        });

        it("deve retornar 'danger' quando estiver exatamente no limite máximo de semanas gestacionais sem dias excedentes", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
            });
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
            };
            expect(calculator.computeStatus(gestationalAge)).toEqual({
                tagStatus: "danger",
            });
        });
    });
});

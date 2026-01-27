import { OralHealthCalculator } from "../OralHealthCalculator";
import type { InputData } from "../OralHealthCalculator";

const baseInput: InputData = {
    gestationalAgeByLastMenstrualPeriodWeeks: 20,
    gestationalAgeByLastMenstrualPeriodDays: 0,
    gestationalAgeByObstreticalUltrasoundWeeks: null,
    gestationalAgeByObstreticalUltrasoundDays: null,
    homeVisitsDuringPuerperium: 0,
    appointmentsDuringPuerperium: 0,
    dentalAppointmentsDuringPrenatal: 0,
};

describe("OralHealthCalculator", () => {
    describe("computeAppointmentsDuringPrenatal", () => {
        it("deve retornar a quantidade de consultas odontológicas durante o pré-natal", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                dentalAppointmentsDuringPrenatal: 2,
            });

            expect(calculator.computeAppointmentsDuringPrenatal()).toBe(2);
        });
    });

    describe("computeStatus", () => {
        it("deve retornar 'disabled' quando os dados de idade gestacional não estiverem disponíveis", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                gestationalAgeByLastMenstrualPeriodWeeks: null,
                gestationalAgeByLastMenstrualPeriodDays: null,
            });

            expect(calculator.computeStatus()).toEqual({
                tagStatus: "disabled",
            });
        });

        it("deve priorizar a idade gestacional do ultrassom obstétrico quando disponível", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                gestationalAgeByLastMenstrualPeriodWeeks: 10,
                gestationalAgeByLastMenstrualPeriodDays: 0,
                gestationalAgeByObstreticalUltrasoundWeeks: 42,
                gestationalAgeByObstreticalUltrasoundDays: 1,
            });

            expect(calculator.computeStatus()).toEqual({
                tagStatus: "disabled",
            });
        });

        it("deve retornar 'success' quando atingir o número alvo de consultas odontológicas no pré-natal", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                dentalAppointmentsDuringPrenatal: 1,
            });

            expect(calculator.computeStatus()).toEqual({
                tagStatus: "success",
            });
        });

        it("deve retornar 'disabled' quando estiver no período puerperal, mesmo sem consultas odontológicas", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                homeVisitsDuringPuerperium: 1,
                dentalAppointmentsDuringPrenatal: 0,
            });

            expect(calculator.computeStatus()).toEqual({
                tagStatus: "disabled",
            });
        });

        it("deve retornar 'disabled' quando a idade gestacional ultrapassar o limite máximo de semanas e dias", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 1,
            });

            expect(calculator.computeStatus()).toEqual({
                tagStatus: "disabled",
            });
        });

        it("deve retornar 'danger' quando não atingir o número alvo de consultas e estiver dentro do limite gestacional", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                gestationalAgeByLastMenstrualPeriodWeeks: 30,
                gestationalAgeByLastMenstrualPeriodDays: 0,
                dentalAppointmentsDuringPrenatal: 0,
            });

            expect(calculator.computeStatus()).toEqual({
                tagStatus: "danger",
            });
        });

        it("deve retornar 'danger' quando estiver exatamente no limite máximo de semanas gestacionais sem dias excedentes", () => {
            const calculator = new OralHealthCalculator({
                ...baseInput,
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 0,
            });

            expect(calculator.computeStatus()).toEqual({
                tagStatus: "danger",
            });
        });
    });
});

import { AppointmentsUntil12thWeekCalculator } from "../AppointmentsUntil12thWeekCalculator";
const ZERO_APPOINTMENTS = 0;
const ONE_APPOINTMENT = 1;
const TWO_APPOINTMENTS = 2;

describe("AppointmentsUntil12thWeekCalculator", () => {
    describe("computeStatus", () => {
        it("deve retornar 0 quando a pessoa não fez pelo menos 1 consulta até a 12º semana de gestação", () => {
            const calculator = new AppointmentsUntil12thWeekCalculator({
                appointmentsUntil12thWeek: ZERO_APPOINTMENTS,
            });
            const status = calculator.computeStatus();
            expect(status).toEqual({ tagStatus: "disabled" });
        });

        it("deve retornar 1 quando a pessoa fez 1 consulta até a 12º semana de gestação", () => {
            const calculator = new AppointmentsUntil12thWeekCalculator({
                appointmentsUntil12thWeek: ONE_APPOINTMENT,
            });
            const status = calculator.computeStatus();
            expect(status).toEqual({ tagStatus: "success" });
        });

        it("deve retornar 1 quando a pessoa fez mais de 1 consulta até a 12º semana de gestação", () => {
            const calculator = new AppointmentsUntil12thWeekCalculator({
                appointmentsUntil12thWeek: TWO_APPOINTMENTS,
            });
            const status = calculator.computeStatus();
            expect(status).toEqual({ tagStatus: "success" });
        });
    });
});

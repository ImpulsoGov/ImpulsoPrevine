import type { Status } from "./AppointmentsUntil12thWeekCalculator";
import { AppointmentsUntil12thWeekCalculator } from "./AppointmentsUntil12thWeekCalculator";

type AppointmentsUntil12thWeekResult = {
    status: Status;
};

export const appointmentsUntil12thWeekResult = (
    appointments: number
): AppointmentsUntil12thWeekResult => {
    // TODO: usar factory para criar os calculadores
    const appointmentsUntil12thWeekCalc =
        new AppointmentsUntil12thWeekCalculator({
            appointmentsUntil12thWeek: appointments,
        });
    return {
        status: appointmentsUntil12thWeekCalc.computeStatus(),
    };
};

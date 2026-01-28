import type { Status } from "./AppointmentsUntil12thWeekCalculator";
import { AppointmentsUntil12thWeekCalculator } from "./AppointmentsUntil12thWeekCalculator";
import type { Count } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

type AppointmentsUntil12thWeekResult = {
    status: Status;
    count: Count;
};

export const AppointmentsUntil12thWeekResult = (
    appointments: number
): AppointmentsUntil12thWeekResult => {
    // TODO: usar factory para criar os calculadores
    const appointmentsUntil12thWeekCalc =
        new AppointmentsUntil12thWeekCalculator({
            appointmentsUntil12thWeek: appointments,
        });
    return {
        status: appointmentsUntil12thWeekCalc.computeStatus(),
        count: appointmentsUntil12thWeekCalc.computeAppointmentsUntil12thWeek(),
    };
};

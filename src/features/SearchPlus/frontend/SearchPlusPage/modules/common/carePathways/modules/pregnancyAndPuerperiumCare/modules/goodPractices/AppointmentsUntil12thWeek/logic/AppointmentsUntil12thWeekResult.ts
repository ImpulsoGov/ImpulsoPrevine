import type { Status, InputData } from "./AppointmentsUntil12thWeekCalculator";
import { AppointmentsUntil12thWeekCalculator } from "./AppointmentsUntil12thWeekCalculator";
// import type { LocalDate } from "@js-joda/core";

type AppointmentsUntil12thWeekResult = {
    status: Status;
};

const modelToTable = (params: unknown): InputData => {
    const [appointmentsUntil12thWeek] = params as [number];
    return {
        appointmentsUntil12thWeek,
    };
};

export const AppointmentsUntil12thWeekResult = (
    params: unknown
): AppointmentsUntil12thWeekResult => {
    const data = modelToTable(params);
    // TODO: usar factory para criar os calculadores
    const AppointmentsUntil12thWeekCalc =
        new AppointmentsUntil12thWeekCalculator({ ...data });
    return {
        status: AppointmentsUntil12thWeekCalc.computeStatus(),
    };
};

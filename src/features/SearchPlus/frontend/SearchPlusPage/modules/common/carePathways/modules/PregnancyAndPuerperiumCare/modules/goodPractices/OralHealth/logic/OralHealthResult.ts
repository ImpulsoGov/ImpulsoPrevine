import type { Status, InputData } from "./OralHealthCalculator";
import { OralHealthCalculator } from "./OralHealthCalculator";

type OralHealthResult = {
    status: Status;
    index: number;
};

export const OralHealthResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    dentalAppointmentsDuringPrenatal,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
}: InputData): OralHealthResult => {
    // TODO: usar factory para criar os calculadores
    const oralHealthCalc = new OralHealthCalculator({
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
        dentalAppointmentsDuringPrenatal,
        homeVisitsDuringPuerperium,
        appointmentsDuringPuerperium,
    });
    return {
        status: oralHealthCalc.computeStatus(),
        index: oralHealthCalc.computeAppointmentsDuringPrenatal(),
    };
};

import type { Status, InputData } from "./SevenAppointmentsCalculator";
import { SevenAppointmentsCalculator } from "./SevenAppointmentsCalculator";

type SevenAppointmentsResult = {
    status: Status;
    index: number;
};

export const SevenAppointmentsResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    appointmentsDuringPrenatal,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
}: InputData): SevenAppointmentsResult => {
    // TODO: usar factory para criar os calculadores
    const SevenAppointmentsCalc = new SevenAppointmentsCalculator({
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
        appointmentsDuringPrenatal,
        homeVisitsDuringPuerperium,
        appointmentsDuringPuerperium,
    });
    return {
        status: SevenAppointmentsCalc.computeStatus(),
        index: SevenAppointmentsCalc.computeAppointmentsDuringPrenatal(),
    };
};

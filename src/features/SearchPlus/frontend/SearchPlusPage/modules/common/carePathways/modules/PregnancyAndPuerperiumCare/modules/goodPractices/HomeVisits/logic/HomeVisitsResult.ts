import type { Status, InputData } from "./HomeVisitsCalculator";
import { HomeVisitsCalculator } from "./HomeVisitsCalculator";

type HomeVisitsResult = {
    status: Status;
    index: number;
};

export const HomeVisitsResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    homeVisitsDuringPuerperium,
    homeVisitsDuringPregnancy: homeVisitsDuringPrenatal,
    appointmentsDuringPuerperium,
}: InputData): HomeVisitsResult => {
    // TODO: usar factory para criar os calculadores
    const HomeVisitsCalc = new HomeVisitsCalculator({
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
        homeVisitsDuringPuerperium,
        homeVisitsDuringPregnancy: homeVisitsDuringPrenatal,
        appointmentsDuringPuerperium,
    });
    return {
        status: HomeVisitsCalc.computeStatus(),
        index: HomeVisitsCalc.computeHomeVisitsDuringPrenatal(),
    };
};

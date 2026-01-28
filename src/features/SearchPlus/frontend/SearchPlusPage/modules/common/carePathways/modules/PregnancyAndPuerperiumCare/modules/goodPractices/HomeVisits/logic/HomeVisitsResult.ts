import type { Count } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { Status, InputData } from "./HomeVisitsCalculator";
import { HomeVisitsCalculator } from "./HomeVisitsCalculator";

type HomeVisitsResult = {
    status: Status;
    count: Count;
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
        count: HomeVisitsCalc.computeHomeVisitsDuringPrenatal(),
    };
};

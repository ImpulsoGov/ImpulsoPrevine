import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { Status } from "./HomeVisitsCalculator";
import { HomeVisitsCalculator } from "./HomeVisitsCalculator";
import { GestationalAgeFactory } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

type HomeVisitsResult = {
    status: Status;
    count: Count;
};

type InputData = Pick<
    PregnancyAndPuerperiumCareItem,
    | "gestationalAgeByLastMenstrualPeriodWeeks"
    | "gestationalAgeByLastMenstrualPeriodDays"
    | "gestationalAgeByObstreticalUltrasoundWeeks"
    | "gestationalAgeByObstreticalUltrasoundDays"
    | "homeVisitsDuringPuerperium"
    | "homeVisitsDuringPregnancy"
    | "appointmentsDuringPuerperium"
>;

export const HomeVisitsResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    homeVisitsDuringPuerperium,
    homeVisitsDuringPregnancy,
    appointmentsDuringPuerperium,
}: InputData): HomeVisitsResult => {
    const gestationalAge = GestationalAgeFactory({
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
    }).computeGestationalAge();
    // TODO: usar factory para criar os calculadores
    const HomeVisitsCalc = new HomeVisitsCalculator({
        homeVisitsDuringPuerperium,
        homeVisitsDuringPregnancy,
        appointmentsDuringPuerperium,
    });
    return {
        status: HomeVisitsCalc.computeStatus(gestationalAge),
        count: HomeVisitsCalc.computeHomeVisitsDuringPrenatal(),
    };
};

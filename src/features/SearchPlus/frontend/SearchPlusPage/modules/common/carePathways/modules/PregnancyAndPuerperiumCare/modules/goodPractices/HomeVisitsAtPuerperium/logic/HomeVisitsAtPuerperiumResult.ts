import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { Status } from "./HomeVisitsAtPuerperiumCalculator";
import { HomeVisitsAtPuerperiumCalculator } from "./HomeVisitsAtPuerperiumCalculator";
import { GestationalAgeFactory } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

type HomeVisitsAtPuerperiumResult = {
    status: Status;
    count: Count;
};

type Data = Pick<
    PregnancyAndPuerperiumCareItem,
    | "gestationalAgeByLastMenstrualPeriodWeeks"
    | "gestationalAgeByLastMenstrualPeriodDays"
    | "gestationalAgeByObstreticalUltrasoundWeeks"
    | "gestationalAgeByObstreticalUltrasoundDays"
    | "homeVisitsDuringPuerperium"
    | "appointmentsDuringPuerperium"
>;

export const HomeVisitsAtPuerperiumResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
}: Data): HomeVisitsAtPuerperiumResult => {
    const gestationalAge = GestationalAgeFactory({
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
    }).computeGestationalAge();
    // TODO: usar factory para criar os calculadores
    const HomeVisitsAtPuerperiumCalc = new HomeVisitsAtPuerperiumCalculator({
        homeVisitsDuringPuerperium,
        appointmentsDuringPuerperium,
    });
    return {
        status: HomeVisitsAtPuerperiumCalc.computeStatus(gestationalAge),
        count: HomeVisitsAtPuerperiumCalc.computeHomeVisits(),
    };
};

import type { Count } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import { GestationalAgeFactory } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import type { PregnancyAndPuerperiumCareItem } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare";
import {
    FirstTrimesterSTITestsCalculator,
    type Status,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/goodPractices/FirstTrimesterSTITests/logic/FirstTrimesterSTITestsCalculator";

type FirstTrimesterSTITestsResult = {
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
    | "didHepatitisBTestDuringFirstTrimester"
    | "didHepatitisCTestDuringFirstTrimester"
    | "didHivTestDuringFirstTrimester"
    | "didSyphilisTestDuringFirstTrimester"
>;

export const FirstTrimesterSTITestsResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
    didHepatitisBTestDuringFirstTrimester,
    didHepatitisCTestDuringFirstTrimester,
    didHivTestDuringFirstTrimester,
    didSyphilisTestDuringFirstTrimester,
}: Data): FirstTrimesterSTITestsResult => {
    const gestationalAge = GestationalAgeFactory({
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
    }).computeGestationalAge();
    // TODO: usar factory para criar os calculadores
    const FirstTrimesterSTITestsCalc = new FirstTrimesterSTITestsCalculator({
        homeVisitsDuringPuerperium,
        appointmentsDuringPuerperium,
        didHepatitisBTestDuringFirstTrimester,
        didHepatitisCTestDuringFirstTrimester,
        didHivTestDuringFirstTrimester,
        didSyphilisTestDuringFirstTrimester,
    });
    return {
        status: FirstTrimesterSTITestsCalc.computeStatus(gestationalAge),
        count: FirstTrimesterSTITestsCalc.computeSTITestsDuringFirstTrimester(),
    };
};

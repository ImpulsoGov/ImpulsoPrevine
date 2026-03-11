import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { Status } from "./SyphilisAndHivExamsAtThirdTrimesterCalculator";
import { SyphilisAndHivExamsAtThirdTrimesterCalculator } from "./SyphilisAndHivExamsAtThirdTrimesterCalculator";
import { GestationalAgeFactory } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

type SyphilisAndHivExamsAtThirdTrimesterResult = {
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
    | "didHivExamAtThirdTrimester"
    | "didSyphilisExamAtThirdTrimester"
>;

export const SyphilisAndHivExamsAtThirdTrimesterResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
    didHivExamAtThirdTrimester,
    didSyphilisExamAtThirdTrimester,
}: Data): SyphilisAndHivExamsAtThirdTrimesterResult => {
    const gestationalAge = GestationalAgeFactory({
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
    }).computeGestationalAge();
    // TODO: usar factory para criar os calculadores
    const syphilisAndHivExamsAtThirdTrimesterCalc =
        new SyphilisAndHivExamsAtThirdTrimesterCalculator({
            didHivExamAtThirdTrimester,
            didSyphilisExamAtThirdTrimester,
            homeVisitsDuringPuerperium,
            appointmentsDuringPuerperium,
        });
    return {
        status: syphilisAndHivExamsAtThirdTrimesterCalc.computeStatus(
            gestationalAge
        ),
        count: syphilisAndHivExamsAtThirdTrimesterCalc.computeTotalExamsDoneAtThirdTrimester(),
    };
};

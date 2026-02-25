import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { Status } from "./OralHealthCalculator";
import { OralHealthCalculator } from "./OralHealthCalculator";
import { GestationalAgeFactory } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

type OralHealthResult = {
    status: Status;
    count: Count;
};

type Data = Pick<
    PregnancyAndPuerperiumCareItem,
    | "gestationalAgeByLastMenstrualPeriodWeeks"
    | "gestationalAgeByLastMenstrualPeriodDays"
    | "gestationalAgeByObstreticalUltrasoundWeeks"
    | "gestationalAgeByObstreticalUltrasoundDays"
    | "dentalAppointmentsDuringPrenatal"
    | "homeVisitsDuringPuerperium"
    | "appointmentsDuringPuerperium"
>;

export const OralHealthResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    dentalAppointmentsDuringPrenatal,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
}: Data): OralHealthResult => {
    const gestationalAge = GestationalAgeFactory({
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
    }).computeGestationalAge();
    // TODO: usar factory para criar os calculadores
    const oralHealthCalc = new OralHealthCalculator({
        dentalAppointmentsDuringPrenatal,
        homeVisitsDuringPuerperium,
        appointmentsDuringPuerperium,
    });
    return {
        status: oralHealthCalc.computeStatus(gestationalAge),
        count: oralHealthCalc.computeAppointmentsDuringPrenatal(),
    };
};

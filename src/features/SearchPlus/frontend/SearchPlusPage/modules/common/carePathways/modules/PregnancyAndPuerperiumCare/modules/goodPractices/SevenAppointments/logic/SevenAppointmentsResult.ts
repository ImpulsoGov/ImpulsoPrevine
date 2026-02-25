import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { Status } from "./SevenAppointmentsCalculator";
import { SevenAppointmentsCalculator } from "./SevenAppointmentsCalculator";
import { GestationalAgeFactory } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

type SevenAppointmentsResult = {
    status: Status;
    count: Count;
};

type Data = Pick<
    PregnancyAndPuerperiumCareItem,
    | "gestationalAgeByLastMenstrualPeriodWeeks"
    | "gestationalAgeByLastMenstrualPeriodDays"
    | "gestationalAgeByObstreticalUltrasoundWeeks"
    | "gestationalAgeByObstreticalUltrasoundDays"
    | "appointmentsDuringPrenatal"
    | "homeVisitsDuringPuerperium"
    | "appointmentsDuringPuerperium"
>;
export const SevenAppointmentsResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    appointmentsDuringPrenatal,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
}: Data): SevenAppointmentsResult => {
    const gestationalAge = GestationalAgeFactory({
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
    }).computeGestationalAge();
    // TODO: usar factory para criar os calculadores
    const SevenAppointmentsCalc = new SevenAppointmentsCalculator({
        appointmentsDuringPrenatal,
        homeVisitsDuringPuerperium,
        appointmentsDuringPuerperium,
    });
    return {
        status: SevenAppointmentsCalc.computeStatus(gestationalAge),
        count: SevenAppointmentsCalc.computeAppointmentsDuringPrenatal(),
    };
};

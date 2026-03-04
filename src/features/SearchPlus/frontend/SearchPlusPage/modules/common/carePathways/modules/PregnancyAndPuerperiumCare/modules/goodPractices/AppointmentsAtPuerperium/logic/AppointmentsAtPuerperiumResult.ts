import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { Status } from "./AppointmentsAtPuerperiumCalculator";
import { AppointmentsAtPuerperiumCalculator } from "./AppointmentsAtPuerperiumCalculator";
import { GestationalAgeFactory } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

type AppointmentsAtPuerperiumResult = {
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

export const AppointmentsAtPuerperiumResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    appointmentsDuringPuerperium,
}: Data): AppointmentsAtPuerperiumResult => {
    const gestationalAge = GestationalAgeFactory({
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
    }).computeGestationalAge();

    const appointmentsAtPuerperiumCalc = new AppointmentsAtPuerperiumCalculator(
        {
            appointmentsDuringPuerperium,
        }
    );

    return {
        status: appointmentsAtPuerperiumCalc.computeStatus(gestationalAge),
        count: appointmentsAtPuerperiumCalc.computeAppointmentsAtPuerperium(),
    };
};

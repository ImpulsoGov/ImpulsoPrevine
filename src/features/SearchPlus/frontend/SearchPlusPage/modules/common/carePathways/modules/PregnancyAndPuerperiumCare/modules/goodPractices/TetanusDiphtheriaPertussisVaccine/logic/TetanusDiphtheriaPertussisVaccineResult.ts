import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type {
    Status,
    GestationalAgeNonNullable,
} from "./TetanusDiphtheriaPertussisVaccineCalculator";
import { TetanusDiphtheriaPertussisVaccineCalculator } from "./TetanusDiphtheriaPertussisVaccineCalculator";
import { GestationalAgeFactory } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

type TetanusDiphtheriaPertussisVaccineResult = {
    status: Status;
    count: Count;
};

type Data = Pick<
    PregnancyAndPuerperiumCareItem,
    | "gestationalAgeByLastMenstrualPeriodWeeks"
    | "gestationalAgeByLastMenstrualPeriodDays"
    | "gestationalAgeByObstreticalUltrasoundWeeks"
    | "gestationalAgeByObstreticalUltrasoundDays"
    | "appointmentsDuringPuerperium"
    | "homeVisitsDuringPuerperium"
    | "tetanusDiphtheriaPertussisVaccineDoses"
    | "createdAt"
>;

export const TetanusDiphtheriaPertussisVaccineResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    appointmentsDuringPuerperium,
    homeVisitsDuringPuerperium,
    tetanusDiphtheriaPertussisVaccineDoses,
    createdAt,
}: Data): TetanusDiphtheriaPertussisVaccineResult => {
    const gestationalAge = GestationalAgeFactory({
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
    }).computeGestationalAge();

    const tetanusDiphtheriaPertussisVaccineCalc =
        new TetanusDiphtheriaPertussisVaccineCalculator({
            appointmentsDuringPuerperium,
            homeVisitsDuringPuerperium,
            tetanusDiphtheriaPertussisVaccineDoses,
        });

    return {
        status: tetanusDiphtheriaPertussisVaccineCalc.computeStatus(
            gestationalAge,
            createdAt
        ),
        count: tetanusDiphtheriaPertussisVaccineCalc.computeTetanusDiphtheriaPertussisVaccine(
            gestationalAge as GestationalAgeNonNullable,
            createdAt
        ),
    };
};

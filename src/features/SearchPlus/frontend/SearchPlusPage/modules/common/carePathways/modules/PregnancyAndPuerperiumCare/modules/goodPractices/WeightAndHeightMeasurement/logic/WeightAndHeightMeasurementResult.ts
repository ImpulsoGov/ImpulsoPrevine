import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { Status } from "./WeightAndHeightMeasurementCalculator";
import { WeightAndHeightMeasurementCalculator } from "./WeightAndHeightMeasurementCalculator";
import { GestationalAgeFactory } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

type WeightAndHeightMeasurementResult = {
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
    | "weightAndHeightMeasurements"
>;

// TODO: desfazer desestruturação das propriedades e receber o objeto completo
export const WeightAndHeightMeasurementResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    weightAndHeightMeasurements,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
}: Data): WeightAndHeightMeasurementResult => {
    const gestationalAge = GestationalAgeFactory({
        gestationalAgeByLastMenstrualPeriodWeeks,
        gestationalAgeByLastMenstrualPeriodDays,
        gestationalAgeByObstreticalUltrasoundWeeks,
        gestationalAgeByObstreticalUltrasoundDays,
    }).computeGestationalAge();
    // TODO: usar factory para criar os calculadores
    const weightAndHeightMeasurementCalc =
        new WeightAndHeightMeasurementCalculator({
            weightAndHeightMeasurements,
            homeVisitsDuringPuerperium,
            appointmentsDuringPuerperium,
        });
    return {
        status: weightAndHeightMeasurementCalc.computeStatus(gestationalAge),
        count: weightAndHeightMeasurementCalc.computeMeasurements(),
    };
};

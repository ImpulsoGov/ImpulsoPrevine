import type { Count } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { Status, InputData } from "./WeightAndHeightMeasurementCalculator";
import { WeightAndHeightMeasurementCalculator } from "./WeightAndHeightMeasurementCalculator";

type WeightAndHeightMeasurementResult = {
    status: Status;
    count: Count;
};

// TODO: desfazer desestruturação das propriedades e receber o objeto completo
export const WeightAndHeightMeasurementResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    weightAndHeightMeasurements,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
}: InputData): WeightAndHeightMeasurementResult => {
    // TODO: usar factory para criar os calculadores
    const weightAndHeightMeasurementCalc =
        new WeightAndHeightMeasurementCalculator({
            gestationalAgeByLastMenstrualPeriodWeeks,
            gestationalAgeByLastMenstrualPeriodDays,
            gestationalAgeByObstreticalUltrasoundWeeks,
            gestationalAgeByObstreticalUltrasoundDays,
            weightAndHeightMeasurements,
            homeVisitsDuringPuerperium,
            appointmentsDuringPuerperium,
        });
    return {
        status: weightAndHeightMeasurementCalc.computeStatus(),
        count: weightAndHeightMeasurementCalc.computeMeasurements(),
    };
};

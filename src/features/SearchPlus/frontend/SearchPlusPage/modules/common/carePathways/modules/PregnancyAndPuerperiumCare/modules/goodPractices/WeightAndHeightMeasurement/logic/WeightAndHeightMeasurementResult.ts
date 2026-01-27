import type { Status, InputData } from "./WeightAndHeightMeasurementCalculator";
import { WeightAndHeightMeasurementCalculator } from "./WeightAndHeightMeasurementCalculator";

type WeightAndHeightMeasurementResult = {
    status: Status;
    index: number;
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
        index: weightAndHeightMeasurementCalc.computeMeasurements(),
    };
};

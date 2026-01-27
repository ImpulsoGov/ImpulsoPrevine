import {
    BloodPressureMeasurementCalculator,
    type InputData,
    type Status,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/goodPractices/BloodPressureMeasurement/logic.ts/BloodPressureMeasurementCalculator";

type BloodPressureMeasurementResult = {
    status: Status;
    index: number;
};

export const BloodPressureMeasurementResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
    bloodPressureMeasurements,
}: InputData): BloodPressureMeasurementResult => {
    // TODO: usar factory para criar os calculadores
    const BloodPressureMeasurementsCalc =
        new BloodPressureMeasurementCalculator({
            gestationalAgeByLastMenstrualPeriodWeeks,
            gestationalAgeByLastMenstrualPeriodDays,
            gestationalAgeByObstreticalUltrasoundWeeks,
            gestationalAgeByObstreticalUltrasoundDays,
            homeVisitsDuringPuerperium,
            appointmentsDuringPuerperium,
            bloodPressureMeasurements,
        });
    return {
        status: BloodPressureMeasurementsCalc.computeStatus(),
        index: BloodPressureMeasurementsCalc.computeNumberOfBloodPressureMeasurements(),
    };
};

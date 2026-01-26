import {
    BloodPressureMeasurementsCalculator,
    type InputData,
    type Status,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/goodPractices/BloodPressureMeasurements/logic.ts/BloodPressureMeasurementsCalculator";

type BloodPressureMeasurementsResult = {
    status: Status;
    index: number;
};

export const BloodPressureMeasurementsResult = ({
    gestationalAgeByLastMenstrualPeriodWeeks,
    gestationalAgeByLastMenstrualPeriodDays,
    gestationalAgeByObstreticalUltrasoundWeeks,
    gestationalAgeByObstreticalUltrasoundDays,
    homeVisitsDuringPuerperium,
    appointmentsDuringPuerperium,
    bloodPressureMeasurements,
}: InputData): BloodPressureMeasurementsResult => {
    // TODO: usar factory para criar os calculadores
    const BloodPressureMeasurementsCalc =
        new BloodPressureMeasurementsCalculator({
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

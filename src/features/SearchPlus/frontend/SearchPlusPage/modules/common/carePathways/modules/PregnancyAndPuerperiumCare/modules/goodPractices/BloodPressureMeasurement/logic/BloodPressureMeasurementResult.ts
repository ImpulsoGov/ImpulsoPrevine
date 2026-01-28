import type { Count } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import {
    BloodPressureMeasurementCalculator,
    type InputData,
    type Status,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/goodPractices/BloodPressureMeasurement/logic/BloodPressureMeasurementCalculator";

type BloodPressureMeasurementResult = {
    status: Status;
    count: Count;
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
        count: BloodPressureMeasurementsCalc.computeNumberOfBloodPressureMeasurements(),
    };
};

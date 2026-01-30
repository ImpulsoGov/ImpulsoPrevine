import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { PregnancyAndPuerperiumCareItem } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare";
import type { Count } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;
const TARGET_NUMBER_OF_MEASUREMENTS = 7;
const ZERO_MEASUREMENTS = 0;
const FOUR_MEASUREMENTS = 4;

export type InputData = {
    gestationalAgeByLastMenstrualPeriodWeeks: PregnancyAndPuerperiumCareItem["gestationalAgeByLastMenstrualPeriodWeeks"];
    gestationalAgeByLastMenstrualPeriodDays: PregnancyAndPuerperiumCareItem["gestationalAgeByLastMenstrualPeriodDays"];
    gestationalAgeByObstreticalUltrasoundWeeks: PregnancyAndPuerperiumCareItem["gestationalAgeByObstreticalUltrasoundWeeks"];
    gestationalAgeByObstreticalUltrasoundDays: PregnancyAndPuerperiumCareItem["gestationalAgeByObstreticalUltrasoundDays"];
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
    bloodPressureMeasurements: PregnancyAndPuerperiumCareItem["bloodPressureMeasurements"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

type GestationalAge = {
    weeks: number | null;
    days: number | null;
};

export class BloodPressureMeasurementCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #isObstreticalUltrasoundAvailable(): boolean {
        const gestationalAgeByObstreticalUltrasoundWeeks =
            this.#data.gestationalAgeByObstreticalUltrasoundWeeks;
        const gestationalAgeByObstreticalUltrasoundDays =
            this.#data.gestationalAgeByObstreticalUltrasoundDays;
        return (
            gestationalAgeByObstreticalUltrasoundWeeks !== null &&
            gestationalAgeByObstreticalUltrasoundDays !== null
        );
    }

    public computeNumberOfBloodPressureMeasurements(): Count {
        const bloodPressureMeasurements = this.#data.bloodPressureMeasurements;
        return {
            current: bloodPressureMeasurements,
            total: TARGET_NUMBER_OF_MEASUREMENTS,
        };
    }

    #statusCalcInPrenatalPeriod(): Status {
        const bloodPressureMeasurementsDuringPrenatal =
            this.#data.bloodPressureMeasurements;
        if (bloodPressureMeasurementsDuringPrenatal == ZERO_MEASUREMENTS) {
            return {
                tagStatus: "danger",
            };
        }
        if (bloodPressureMeasurementsDuringPrenatal < FOUR_MEASUREMENTS) {
            return {
                tagStatus: "warning",
            };
        }
        if (
            bloodPressureMeasurementsDuringPrenatal <
            TARGET_NUMBER_OF_MEASUREMENTS
        ) {
            return {
                tagStatus: "attention",
            };
        }
        return {
            tagStatus: "success",
        };
    }

    #statusCalcInPuerperalPeriod(): Status {
        return this.#data.bloodPressureMeasurements <
            TARGET_NUMBER_OF_MEASUREMENTS
            ? { tagStatus: "disabled" }
            : { tagStatus: "success" };
    }

    public computeStatus(): Status {
        const gestationalAgeByLastMenstrualPeriodWeeks =
            this.#data.gestationalAgeByLastMenstrualPeriodWeeks;
        const gestationalAgeByLastMenstrualPeriodDays =
            this.#data.gestationalAgeByLastMenstrualPeriodDays;
        const gestationalAgeByObstreticalUltrasoundWeeks =
            this.#data.gestationalAgeByObstreticalUltrasoundWeeks;
        const gestationalAgeByObstreticalUltrasoundDays =
            this.#data.gestationalAgeByObstreticalUltrasoundDays;

        let gestationalAge: GestationalAge = {
            weeks: null,
            days: null,
        };

        if (this.#isObstreticalUltrasoundAvailable()) {
            gestationalAge = {
                weeks: gestationalAgeByObstreticalUltrasoundWeeks,
                days: gestationalAgeByObstreticalUltrasoundDays,
            };
        } else {
            gestationalAge = {
                weeks: gestationalAgeByLastMenstrualPeriodWeeks,
                days: gestationalAgeByLastMenstrualPeriodDays,
            };
        }
        if (
            gestationalAge["weeks"] === null ||
            gestationalAge["days"] === null
        ) {
            return {
                tagStatus: "disabled",
            };
        }
        const isPuerperalPeriod =
            this.#data.homeVisitsDuringPuerperium > 0 ||
            this.#data.appointmentsDuringPuerperium > 0;
        const isGestationalAgeAtOrAboveMaxWeeks =
            gestationalAge["weeks"] >= MAX_GESTATIONAL_AGE_WEEKS;
        const isGestationalAgeAboveMaxDays =
            gestationalAge["days"] > MAX_GESTATIONAL_AGE_DAYS;

        if (isPuerperalPeriod) return this.#statusCalcInPuerperalPeriod();

        if (isGestationalAgeAtOrAboveMaxWeeks) {
            if (isGestationalAgeAboveMaxDays) {
                return this.#statusCalcInPuerperalPeriod();
            }
        }

        return this.#statusCalcInPrenatalPeriod();
    }
}

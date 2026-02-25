import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { PregnancyAndPuerperiumCareItem } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare";
import type { Count } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;
const TARGET_NUMBER_OF_MEASUREMENTS = 7;
const ZERO_MEASUREMENTS = 0;
const FOUR_MEASUREMENTS = 4;

export type CalculatorInput = {
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
    bloodPressureMeasurements: PregnancyAndPuerperiumCareItem["bloodPressureMeasurements"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

export class BloodPressureMeasurementCalculator {
    #data: CalculatorInput;

    constructor(data: CalculatorInput) {
        this.#data = data;
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

    public computeStatus(gestationalAge: GestationalAge): Status {
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

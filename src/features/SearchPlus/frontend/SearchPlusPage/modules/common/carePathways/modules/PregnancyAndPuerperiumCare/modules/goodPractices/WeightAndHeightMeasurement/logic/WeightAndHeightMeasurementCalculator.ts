import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

// TODO: mover as constantes de MAX_GESTATIONAL_AGE para um arquivo comum
const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;
const TARGET_NUMBER_OF_MEASUREMENTS = 7;
const ZERO_MEASUREMENTS = 0;
const FOUR_MEASUREMENTS = 4;

// TODO: usar Pick para selecionar os campos necessários ao invés de repetir a definição
export type CalculatorInput = {
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
    weightAndHeightMeasurements: PregnancyAndPuerperiumCareItem["weightAndHeightMeasurements"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

export class WeightAndHeightMeasurementCalculator {
    #data: CalculatorInput;

    constructor(data: CalculatorInput) {
        this.#data = data;
    }

    public computeMeasurements(): Count {
        const measurements = this.#data.weightAndHeightMeasurements;
        return { current: measurements, total: TARGET_NUMBER_OF_MEASUREMENTS };
    }

    #statusCalcInPrenatalPeriod(): Status {
        const measurements = this.#data.weightAndHeightMeasurements;
        if (measurements == ZERO_MEASUREMENTS) {
            return {
                tagStatus: "danger",
            };
        }
        if (measurements < FOUR_MEASUREMENTS) {
            return {
                tagStatus: "warning",
            };
        }
        if (measurements < TARGET_NUMBER_OF_MEASUREMENTS) {
            return {
                tagStatus: "attention",
            };
        }
        return {
            tagStatus: "success",
        };
    }

    #statusCalcInPuerperalPeriod(): Status {
        return this.#data.weightAndHeightMeasurements <
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
        // TODO: criar essas variáveis apenas caso isPuerperalPeriod seja false
        const isGestationalAgeAtMaxWeeks =
            gestationalAge["weeks"] === MAX_GESTATIONAL_AGE_WEEKS;
        const isGestationalAgeAboveMaxDays =
            gestationalAge["days"] > MAX_GESTATIONAL_AGE_DAYS;
        const isGestationalAgeAboveMaxWeeks =
            gestationalAge["weeks"] > MAX_GESTATIONAL_AGE_WEEKS;

        if (isPuerperalPeriod) return this.#statusCalcInPuerperalPeriod();

        if (isGestationalAgeAtMaxWeeks) {
            if (isGestationalAgeAboveMaxDays) {
                return this.#statusCalcInPuerperalPeriod();
            }
        }

        if (isGestationalAgeAboveMaxWeeks) {
            return this.#statusCalcInPuerperalPeriod();
        }

        return this.#statusCalcInPrenatalPeriod();
    }
}

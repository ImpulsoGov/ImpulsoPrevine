import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;
const TARGET_HOME_VISITS_DURING_PREGNANCY = 3;
const ZERO_HOME_VISIT_DURING_PREGNANCY = 0;
const ONE_HOME_VISIT_DURING_PREGNANCY = 1;
const TWO_HOME_VISITS_DURING_PREGNANCY = 2;

export type CalculatorInput = {
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
    homeVisitsDuringPregnancy: PregnancyAndPuerperiumCareItem["homeVisitsDuringPregnancy"];
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

export class HomeVisitsCalculator {
    #data: CalculatorInput;

    constructor(data: CalculatorInput) {
        this.#data = data;
    }

    public computeHomeVisitsDuringPrenatal(): Count {
        const homeVisitsDuringPregnancy = this.#data.homeVisitsDuringPregnancy;
        return {
            current: homeVisitsDuringPregnancy,
            total: TARGET_HOME_VISITS_DURING_PREGNANCY,
        };
    }

    #statusCalcInPrenatalPeriod(): Status {
        const homeVisitsDuringPregnancy = this.#data.homeVisitsDuringPregnancy;
        if (homeVisitsDuringPregnancy == ZERO_HOME_VISIT_DURING_PREGNANCY) {
            return {
                tagStatus: "danger",
            };
        }
        if (homeVisitsDuringPregnancy === ONE_HOME_VISIT_DURING_PREGNANCY) {
            return {
                tagStatus: "warning",
            };
        }
        if (homeVisitsDuringPregnancy === TWO_HOME_VISITS_DURING_PREGNANCY) {
            return {
                tagStatus: "attention",
            };
        }
        return {
            tagStatus: "success",
        };
    }

    #statusCalcInPuerperalPeriod(): Status {
        return this.#data.homeVisitsDuringPregnancy <
            TARGET_HOME_VISITS_DURING_PREGNANCY
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

import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;
const TARGET_HOME_VISITS_DURING_PUERPERIUM = 1;
const ZERO_HOME_VISITS_DURING_PUERPERIUM = 0;
const ZERO_APPOINTMENTS_DURING_PUERPERIUM = 0;

export type CalculatorInput = {
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

export class HomeVisitsAtPuerperiumCalculator {
    #data: CalculatorInput;

    constructor(data: CalculatorInput) {
        this.#data = data;
    }

    public computeHomeVisits(): Count {
        return {
            current: this.#data.homeVisitsDuringPuerperium,
            total: TARGET_HOME_VISITS_DURING_PUERPERIUM,
        };
    }

    public computeStatus(gestationalAge: GestationalAge): Status {
        if (
            gestationalAge["weeks"] === null ||
            gestationalAge["days"] === null
        ) {
            return { tagStatus: "disabled" };
        }

        const homeVisitsDuringPuerperium =
            this.#data.homeVisitsDuringPuerperium;

        if (homeVisitsDuringPuerperium > ZERO_HOME_VISITS_DURING_PUERPERIUM) {
            return { tagStatus: "success" };
        }

        const appointmentsDuringPuerperium =
            this.#data.appointmentsDuringPuerperium;

        if (
            appointmentsDuringPuerperium > ZERO_APPOINTMENTS_DURING_PUERPERIUM
        ) {
            return { tagStatus: "danger" };
        }

        const isGestationalAgeAtMaxWeeks =
            gestationalAge["weeks"] === MAX_GESTATIONAL_AGE_WEEKS;
        const isGestationalAgeAtMaxDays =
            gestationalAge["days"] === MAX_GESTATIONAL_AGE_DAYS;
        const isGestationalAgeUnderMaxWeeks =
            gestationalAge["weeks"] < MAX_GESTATIONAL_AGE_WEEKS;

        if (isGestationalAgeAtMaxWeeks) {
            if (isGestationalAgeAtMaxDays) {
                return { tagStatus: "disabled" };
            }
        }

        if (isGestationalAgeUnderMaxWeeks) {
            return { tagStatus: "disabled" };
        }

        return { tagStatus: "danger" };
    }
}

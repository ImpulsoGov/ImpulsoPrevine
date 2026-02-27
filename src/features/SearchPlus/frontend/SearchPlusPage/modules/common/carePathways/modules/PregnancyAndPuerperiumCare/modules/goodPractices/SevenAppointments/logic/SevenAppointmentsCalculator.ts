import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;
const TARGET_NUMBER_OF_APPOINTMENTS = 7;
const ZERO_APPOINTMENTS = 0;
const FOUR_APPOINTMENTS = 4;

export type CalculatorInput = {
    appointmentsDuringPrenatal: PregnancyAndPuerperiumCareItem["appointmentsDuringPrenatal"];
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

export class SevenAppointmentsCalculator {
    #data: CalculatorInput;

    constructor(data: CalculatorInput) {
        this.#data = data;
    }

    public computeAppointmentsDuringPrenatal(): Count {
        const appointmentsDuringPrenatal =
            this.#data.appointmentsDuringPrenatal;
        return {
            current: appointmentsDuringPrenatal,
            total: TARGET_NUMBER_OF_APPOINTMENTS,
        };
    }

    #statusCalcInPrenatalPeriod(): Status {
        const appointmentsDuringPrenatal =
            this.#data.appointmentsDuringPrenatal;
        if (appointmentsDuringPrenatal == ZERO_APPOINTMENTS) {
            return {
                tagStatus: "danger",
            };
        }
        if (appointmentsDuringPrenatal < FOUR_APPOINTMENTS) {
            return {
                tagStatus: "warning",
            };
        }
        if (appointmentsDuringPrenatal < TARGET_NUMBER_OF_APPOINTMENTS) {
            return {
                tagStatus: "attention",
            };
        }
        return {
            tagStatus: "success",
        };
    }

    #statusCalcInPuerperalPeriod(): Status {
        return this.#data.appointmentsDuringPrenatal <
            TARGET_NUMBER_OF_APPOINTMENTS
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

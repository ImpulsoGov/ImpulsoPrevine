import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;
const TARGET_NUMBER_OF_DENTAL_APPOINTMENTS = 1;

export type CalculatorInput = {
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
    dentalAppointmentsDuringPrenatal: PregnancyAndPuerperiumCareItem["dentalAppointmentsDuringPrenatal"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

export class OralHealthCalculator {
    #data: CalculatorInput;

    constructor(data: CalculatorInput) {
        this.#data = data;
    }

    public computeAppointmentsDuringPrenatal(): Count {
        const dentalAppointmentsDuringPrenatal =
            this.#data.dentalAppointmentsDuringPrenatal;
        return {
            current: dentalAppointmentsDuringPrenatal,
            total: TARGET_NUMBER_OF_DENTAL_APPOINTMENTS,
        };
    }

    public computeStatus(gestationalAge: GestationalAge): Status {
        const dentalAppointmentsDuringPrenatal =
            this.#data.dentalAppointmentsDuringPrenatal;

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

        if (
            dentalAppointmentsDuringPrenatal >=
            TARGET_NUMBER_OF_DENTAL_APPOINTMENTS
        ) {
            return {
                tagStatus: "success",
            };
        }

        if (isPuerperalPeriod) return { tagStatus: "disabled" };

        if (isGestationalAgeAtMaxWeeks) {
            if (isGestationalAgeAboveMaxDays) {
                return { tagStatus: "disabled" };
            }
        }

        if (isGestationalAgeAboveMaxWeeks) {
            return { tagStatus: "disabled" };
        }

        return { tagStatus: "danger" };
    }
}

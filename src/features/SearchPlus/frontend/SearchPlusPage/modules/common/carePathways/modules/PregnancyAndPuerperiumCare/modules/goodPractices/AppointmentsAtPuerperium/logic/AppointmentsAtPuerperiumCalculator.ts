import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const TARGET_NUMBER_OF_APPOINTMENTS = 1;
const ZERO_APPOINTMENTS_DURING_PUERPERIUM = 0;
const ZERO_HOME_VISITS_DURING_PUERPERIUM = 0;
const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;

export type Status = {
    tagStatus: PrintTagTheme;
};
export type InputData = {
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
};

export class AppointmentsAtPuerperiumCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #isGestationalAgeUnavailable(gestationalAge: GestationalAge): boolean {
        return gestationalAge.weeks === null || gestationalAge.days === null;
    }

    #isGestationalPeriod(gestationalAge: GestationalAge): boolean {
        if (gestationalAge.weeks === null || gestationalAge.days === null)
            return true;

        if (gestationalAge.weeks < MAX_GESTATIONAL_AGE_WEEKS) return true;

        if (
            gestationalAge.weeks === MAX_GESTATIONAL_AGE_WEEKS &&
            gestationalAge.days === MAX_GESTATIONAL_AGE_DAYS
        )
            return true;
        return false;
    }

    public computeAppointmentsAtPuerperium(): Count {
        const appointmentsDuringPuerperium =
            this.#data.appointmentsDuringPuerperium;
        return {
            current: appointmentsDuringPuerperium,
            total: TARGET_NUMBER_OF_APPOINTMENTS,
        };
    }
    public computeStatus(gestationalAge: GestationalAge): Status {
        const appointmentsDuringPuerperium =
            this.#data.appointmentsDuringPuerperium;
        const homeVisitsDuringPuerperium =
            this.#data.homeVisitsDuringPuerperium;

        if (this.#isGestationalAgeUnavailable(gestationalAge))
            return { tagStatus: "disabled" };

        if (appointmentsDuringPuerperium > ZERO_APPOINTMENTS_DURING_PUERPERIUM)
            return { tagStatus: "success" };

        if (homeVisitsDuringPuerperium > ZERO_HOME_VISITS_DURING_PUERPERIUM)
            return { tagStatus: "danger" };

        if (this.#isGestationalPeriod(gestationalAge))
            return { tagStatus: "disabled" };

        return { tagStatus: "danger" };
    }
}

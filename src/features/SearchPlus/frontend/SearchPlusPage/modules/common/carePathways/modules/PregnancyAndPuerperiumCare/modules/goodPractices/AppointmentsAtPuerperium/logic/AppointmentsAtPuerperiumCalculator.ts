import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const TARGET_NUMBER_OF_APPOINTMENTS = 1;

export type Status = {
    tagStatus: PrintTagTheme;
};
export type InputData = {
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
};

export class AppointmentsAtPuerperiumCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
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

        if (
            gestationalAge["weeks"] === null ||
            gestationalAge["days"] === null
        ) {
            return { tagStatus: "disabled" };
        }
        if (appointmentsDuringPuerperium >= TARGET_NUMBER_OF_APPOINTMENTS)
            return { tagStatus: "success" };

        if (appointmentsDuringPuerperium > 0) return { tagStatus: "danger" };

        if (gestationalAge.weeks < 42) return { tagStatus: "disabled" };

        if (gestationalAge.weeks === 42 && gestationalAge.days === 0)
            return { tagStatus: "disabled" };

        return { tagStatus: "danger" };
    }
}

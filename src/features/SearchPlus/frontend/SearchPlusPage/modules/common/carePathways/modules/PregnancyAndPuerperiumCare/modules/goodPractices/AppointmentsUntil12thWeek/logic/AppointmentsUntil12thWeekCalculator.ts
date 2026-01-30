import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const TARGET_NUMBER_OF_APPOINTMENTS = 1;
export type Status = {
    tagStatus: PrintTagTheme;
};
export type InputData = {
    appointmentsUntil12thWeek: PregnancyAndPuerperiumCareItem["appointmentsUntil12thWeek"];
};

export class AppointmentsUntil12thWeekCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }
    public computeAppointmentsUntil12thWeek(): Count {
        const appointmentsUntil12thWeek = this.#data.appointmentsUntil12thWeek;
        return {
            current: appointmentsUntil12thWeek,
            total: TARGET_NUMBER_OF_APPOINTMENTS,
        };
    }
    public computeStatus(): Status {
        const appointmentsUntil12thWeek = this.#data.appointmentsUntil12thWeek;
        return appointmentsUntil12thWeek == 0
            ? { tagStatus: "disabled" }
            : { tagStatus: "success" };
    }
}

import type { PregnancyAndPuerperiumCareItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/pregnancyAndPuerperiumCare/model";

export type InputData = {
    appointmentsUntil12thWeek: PregnancyAndPuerperiumCareItem["appointmentsUntil12thWeek"];
};
export type Status = 0 | 1;

export class AppointmentsUntil12thWeekCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    public computeStatus(): Status {
        const appointmentsUntil12thWeek = this.#data.appointmentsUntil12thWeek;
        return appointmentsUntil12thWeek == 0 ? 0 : 1;
    }
}

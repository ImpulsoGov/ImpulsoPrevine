import type { PrintTagTheme } from "@/features/common/frontend/molecules";
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

export type InputData = {
    gestationalAgeByLastMenstrualPeriodWeeks: PregnancyAndPuerperiumCareItem["gestationalAgeByLastMenstrualPeriodWeeks"];
    gestationalAgeByLastMenstrualPeriodDays: PregnancyAndPuerperiumCareItem["gestationalAgeByLastMenstrualPeriodDays"];
    gestationalAgeByObstreticalUltrasoundWeeks: PregnancyAndPuerperiumCareItem["gestationalAgeByObstreticalUltrasoundWeeks"];
    gestationalAgeByObstreticalUltrasoundDays: PregnancyAndPuerperiumCareItem["gestationalAgeByObstreticalUltrasoundDays"];
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
    homeVisitsDuringPregnancy: PregnancyAndPuerperiumCareItem["homeVisitsDuringPregnancy"];
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

type GestationalAge = {
    weeks: number | null;
    days: number | null;
};

export class HomeVisitsCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #isObstreticalUltrasoundAvailable(): boolean {
        const gestationalAgeByObstreticalUltrasoundWeeks =
            this.#data.gestationalAgeByObstreticalUltrasoundWeeks;
        const gestationalAgeByObstreticalUltrasoundDays =
            this.#data.gestationalAgeByObstreticalUltrasoundDays;
        return (
            gestationalAgeByObstreticalUltrasoundWeeks !== null &&
            gestationalAgeByObstreticalUltrasoundDays !== null
        );
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

    public computeStatus(): Status {
        const gestationalAgeByLastMenstrualPeriodWeeks =
            this.#data.gestationalAgeByLastMenstrualPeriodWeeks;
        const gestationalAgeByLastMenstrualPeriodDays =
            this.#data.gestationalAgeByLastMenstrualPeriodDays;
        const gestationalAgeByObstreticalUltrasoundWeeks =
            this.#data.gestationalAgeByObstreticalUltrasoundWeeks;
        const gestationalAgeByObstreticalUltrasoundDays =
            this.#data.gestationalAgeByObstreticalUltrasoundDays;

        let gestationalAge: GestationalAge = {
            weeks: null,
            days: null,
        };

        if (this.#isObstreticalUltrasoundAvailable()) {
            gestationalAge = {
                weeks: gestationalAgeByObstreticalUltrasoundWeeks,
                days: gestationalAgeByObstreticalUltrasoundDays,
            };
        } else {
            gestationalAge = {
                weeks: gestationalAgeByLastMenstrualPeriodWeeks,
                days: gestationalAgeByLastMenstrualPeriodDays,
            };
        }
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

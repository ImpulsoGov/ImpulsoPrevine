import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;
const MIN_GESTATIONAL_AGE_WEEKS_FOR_THIRD_TRIMESTER = 28;
const TARGET_NUMBER_OF_EXAMS = 2;
const ZERO_EXAMS = 0;

export type CalculatorInput = Pick<
    PregnancyAndPuerperiumCareItem,
    | "homeVisitsDuringPuerperium"
    | "appointmentsDuringPuerperium"
    | "didHivExamAtThirdTrimester"
    | "didSyphilisExamAtThirdTrimester"
>;

export type Status = {
    tagStatus: PrintTagTheme;
};

export class SyphilisAndHivExamsAtThirdTrimesterCalculator {
    #data: CalculatorInput;
    #totalExamsDoneAtThirdTrimester: number = ZERO_EXAMS;

    constructor(data: CalculatorInput) {
        this.#data = data;
        this.#totalExamsDoneAtThirdTrimester =
            this.#countTotalExamsDoneAtThirdTrimester();
    }

    #countTotalExamsDoneAtThirdTrimester(): number {
        let totalExamsDone = ZERO_EXAMS;

        if (this.#data.didHivExamAtThirdTrimester) totalExamsDone += 1;
        if (this.#data.didSyphilisExamAtThirdTrimester) totalExamsDone += 1;

        return totalExamsDone;
    }

    public computeTotalExamsDoneAtThirdTrimester(): Count {
        return {
            current: this.#totalExamsDoneAtThirdTrimester,
            total: TARGET_NUMBER_OF_EXAMS,
        };
    }

    #statusCalcAtThirdTrimester(): Status {
        const totalExamsDoneAtThirdTrimester =
            this.#totalExamsDoneAtThirdTrimester;

        if (totalExamsDoneAtThirdTrimester === ZERO_EXAMS) {
            return { tagStatus: "danger" };
        }

        if (totalExamsDoneAtThirdTrimester < TARGET_NUMBER_OF_EXAMS) {
            return { tagStatus: "warning" };
        }

        return { tagStatus: "success" };
    }

    #statusCalcAtPuerperalPeriod(): Status {
        return this.#totalExamsDoneAtThirdTrimester === TARGET_NUMBER_OF_EXAMS
            ? { tagStatus: "success" }
            : { tagStatus: "disabled" };
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

        if (isPuerperalPeriod) return this.#statusCalcAtPuerperalPeriod();

        const isGestationalAgeAtMaxWeeks =
            gestationalAge["weeks"] === MAX_GESTATIONAL_AGE_WEEKS;
        const isGestationalAgeAboveMaxDays =
            gestationalAge["days"] > MAX_GESTATIONAL_AGE_DAYS;
        const isGestationalAgeAboveMaxWeeks =
            gestationalAge["weeks"] > MAX_GESTATIONAL_AGE_WEEKS;

        if (isGestationalAgeAtMaxWeeks) {
            if (isGestationalAgeAboveMaxDays) {
                return this.#statusCalcAtPuerperalPeriod();
            }
        }

        if (isGestationalAgeAboveMaxWeeks) {
            return this.#statusCalcAtPuerperalPeriod();
        }

        const isGestationalAgeBelowMinWeeksForThirdTrimester =
            gestationalAge["weeks"] <
            MIN_GESTATIONAL_AGE_WEEKS_FOR_THIRD_TRIMESTER;

        if (isGestationalAgeBelowMinWeeksForThirdTrimester) {
            return { tagStatus: "inapplicable" };
        }

        return this.#statusCalcAtThirdTrimester();
    }
}

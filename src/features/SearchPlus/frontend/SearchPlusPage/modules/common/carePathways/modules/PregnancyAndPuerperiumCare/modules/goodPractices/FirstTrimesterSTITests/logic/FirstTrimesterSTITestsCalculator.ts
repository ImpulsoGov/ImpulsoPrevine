import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { PregnancyAndPuerperiumCareItem } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare";
import type { Count } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

const FIRST_TRIMESTER_WEEKS = 13;
const FIRST_TRIMESTER_DAYS = 6;
const TARGET_NUMBER_OF_TESTS = 4;
const ZERO_TESTS = 0;
const THREE_TESTS = 3;
export type CalculatorInput = {
    didHivTestDuringFirstTrimester: PregnancyAndPuerperiumCareItem["didHivTestDuringFirstTrimester"];
    didSyphilisTestDuringFirstTrimester: PregnancyAndPuerperiumCareItem["didSyphilisTestDuringFirstTrimester"];
    didHepatitisBTestDuringFirstTrimester: PregnancyAndPuerperiumCareItem["didHepatitisBTestDuringFirstTrimester"];
    didHepatitisCTestDuringFirstTrimester: PregnancyAndPuerperiumCareItem["didHepatitisCTestDuringFirstTrimester"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

export class FirstTrimesterSTITestsCalculator {
    #data: CalculatorInput;

    constructor(data: CalculatorInput) {
        this.#data = data;
    }
    public computeSTITestsDuringFirstTrimester(): Count {
        const {
            didHivTestDuringFirstTrimester,
            didSyphilisTestDuringFirstTrimester,
            didHepatitisBTestDuringFirstTrimester,
            didHepatitisCTestDuringFirstTrimester,
        } = this.#data;
        const current =
            Number(didHivTestDuringFirstTrimester) +
            Number(didSyphilisTestDuringFirstTrimester) +
            Number(didHepatitisBTestDuringFirstTrimester) +
            Number(didHepatitisCTestDuringFirstTrimester);
        return {
            current,
            total: TARGET_NUMBER_OF_TESTS,
        };
    }
    #statusCalcDuringFirstTrimester(): Status {
        const stisTestsDuringFirstTrimester =
            this.computeSTITestsDuringFirstTrimester();
        if (stisTestsDuringFirstTrimester.current === ZERO_TESTS) {
            return { tagStatus: "danger" };
        }
        if (stisTestsDuringFirstTrimester.current < THREE_TESTS) {
            return { tagStatus: "warning" };
        }
        if (stisTestsDuringFirstTrimester.current < TARGET_NUMBER_OF_TESTS) {
            return { tagStatus: "attention" };
        }
        return { tagStatus: "success" };
    }
    #statusCalcAfterFirstTrimester(): Status {
        const stisTestsDuringFirstTrimester =
            this.computeSTITestsDuringFirstTrimester();
        return stisTestsDuringFirstTrimester.current < TARGET_NUMBER_OF_TESTS
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

        const isGestationalAgeAfterFirstTrimester =
            gestationalAge["weeks"] > FIRST_TRIMESTER_WEEKS ||
            (gestationalAge["weeks"] === FIRST_TRIMESTER_WEEKS &&
                gestationalAge["days"] > FIRST_TRIMESTER_DAYS);

        if (isGestationalAgeAfterFirstTrimester) {
            return this.#statusCalcAfterFirstTrimester();
        }

        return this.#statusCalcDuringFirstTrimester();
    }
}

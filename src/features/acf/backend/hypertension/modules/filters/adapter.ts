import {
    ageRangeCodeToText,
    goodPracticesStatusByQuarterCodeToText,
    medicalRecordUpdatedCodeToText,
} from "@/features/acf/shared/hypertension/model";
import type { FiltersOptionsCoaps, FiltersOptionsCoeq } from "./model";
import type {
    FiltersOptionsDbCoaps,
    FiltersOptionsDbCoeq,
} from "../common/FiltersOptionsDb";

// TODO: criar função que adapta os campos em comum entre coaps e coeq
export const dbToModelCoaps = (
    filtersOptions: FiltersOptionsDbCoaps
): FiltersOptionsCoaps => {
    return {
        ...dbToModelCoeq(filtersOptions),
        careTeamName: filtersOptions.careTeamName,
    };
};

export const dbToModelCoeq = (
    filtersOptions: FiltersOptionsDbCoeq
): FiltersOptionsCoeq => {
    return {
        microAreaName: filtersOptions.microAreaName,
        patientAgeRange: filtersOptions.patientAgeRange.map(
            (code) => ageRangeCodeToText[code]
        ),
        goodPracticesStatusByQuarter:
            filtersOptions.goodPracticesStatusByQuarter.map(
                (code) => goodPracticesStatusByQuarterCodeToText[code]
            ),
        medicalRecordUpdated: filtersOptions.isMedicalRecordUpdated.map(
            (code: boolean) =>
                medicalRecordUpdatedCodeToText[
                    code.toString() as "true" | "false"
                ]
        ),
    };
};

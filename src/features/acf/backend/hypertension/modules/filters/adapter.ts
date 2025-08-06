import type * as DbCodeToText from "@/features/acf/backend/hypertension/modules/common/DbCodeToText";
import { statusByQuarterCodeToText } from "../common/DbCodeToText";
import type {
    FiltersOptionsCoaps,
    FiltersOptionsCoeq,
    FiltersOptionsDbCoaps,
    FiltersOptionsDbCoeq,
} from "./model";

type AgeRangeCode = DbCodeToText.StatusCode;

type AgeRange =
    | "0 a 10 (Criança)"
    | "11 a 19 (Adolescente)"
    | "20 a 59 (Adulto)"
    | "60 ou mais (Idoso)";

const ageRangeCodeToText: Record<AgeRangeCode, AgeRange> = {
    10: "0 a 10 (Criança)",
    20: "11 a 19 (Adolescente)",
    30: "20 a 59 (Adulto)",
    40: "60 ou mais (Idoso)",
};

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
        appointmentStatusByQuarter:
            filtersOptions.appointmentStatusByQuarter.map(
                (code) => statusByQuarterCodeToText[code as AgeRangeCode]
            ),
        latestExamRequestStatusByQuarter:
            filtersOptions.latestExamRequestStatusByQuarter.map(
                (code) => statusByQuarterCodeToText[code as AgeRangeCode]
            ),
        microAreaName: filtersOptions.microAreaName,
        patientAgeRange: filtersOptions.patientAgeRange.map(
            (code) => ageRangeCodeToText[code as AgeRangeCode]
        ),
    };
};

import {
    ageRangeCodeToText,
    appointmentStatusByQuarterCodeToText,
    goodPracticesStatusByQuarterCodeToText,
    latestExamRequestStatusByQuarterCodeToText,
    medicalRecordUpdatedCodeToText,
} from "@/features/acf/shared/hypertension/model";
import type { FiltersOptionsCoaps, FiltersOptionsCoeq } from "./model";
import type {
    FiltersOptionsDbCoaps,
    FiltersOptionsDbCoeq,
} from "../common/FiltersOptionsDb";
import { updateQuarterText } from "../common/UpdateQuarterText";

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
    const updatedAppointmentStatusByQuarter = updateQuarterText(
        appointmentStatusByQuarterCodeToText
    );
    const updatedLatestExamRequestStatusByQuarter = updateQuarterText(
        latestExamRequestStatusByQuarterCodeToText
    );
    return {
        appointmentStatusByQuarter:
            filtersOptions.appointmentStatusByQuarter.map(
                (code) => updatedAppointmentStatusByQuarter[code]
            ),
        latestExamRequestStatusByQuarter:
            filtersOptions.latestExamRequestStatusByQuarter.map(
                (code) => updatedLatestExamRequestStatusByQuarter[code]
            ),
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

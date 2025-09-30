import type * as db from "@prisma/client";
import * as model from "@/features/acf/shared/diabetes/model";
import type { PageItem } from "./model";
import type {
    CoapsFilters,
    SharedFilters,
} from "@/features/acf/shared/diabetes/schema";
import type {
    FiltersOptionsDbCoaps,
    SharedFiltersOptionsDb,
} from "../common/FiltersOptionsDb";
import { updateQuarterText } from "@features/acf/backend/common/UpdateQuarterText";

const dbToModel = (diabetesRow: db.DiabetesAcfItem): PageItem => {
    const updatedAppointmentStatusByQuarterCodeToText = updateQuarterText(
        model.appointmentStatusByQuarterCodeToText
    );
    const updatedBloodPressureExamStatusByQuarterCodeToText = updateQuarterText(
        model.bloodPressureExamStatusByQuarterCodeToText
    );
    const updatedHomeVisitStatusByQuarterCodeToText = updateQuarterText(
        model.homeVisitStatusByQuarterCodeToText
    );
    const updatedWeightHeightStatusByQuarterCodeToText = updateQuarterText(
        model.weightHeightStatusByQuarterCodeToText
    );
    const updatedGlycatedHemoglobinExamStatusByQuarterCodeToText =
        updateQuarterText(
            model.glycatedHemoglobinExamStatusByQuarterCodeToText
        );
    const updatedFeetExamStatusByQuarterCodeToText = updateQuarterText(
        model.feetExamStatusByQuarterCodeToText
    );

    return {
        municipalitySusId: diabetesRow.municipalitySusId,
        municipalityName: diabetesRow.municipalityName,
        patientName: diabetesRow.patientName,
        patientCpf: diabetesRow.patientCpf,
        patientCns: diabetesRow.patientCns,
        latestAppointmentDate: diabetesRow.latestAppointmentDate,
        appointmentStatusByQuarter:
            updatedAppointmentStatusByQuarterCodeToText[
                diabetesRow.appointmentStatusByQuarter as model.AppointmentStatusByQuarterCode
            ],
        latestBloodPressureExamRequestDate:
            diabetesRow.latestBloodPressureExamRequestDate,
        bloodPressureExamStatusByQuarter:
            updatedBloodPressureExamStatusByQuarterCodeToText[
                diabetesRow.bloodPressureExamStatusByQuarter as model.BloodPressureExamStatusByQuarterCode
            ],
        latestGlycatedHemoglobinExamRequestDate:
            diabetesRow.latestGlycatedHemoglobinExamRequestDate,
        glycatedHemoglobinExamStatusByQuarter:
            updatedGlycatedHemoglobinExamStatusByQuarterCodeToText[
                diabetesRow.glycatedHemoglobinExamStatusByQuarter as model.GlycatedHemoglobinExamStatusByQuarterCode
            ],
        latestFeetExamRequestDate: diabetesRow.latestFeetExamRequestDate,
        feetExamStatusByQuarter:
            updatedFeetExamStatusByQuarterCodeToText[
                diabetesRow.feetExamStatusByQuarter as model.FeetExamStatusByQuarterCode
            ],
        careTeamName: diabetesRow.careTeamName,
        microAreaName: diabetesRow.microAreaName,
        patientPhoneNumber: diabetesRow.patientPhoneNumber,
        patientAge: diabetesRow.patientAge,
        goodPracticesSum: diabetesRow.goodPracticesSum,
        latestHomeVisitDate: diabetesRow.latestHomeVisitDate,
        homeVisitStatusByQuarter:
            updatedHomeVisitStatusByQuarterCodeToText[
                diabetesRow.homeVisitStatusByQuarter as model.HomeVisitStatusByQuarterCode
            ],
        latestWeightHeightDate: diabetesRow.latestWeightHeightDate,
        weightHeightStatusByQuarter:
            updatedWeightHeightStatusByQuarterCodeToText[
                diabetesRow.weightHeightStatusByQuarter as model.WeightHeightStatusByQuarterCode
            ],
        medicalRecordUpdated:
            model.medicalRecordUpdatedCodeToText[
                diabetesRow.isMedicalRecordUpdated ? "true" : "false"
            ],
    };
};

export const diabetesPageDbToModel = (
    data: ReadonlyArray<db.DiabetesAcfItem>
): Array<PageItem> => {
    return data.map(dbToModel);
};

// TODO: mover para algum common porque essa função está genérica
const filterOptionsModelToDb = <
    TFilterText extends string,
    TFilterCode extends
        | model.PatientAgeRangeCode
        | model.GoodPracticesStatusByQuarterCode,
>(
    options: ReadonlyArray<TFilterText>,
    filterCodeToText: Record<TFilterCode, TFilterText>
): Array<TFilterCode> => {
    const filterTextToCode = Object.entries(filterCodeToText).reduce(
        (acc, [code, text]) => {
            acc[text as TFilterText] = Number(code) as TFilterCode;
            return acc;
        },
        {} as Record<TFilterText, TFilterCode>
    );

    return options.map((value) => filterTextToCode[value]);
};

const sharedFiltersModelToDb = (
    filters: SharedFilters
): SharedFiltersOptionsDb => {
    return {
        patientAgeRange: filterOptionsModelToDb(
            filters.patientAgeRange,
            model.ageRangeCodeToText
        ),
        microAreaName: filters.microAreaName,
        goodPracticesStatusByQuarter: filterOptionsModelToDb(
            filters.goodPracticesStatusByQuarter,
            model.goodPracticesStatusByQuarterCodeToText
        ),
        isMedicalRecordUpdated: filters.medicalRecordUpdated.map(
            (value) => value === "Atualizada"
        ),
    };
};

export const filtersModelToDbCoeq = sharedFiltersModelToDb;

export const filtersModelToDbCoaps = (
    filters: CoapsFilters
): FiltersOptionsDbCoaps => {
    return {
        ...sharedFiltersModelToDb(filters),
        careTeamName: filters.careTeamName,
    };
};

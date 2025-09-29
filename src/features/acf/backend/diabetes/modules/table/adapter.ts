import type * as db from "@prisma/client";
import type {
    AppointmentStatusByQuarterCode,
    HomeVisitStatusByQuarterCode,
    PatientAgeRangeCode,
    WeightHeightStatusByQuarterCode,
    BloodPressureExamStatusByQuarterCode,
    GlycatedHemoglobinExamStatusByQuarterCode,
    FeetExamStatusByQuarterCode,
    GoodPracticesStatusByQuarterCode,
} from "@/features/acf/shared/diabetes/model";
import {
    ageRangeCodeToText,
    appointmentStatusByQuarterCodeToText,
    goodPracticesStatusByQuarterCodeToText,
    homeVisitStatusByQuarterCodeToText,
    medicalRecordUpdatedCodeToText,
    weightHeightStatusByQuarterCodeToText,
    bloodPressureExamStatusByQuarterCodeToText,
    glycatedHemoglobinExamStatusByQuarterCodeToText,
    feetExamStatusByQuarterCodeToText,
} from "@/features/acf/shared/diabetes/model";
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
        appointmentStatusByQuarterCodeToText
    );
    const updatedBloodPressureExamStatusByQuarterCodeToText = updateQuarterText(
        bloodPressureExamStatusByQuarterCodeToText
    );
    const updatedHomeVisitStatusByQuarterCodeToText = updateQuarterText(
        homeVisitStatusByQuarterCodeToText
    );
    const updatedWeightHeightStatusByQuarterCodeToText = updateQuarterText(
        weightHeightStatusByQuarterCodeToText
    );
    const updatedGlycatedHemoglobinExamStatusByQuarterCodeToText =
        updateQuarterText(glycatedHemoglobinExamStatusByQuarterCodeToText);
    const updatedFeetExamStatusByQuarterCodeToText = updateQuarterText(
        feetExamStatusByQuarterCodeToText
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
                diabetesRow.appointmentStatusByQuarter as AppointmentStatusByQuarterCode
            ],
        latestBloodPressureExamRequestDate:
            diabetesRow.latestBloodPressureExamRequestDate,
        bloodPressureExamStatusByQuarter:
            updatedBloodPressureExamStatusByQuarterCodeToText[
                diabetesRow.bloodPressureExamStatusByQuarter as BloodPressureExamStatusByQuarterCode
            ],
        latestGlycatedHemoglobinExamRequestDate:
            diabetesRow.latestGlycatedHemoglobinExamRequestDate,
        glycatedHemoglobinExamStatusByQuarter:
            updatedGlycatedHemoglobinExamStatusByQuarterCodeToText[
                diabetesRow.glycatedHemoglobinExamStatusByQuarter as GlycatedHemoglobinExamStatusByQuarterCode
            ],
        latestFeetExamRequestDate: diabetesRow.latestFeetExamRequestDate,
        feetExamStatusByQuarter:
            updatedFeetExamStatusByQuarterCodeToText[
                diabetesRow.feetExamStatusByQuarter as FeetExamStatusByQuarterCode
            ],
        careTeamName: diabetesRow.careTeamName,
        microAreaName: diabetesRow.microAreaName,
        patientPhoneNumber: diabetesRow.patientPhoneNumber,
        patientAge: diabetesRow.patientAge,
        goodPracticesSum: diabetesRow.goodPracticesSum,
        latestHomeVisitDate: diabetesRow.latestHomeVisitDate,
        homeVisitStatusByQuarter:
            updatedHomeVisitStatusByQuarterCodeToText[
                diabetesRow.homeVisitStatusByQuarter as HomeVisitStatusByQuarterCode
            ],
        latestWeightHeightDate: diabetesRow.latestWeightHeightDate,
        weightHeightStatusByQuarter:
            updatedWeightHeightStatusByQuarterCodeToText[
                diabetesRow.weightHeightStatusByQuarter as WeightHeightStatusByQuarterCode
            ],
        medicalRecordUpdated:
            medicalRecordUpdatedCodeToText[
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
    TFilterCode extends PatientAgeRangeCode | GoodPracticesStatusByQuarterCode,
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
            ageRangeCodeToText
        ),
        microAreaName: filters.microAreaName,
        goodPracticesStatusByQuarter: filterOptionsModelToDb(
            filters.goodPracticesStatusByQuarter,
            goodPracticesStatusByQuarterCodeToText
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

import type * as db from "@prisma/client";
import type {
    AppointmentStatusByQuarterCode,
    HomeVisitStatusByQuarterCode,
    LatestExamRequestStatusByQuarterCode,
    PatientAgeRangeCode,
    WeightHeightStatusByQuarterCode,
} from "@/features/acf/shared/hypertension/model";
import {
    ageRangeCodeToText,
    appointmentStatusByQuarterCodeToText,
    goodPracticesStatusByQuarterCodeToText,
    homeVisitStatusByQuarterCodeToText,
    latestExamRequestStatusByQuarterCodeToText,
    medicalRecordUpdatedCodeToText,
    weightHeightStatusByQuarterCodeToText,
} from "@/features/acf/shared/hypertension/model";
import type { PageItem } from "./model";
import type {
    CoapsFilters,
    SharedFilters,
} from "@/features/acf/shared/hypertension/schema";
import type {
    FiltersOptionsDbCoaps,
    SharedFiltersOptionsDb,
} from "../common/FiltersOptionsDb";
import { updateQuarterText } from "../common/UpdateQuarterText";

const dbToModel = (hypertensionRow: db.HypertensionAcfItem): PageItem => {
    const updatedAppointmentStatusByQuarterCodeToText = updateQuarterText(
        appointmentStatusByQuarterCodeToText
    );
    const updatedLatestExamRequestStatusByQuarterCodeToText = updateQuarterText(
        latestExamRequestStatusByQuarterCodeToText
    );
    const updatedHomeVisitStatusByQuarterCodeToText = updateQuarterText(
        homeVisitStatusByQuarterCodeToText
    );
    const updatedWeightHeightStatusByQuarterCodeToText = updateQuarterText(
        weightHeightStatusByQuarterCodeToText
    );

    return {
        municipalitySusId: hypertensionRow.municipalitySusId,
        municipalityName: hypertensionRow.municipalityName,
        patientName: hypertensionRow.patientName,
        patientCpf: hypertensionRow.patientCpf,
        patientCns: hypertensionRow.patientCns,
        latestAppointmentDate: hypertensionRow.latestAppointmentDate,
        appointmentStatusByQuarter:
            updatedAppointmentStatusByQuarterCodeToText[
                hypertensionRow.appointmentStatusByQuarter as AppointmentStatusByQuarterCode
            ],
        latestExamRequestDate: hypertensionRow.latestExamRequestDate,
        latestExamRequestStatusByQuarter:
            updatedLatestExamRequestStatusByQuarterCodeToText[
                hypertensionRow.latestExamRequestStatusByQuarter as LatestExamRequestStatusByQuarterCode
            ],
        careTeamName: hypertensionRow.careTeamName,
        microAreaName: hypertensionRow.microAreaName,
        patientPhoneNumber: hypertensionRow.patientPhoneNumber,
        patientAge: hypertensionRow.patientAge,
        goodPracticesSum: hypertensionRow.goodPracticesSum,
        latestHomeVisitDate: hypertensionRow.latestHomeVisitDate,
        homeVisitStatusByQuarter:
            updatedHomeVisitStatusByQuarterCodeToText[
                hypertensionRow.homeVisitStatusByQuarter as HomeVisitStatusByQuarterCode
            ],
        latestWeightHeightDate: hypertensionRow.latestWeightHeightDate,
        weightHeightStatusByQuarter:
            updatedWeightHeightStatusByQuarterCodeToText[
                hypertensionRow.weightHeightStatusByQuarter as WeightHeightStatusByQuarterCode
            ],
        medicalRecordUpdated:
            medicalRecordUpdatedCodeToText[
                hypertensionRow.isMedicalRecordUpdated ? "true" : "false"
            ],
    };
};

export const hypertensionPageDbToModel = (
    data: ReadonlyArray<db.HypertensionAcfItem>
): Array<PageItem> => {
    return data.map(dbToModel);
};

// TODO: mover para algum common porque essa função está genérica
const filterOptionsModelToDb = <
    TFilterText extends string,
    TFilterCode extends
        | PatientAgeRangeCode
        | AppointmentStatusByQuarterCode
        // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
        | LatestExamRequestStatusByQuarterCode,
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
    const updatedAppointmentStatusByQuarter = updateQuarterText(
        appointmentStatusByQuarterCodeToText
    );
    const updatedLatestExamRequestStatusByQuarter = updateQuarterText(
        latestExamRequestStatusByQuarterCodeToText
    );

    return {
        appointmentStatusByQuarter: filterOptionsModelToDb(
            filters.appointmentStatusByQuarter,
            updatedAppointmentStatusByQuarter
        ),
        latestExamRequestStatusByQuarter: filterOptionsModelToDb(
            filters.latestExamRequestStatusByQuarter,
            updatedLatestExamRequestStatusByQuarter
        ),
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

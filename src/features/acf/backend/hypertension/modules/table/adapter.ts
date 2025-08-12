import type * as db from "@prisma/client";
import type {
    AppointmentStatusByQuarterCode,
    LatestExamRequestStatusByQuarterCode,
    DefaultStatusCode,
} from "@/features/acf/shared/hypertension/model";
import {
    ageRangeCodeToText,
    appointmentStatusByQuarterCodeToText,
    latestExamRequestStatusByQuarterCodeToText,
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

const dbToModel = (hypertensionRow: db.HypertensionAcfItem): PageItem => {
    return {
        municipalitySusId: hypertensionRow.municipalitySusId,
        municipalityName: hypertensionRow.municipalityName,
        patientName: hypertensionRow.patientName,
        patientCpf: hypertensionRow.patientCpf,
        latestAppointmentDate: hypertensionRow.latestAppointmentDate,
        appointmentStatusByQuarter:
            appointmentStatusByQuarterCodeToText[
                hypertensionRow.appointmentStatusByQuarter as AppointmentStatusByQuarterCode
            ],
        latestExamRequestDate: hypertensionRow.latestExamRequestDate,
        latestExamRequestStatusByQuarter:
            latestExamRequestStatusByQuarterCodeToText[
                hypertensionRow.latestExamRequestStatusByQuarter as LatestExamRequestStatusByQuarterCode
            ],
        careTeamName: hypertensionRow.careTeamName,
        microAreaName: hypertensionRow.microAreaName,
        patientPhoneNumber: hypertensionRow.patientPhoneNumber,
        patientAge: hypertensionRow.patientAge,
        patientCns: hypertensionRow.patientCns,
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
    TFilterCode extends DefaultStatusCode,
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
        appointmentStatusByQuarter: filterOptionsModelToDb(
            filters.appointmentStatusByQuarter,
            appointmentStatusByQuarterCodeToText
        ),
        latestExamRequestStatusByQuarter: filterOptionsModelToDb(
            filters.latestExamRequestStatusByQuarter,
            latestExamRequestStatusByQuarterCodeToText
        ),
        patientAgeRange: filterOptionsModelToDb(
            filters.patientAgeRange,
            ageRangeCodeToText
        ),
        microAreaName: filters.microAreaName,
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

import type * as db from "@prisma/client";
import type {
    AppointmentStatusByQuarterCode,
    LatestExamRequestStatusByQuarterCode,
    PatientAgeRangeCode,
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
import { updateQuarterText } from "../common/UpdateQuarterText";

const dbToModel = (hypertensionRow: db.HypertensionAcfItem): PageItem => {
    const updatedAppointmentStatusByQuarter = updateQuarterText(
        appointmentStatusByQuarterCodeToText
    );
    const updatedLatestExamRequestStatusByQuarter = updateQuarterText(
        latestExamRequestStatusByQuarterCodeToText
    );
    return {
        municipalitySusId: hypertensionRow.municipalitySusId,
        municipalityName: hypertensionRow.municipalityName,
        patientName: hypertensionRow.patientName,
        patientCpf: hypertensionRow.patientCpf || "",
        patientCns: hypertensionRow.patientCns || "",
        latestAppointmentDate: hypertensionRow.latestAppointmentDate,
        appointmentStatusByQuarter:
            updatedAppointmentStatusByQuarter[
                hypertensionRow.appointmentStatusByQuarter as AppointmentStatusByQuarterCode
            ],
        latestExamRequestDate: hypertensionRow.latestExamRequestDate,
        latestExamRequestStatusByQuarter:
            updatedLatestExamRequestStatusByQuarter[
                hypertensionRow.latestExamRequestStatusByQuarter as LatestExamRequestStatusByQuarterCode
            ],
        careTeamName: hypertensionRow.careTeamName,
        microAreaName: hypertensionRow.microAreaName,
        patientPhoneNumber: hypertensionRow.patientPhoneNumber,
        patientAge: hypertensionRow.patientAge,
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

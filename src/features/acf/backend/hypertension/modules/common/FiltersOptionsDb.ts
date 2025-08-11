import type * as model from "@/features/acf/shared/hypertension/model";
import type * as db from "@prisma/client";

export type SharedFiltersOptionsDb = {
    microAreaName: ReadonlyArray<db.HypertensionAcfItem["microAreaName"]>;
    appointmentStatusByQuarter: ReadonlyArray<model.AppointmentStatusByQuarterCode>;
    latestExamRequestStatusByQuarter: ReadonlyArray<model.LatestExamRequestStatusByQuarterCode>;
    patientAgeRange: ReadonlyArray<model.PatientAgeRangeCode>;
};

export type FiltersOptionsDbCoeq = SharedFiltersOptionsDb;

export type FiltersOptionsDbCoaps = SharedFiltersOptionsDb & {
    careTeamName: ReadonlyArray<db.HypertensionAcfItem["careTeamName"]>;
};

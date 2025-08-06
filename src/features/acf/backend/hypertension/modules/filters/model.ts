import type {
    AppointmentStatusByQuarterCode,
    AppointmentStatusByQuarterText,
    HypertensionAcfItem,
    LatestExamRequestStatusByQuarterCode,
    LatestExamRequestStatusByQuarterText,
    PatientAgeRangeCode,
    PatientAgeRangeText,
} from "@features/acf/shared/hypertension/model";
import type * as db from "@prisma/client";

// TODO: criar tipos com os campos em comum entre coaps e coeq e reaproveitar
export type FiltersOptionsDbCoaps = {
    careTeamName: ReadonlyArray<db.HypertensionAcfItem["careTeamName"]>;
    microAreaName: ReadonlyArray<db.HypertensionAcfItem["microAreaName"]>;
    appointmentStatusByQuarter: ReadonlyArray<AppointmentStatusByQuarterCode>;
    latestExamRequestStatusByQuarter: ReadonlyArray<LatestExamRequestStatusByQuarterCode>;
    patientAgeRange: ReadonlyArray<PatientAgeRangeCode>;
};

export type FiltersOptionsDbCoeq = {
    microAreaName: ReadonlyArray<db.HypertensionAcfItem["microAreaName"]>;
    appointmentStatusByQuarter: ReadonlyArray<AppointmentStatusByQuarterCode>;
    latestExamRequestStatusByQuarter: ReadonlyArray<LatestExamRequestStatusByQuarterCode>;
    patientAgeRange: ReadonlyArray<PatientAgeRangeCode>;
};

export type FiltersOptionsCoeq = {
    microAreaName: ReadonlyArray<HypertensionAcfItem["microAreaName"]>;
    appointmentStatusByQuarter: ReadonlyArray<AppointmentStatusByQuarterText>;
    latestExamRequestStatusByQuarter: ReadonlyArray<LatestExamRequestStatusByQuarterText>;
    patientAgeRange: ReadonlyArray<PatientAgeRangeText>;
};

export type FiltersOptionsCoaps = {
    careTeamName: ReadonlyArray<HypertensionAcfItem["careTeamName"]>;
    microAreaName: ReadonlyArray<HypertensionAcfItem["microAreaName"]>;
    appointmentStatusByQuarter: ReadonlyArray<AppointmentStatusByQuarterText>;
    latestExamRequestStatusByQuarter: ReadonlyArray<LatestExamRequestStatusByQuarterText>;
    patientAgeRange: ReadonlyArray<PatientAgeRangeText>;
};

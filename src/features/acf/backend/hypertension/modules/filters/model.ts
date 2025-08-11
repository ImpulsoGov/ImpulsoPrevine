import type {
    AppointmentStatusByQuarterText,
    HypertensionAcfItem,
    LatestExamRequestStatusByQuarterText,
    PatientAgeRangeText,
} from "@features/acf/shared/hypertension/model";

// TODO: criar tipos com os campos em comum entre coaps e coeq e reaproveitar
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

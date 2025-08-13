export type DefaultStatusCode = 10 | 20 | 30 | 40;

export type PatientAgeRangeCode = DefaultStatusCode;

export const patientAgeRangeTexts = [
    "0 a 10 (Criança)",
    "11 a 19 (Adolescente)",
    "20 a 59 (Adulto)",
    "60 ou mais (Idoso)",
] as const;

export type PatientAgeRangeText = (typeof patientAgeRangeTexts)[number];

export const ageRangeCodeToText: Record<
    PatientAgeRangeCode,
    PatientAgeRangeText
> = {
    10: "0 a 10 (Criança)",
    20: "11 a 19 (Adolescente)",
    30: "20 a 59 (Adulto)",
    40: "60 ou mais (Idoso)",
};

const defaultStatuses = [
    "Nunca realizado",
    "Atrasada",
    "Em dia",
    "Vence dentro do Quadri",
] as const;

export const appointmentStatusByQuarterTexts = [...defaultStatuses] as const;

export type AppointmentStatusByQuarterCode = DefaultStatusCode;
export type AppointmentStatusByQuarterText =
    (typeof appointmentStatusByQuarterTexts)[number];

//TODO: Essa fn deveria estar em algum adapter
export const appointmentStatusByQuarterCodeToText: Record<
    AppointmentStatusByQuarterCode,
    AppointmentStatusByQuarterText
> = {
    10: "Nunca realizado",
    20: "Atrasada",
    30: "Vence dentro do Quadri",
    40: "Em dia",
};

export const latestExamRequestStatusByQuarterTexts = [
    ...defaultStatuses,
] as const;

export type LatestExamRequestStatusByQuarterCode = DefaultStatusCode;
export type LatestExamRequestStatusByQuarterText =
    (typeof latestExamRequestStatusByQuarterTexts)[number];

//TODO: Essa fn deveria estar em algum adapter
export const latestExamRequestStatusByQuarterCodeToText: Record<
    LatestExamRequestStatusByQuarterCode,
    LatestExamRequestStatusByQuarterText
> = {
    10: "Nunca realizado",
    20: "Atrasada",
    30: "Vence dentro do Quadri",
    40: "Em dia",
};

export type HypertensionAcfItem = {
    municipalitySusId: string;
    municipalityName: string;
    patientName: string;
    patientCpf: string;
    latestAppointmentDate: Date | null;
    appointmentStatusByQuarter: AppointmentStatusByQuarterText;
    latestExamRequestDate: Date | null;
    latestExamRequestStatusByQuarter: LatestExamRequestStatusByQuarterText;
    careTeamName: string | null;
    microAreaName: string | null;
    patientPhoneNumber: string | null;
    patientAge: number;
    patientAgeRange: PatientAgeRangeText;
};

export const sortOrder = ["asc", "desc"] as const;

export type SortOrder = (typeof sortOrder)[number];

export const sortableFieldCoeq: ReadonlyArray<keyof HypertensionAcfItem> = [
    "patientName",
    "patientCpf",
    "latestAppointmentDate",
    "appointmentStatusByQuarter",
    "latestExamRequestDate",
    "latestExamRequestStatusByQuarter",
    "microAreaName",
    "patientPhoneNumber",
    "patientAge",
] as const;

export const sortableFieldCoaps: ReadonlyArray<keyof HypertensionAcfItem> = [
    "patientName",
    "patientCpf",
    "latestAppointmentDate",
    "appointmentStatusByQuarter",
    "latestExamRequestDate",
    "latestExamRequestStatusByQuarter",
    "microAreaName",
    "patientPhoneNumber",
    "patientAge",
    "careTeamName",
] as const;

export type DefaultStatusCode = 10 | 20 | 30 | 40;

export type PatientAgeRangeCode = 10 | 20 | 30 | 70;

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
    70: "60 ou mais (Idoso)",
};

const defaultStatuses = [
    "Nunca realizado",
    "Atrasada",
    "Em dia",
    "Vence dentro do Q1",
    "Vence dentro do Q2",
    "Vence dentro do Q3",
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
    30: "Vence dentro do Q1",
    40: "Em dia",
};

export const latestExamRequestStatusByQuarterTexts = [
    ...defaultStatuses,
] as const;

export type LatestExamRequestStatusByQuarterCode = DefaultStatusCode;
export type LatestExamRequestStatusByQuarterText =
    (typeof latestExamRequestStatusByQuarterTexts)[number];

export const GoodPracticesStatusByQuarterCodeToText: Record<
    GoodPracticesStatusByQuarterCode,
    GoodPracticesStatusByQuarterText
> = {
    10: "Pelo menos uma a fazer",
    20: "Todas em dia",
};

//TODO: Essa fn deveria estar em algum adapter
export const latestExamRequestStatusByQuarterCodeToText: Record<
    LatestExamRequestStatusByQuarterCode,
    LatestExamRequestStatusByQuarterText
> = {
    10: "Nunca realizado",
    20: "Atrasada",
    30: "Vence dentro do Q1",
    40: "Em dia",
};

export const homeVisitStatusByQuarterTexts = [...defaultStatuses] as const;

export type HomeVisitStatusByQuarterCode = DefaultStatusCode;
export type HomeVisitStatusByQuarterText =
    (typeof homeVisitStatusByQuarterTexts)[number];

export const homeVisitStatusByQuarterCodeToText: Record<
    HomeVisitStatusByQuarterCode,
    HomeVisitStatusByQuarterText
> = {
    10: "Nunca realizado",
    20: "Atrasada",
    30: "Vence dentro do Q1",
    40: "Em dia",
};

export const weightHeightStatusByQuarterTexts = [...defaultStatuses] as const;

export type WeightHeightStatusByQuarterCode = DefaultStatusCode;
export type WeightHeightStatusByQuarterText =
    (typeof weightHeightStatusByQuarterTexts)[number];

export const weightHeightStatusByQuarterCodeToText: Record<
    WeightHeightStatusByQuarterCode,
    WeightHeightStatusByQuarterText
> = {
    10: "Nunca realizado",
    20: "Atrasada",
    30: "Vence dentro do Q1",
    40: "Em dia",
};

export const goodPracticesStatusByQuarterTexts = [
    "Pelo menos uma a fazer",
    "Todas em dia",
] as const;

export type GoodPracticesStatusByQuarterCode = 10 | 20;
export type GoodPracticesStatusByQuarterText =
    (typeof goodPracticesStatusByQuarterTexts)[number];

export const goodPracticesStatusByQuarterCodeToText: Record<
    GoodPracticesStatusByQuarterCode,
    GoodPracticesStatusByQuarterText
> = {
    10: "Pelo menos uma a fazer",
    20: "Todas em dia",
};

export const medicalRecordUpdatedTexts = [
    "Atualizada",
    "Atualização pendente",
] as const;

export type MedicalRecordUpdatedCode = "true" | "false";
export type MedicalRecordUpdatedText =
    (typeof medicalRecordUpdatedTexts)[number];

export const medicalRecordUpdatedCodeToText: Record<
    MedicalRecordUpdatedCode,
    MedicalRecordUpdatedText
> = {
    true: "Atualizada",
    false: "Atualização pendente",
};

export type HypertensionAcfItem = {
    municipalitySusId: string;
    municipalityName: string;
    patientName: string;
    patientCpf: string | null;
    patientCns: string | null;
    latestAppointmentDate: Date | null;
    appointmentStatusByQuarter: AppointmentStatusByQuarterText;
    latestExamRequestDate: Date | null;
    latestExamRequestStatusByQuarter: LatestExamRequestStatusByQuarterText;
    careTeamName: string | null;
    microAreaName: string | null;
    patientPhoneNumber: string | null;
    patientAge: number;
    patientAgeRange: PatientAgeRangeText;
    goodPracticesSum: number;
    latestHomeVisitDate: Date | null;
    homeVisitStatusByQuarter: HomeVisitStatusByQuarterText;
    latestWeightHeightDate: Date | null;
    weightHeightStatusByQuarter: WeightHeightStatusByQuarterText;
    medicalRecordUpdated: MedicalRecordUpdatedText;
    goodPracticesStatusByQuarter: GoodPracticesStatusByQuarterText;
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
    "goodPracticesSum",
    "latestHomeVisitDate",
    "homeVisitStatusByQuarter",
    "latestWeightHeightDate",
    "weightHeightStatusByQuarter",
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
    "goodPracticesSum",
    "latestHomeVisitDate",
    "homeVisitStatusByQuarter",
    "latestWeightHeightDate",
    "weightHeightStatusByQuarter",
] as const;

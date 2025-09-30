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

export const bloodPressureExamStatusByQuarterTexts = [
    ...defaultStatuses,
] as const;

export type BloodPressureExamStatusByQuarterCode = DefaultStatusCode;
export type BloodPressureExamStatusByQuarterText =
    (typeof bloodPressureExamStatusByQuarterTexts)[number];

//TODO: Essa fn deveria estar em algum adapter
export const bloodPressureExamStatusByQuarterCodeToText: Record<
    BloodPressureExamStatusByQuarterCode,
    BloodPressureExamStatusByQuarterText
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

export const glycatedHemoglobinExamStatusByQuarterTexts = [
    ...defaultStatuses,
] as const;

export type GlycatedHemoglobinExamStatusByQuarterCode = DefaultStatusCode;
export type GlycatedHemoglobinExamStatusByQuarterText =
    (typeof glycatedHemoglobinExamStatusByQuarterTexts)[number];

export const glycatedHemoglobinExamStatusByQuarterCodeToText: Record<
    GlycatedHemoglobinExamStatusByQuarterCode,
    GlycatedHemoglobinExamStatusByQuarterText
> = {
    10: "Nunca realizado",
    20: "Atrasada",
    30: "Vence dentro do Q1",
    40: "Em dia",
};

export const feetExamStatusByQuarterTexts = [...defaultStatuses] as const;

export type FeetExamStatusByQuarterCode = DefaultStatusCode;
export type FeetExamStatusByQuarterText =
    (typeof feetExamStatusByQuarterTexts)[number];

export const feetExamStatusByQuarterCodeToText: Record<
    FeetExamStatusByQuarterCode,
    FeetExamStatusByQuarterText
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

export type DiabetesAcfItem = {
    municipalitySusId: string;
    municipalityName: string;
    patientName: string;
    patientCpf: string | null;
    patientCns: string | null;
    patientAge: number;
    patientAgeRange: PatientAgeRangeText;
    patientPhoneNumber: string | null;
    careTeamName: string | null;
    microAreaName: string | null;
    latestAppointmentDate: Date | null;
    appointmentStatusByQuarter: AppointmentStatusByQuarterText;
    latestBloodPressureExamRequestDate: Date | null;
    bloodPressureExamStatusByQuarter: BloodPressureExamStatusByQuarterText;
    goodPracticesSum: number;
    latestHomeVisitDate: Date | null;
    homeVisitStatusByQuarter: HomeVisitStatusByQuarterText;
    latestWeightHeightDate: Date | null;
    weightHeightStatusByQuarter: WeightHeightStatusByQuarterText;
    goodPracticesStatusByQuarter: GoodPracticesStatusByQuarterText;
    medicalRecordUpdated: MedicalRecordUpdatedText;
    latestGlycatedHemoglobinExamRequestDate: Date | null;
    glycatedHemoglobinExamStatusByQuarter: GlycatedHemoglobinExamStatusByQuarterText;
    latestFeetExamRequestDate: Date | null;
    feetExamStatusByQuarter: FeetExamStatusByQuarterText;
};

export const sortOrder = ["asc", "desc"] as const;

export type SortOrder = (typeof sortOrder)[number];

const commonSortableFields = [
    "patientName",
    "goodPracticesSum",
    "latestAppointmentDate",
    "appointmentStatusByQuarter",
    "latestBloodPressureExamRequestDate",
    "bloodPressureExamStatusByQuarter",
    "latestGlycatedHemoglobinExamRequestDate",
    "glycatedHemoglobinExamStatusByQuarter",
    "latestWeightHeightDate",
    "weightHeightStatusByQuarter",
    "latestHomeVisitDate",
    "homeVisitStatusByQuarter",
    "latestFeetExamRequestDate",
    "feetExamStatusByQuarter",
    "microAreaName",
    "patientPhoneNumber",
    "patientAge",
] as const;

export const sortableFieldCoeq: ReadonlyArray<keyof DiabetesAcfItem> = [
    ...commonSortableFields,
] as const;

export const sortableFieldCoaps: ReadonlyArray<keyof DiabetesAcfItem> = [
    ...commonSortableFields,
    "careTeamName",
] as const;

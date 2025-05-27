export const patientStatus = [
    "Consulta e solicitação de hemoglobina a fazer",
    "Apenas a consulta a fazer",
    "Apenas a solicitação de hemoglobina a fazer",
    "Consulta e solicitação de hemoglobina em dia",
] as const;

export type PatientStatus = (typeof patientStatus)[number];

export const conditionIdentifiedBy = [
    "Diagnóstico Clínico",
    "Autorreferida",
] as const;

export type ConditionIdentifiedBy = (typeof conditionIdentifiedBy)[number];

export type VisitantCommunityHealthWorker = string;

export const patientAgeRange = [
    "Menos de 17 anos",
    "Entre 18 e 24 anos",
    "Entre 25 e 34 anos",
    "Entre 35 e 44 anos",
    "Entre 45 e 54 anos",
    "Entre 55 e 65 anos",
    "65 anos ou mais",
] as const;

export type PatientAgeRange = (typeof patientAgeRange)[number];

//ACF = Active Case Finding = Busca Ativa. Fonte: https://www.who.int/publications/i/item/9789290228486
//CHW = Community Health Worker = ACS = Agente Comunitário de Saúde
export type DiabetesAcfItem = {
    municipalitySusID: string;
    municipalityState: string;
    latestExamRequestDate: Date | null;
    mostRecentAppointmentDate: Date | null;
    hemoglobinTestDueDate: string;
    nextAppointmentDueDate: string;
    patientStatus: PatientStatus;
    conditionIdentifiedBy: ConditionIdentifiedBy;
    patientCpfOrBirthday: string | Date;
    patientName: string;
    patientAgeRange: PatientAgeRange;
    patientAge: number;
    careTeamIne: string;
    careTeamName: string;
    visitantCommunityHealthWorker: string;
    mostRecentProductionRecordDate: Date | null;
};

export type AcfDashboardType = "HIPERTENSAO" | "DIABETES";

export const sortableField = [
    "latestExamRequestDate",
    "mostRecentAppointmentDate",
    "hemoglobinTestDueDate",
    "nextAppointmentDueDate",
    "conditionIdentifiedBy",
    "patientCpfOrBirthday",
    "patientName",
    "patientAge",
    "visitantCommunityHealthWorker",
] as const;

export type SortableField = (typeof sortableField)[number];

export const sortOrder = ["asc", "desc"] as const;

export type SortOrder = (typeof sortOrder)[number]

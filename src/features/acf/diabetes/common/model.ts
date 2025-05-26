export type PatientStatus =
    | "Consulta e solicitação de hemoglobina a fazer"
    | "Apenas a consulta a fazer"
    | "Apenas a solicitação de hemoglobina a fazer"
    | "Consulta e solicitação de hemoglobina em dia";

export type ConditionIdentifiedBy = "Diagnóstico Clínico" | "Autorreferida";
export type VisitantCommunityHealthWorker = string;
//TODO: Não usar isso, definir no código do front
//TODO: Deveria ter um espaço no final de "Menos de 17 anos " mesmo?
export type PatientAgeRange =
    | "Menos de 17 anos"
    | "Entre 18 e 24 anos"
    | "Entre 25 e 34 anos"
    | "Entre 35 e 44 anos"
    | "Entre 45 e 54 anos"
    | "Entre 55 e 65 anos"
    | "65 anos ou mais";

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

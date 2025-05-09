export type PatientStatus = "Apenas a consulta a fazer" | "Apenas o exame a fazer" | "Consulta e exame a fazer" | "Consulta e exame em dia";

export type ConditionIdentifiedBy = "Diagnóstico clínico" | "Autorreferido";

//TODO: Não usar isso, definir no código do front
export type PatientAgeRange = "Menos de 17 anos " | "Entre 18 e 24 anos" | "Entre 25 e 34 anos" | "Entre 35 e 44 anos" | "Entre 45 e 54 anos" | "Entre 55 e 65 anos" | "65 anos ou mais";

//ACF = Active Case Finding = Busca Ativa. Fonte: https://www.who.int/publications/i/item/9789290228486
//CHW = Community Health Worker = ACS = Agente Comunitário de Saúde
export type DiabetesAcfItem = {
    municipalitySusID: string | null
    municipalityState: string | null
    latestExamRequestDate: Date | null
    mostRecentAppointmentDate: Date | null
    hemoglobinTestDueDate: string | null,
    patientStatus: PatientStatus | null
    conditionIdentifiedBy: ConditionIdentifiedBy | null
    patientCpfOrBirthday: string | Date | null,
    patientName: string | null
    patientAgeRange: PatientAgeRange | null
    patientAge: number | null
    careTeamIne: string | null
    careTeamName: string | null
    visitantCommunityHealthWorker: string | null
    mostRecentProductionRecordDate: Date | null
}
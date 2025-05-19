export type PatientStatus = "Apenas a consulta a fazer" | "Apenas o exame a fazer" | "Consulta e exame a fazer" | "Consulta e exame em dia";

export type ConditionIdentifiedBy = "Diagnóstico clínico" | "Autorreferido";

//TODO: Não usar isso, definir no código do front
//TODO: Deveria ter um espaço no final de "Menos de 17 anos " mesmo?
export type PatientAgeRange = "Menos de 17 anos " | "Entre 18 e 24 anos" | "Entre 25 e 34 anos" | "Entre 35 e 44 anos" | "Entre 45 e 54 anos" | "Entre 55 e 65 anos" | "65 anos ou mais";

//ACF = Active Case Finding = Busca Ativa. Fonte: https://www.who.int/publications/i/item/9789290228486
//CHW = Community Health Worker = ACS = Agente Comunitário de Saúde
export type DiabetesAcfItem = {
    municipalitySusID: string,
    municipalityState: string,
    latestExamRequestDate: Date | null,
    mostRecentAppointmentDate: Date | null,
    hemoglobinTestDueDate: string,
    nextAppointmentDueDate: string,
    patientStatus: PatientStatus,
    conditionIdentifiedBy: ConditionIdentifiedBy,
    patientCpfOrBirthday: string | Date,
    patientName: string,
    patientAgeRange: PatientAgeRange,
    patientAge: number,
    careTeamIne: string,
    careTeamName: string,
    visitantCommunityHealthWorker: string,
    mostRecentProductionRecordDate: Date | null,
}

export type Filters = {
  visitantCommunityHealthWorker: DiabetesAcfItem['visitantCommunityHealthWorker'][];
  patientStatus: DiabetesAcfItem['patientStatus'][];
  conditionIdentifiedBy: DiabetesAcfItem['conditionIdentifiedBy'][];
  patientAgeRange: DiabetesAcfItem['patientAgeRange'][];
}

// TODO mudar esses tipos para não serem hard coded
export type DiabetesFilterOptions = 'visitantCommunityHealthWorker' |'patientStatus' |'conditionIdentifiedBy' | 'patientAgeRange'

export type DiabetesFilterOptionsDB = 'acs_nome_cadastro' | 'status_usuario' | 'identificacao_condicao_diabetes' | 'cidadao_faixa_etaria'

export type DiabetesDbFilterItem = {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    status_usuario?: string[] | null | undefined;
    // biome-ignore lint/style/useNamingConvention: <explanation>
    identificacao_condicao_diabetes?: string[] | null | undefined;
    // biome-ignore lint/style/useNamingConvention: <explanation>
    acs_nome_cadastro?: string[] | null | undefined;
    // biome-ignore lint/style/useNamingConvention: <explanation>
    cidadao_faixa_etaria?: string[] | null | undefined;
};
export type PatientStatus = "Apenas a consulta a fazer" | "Apenas o exame a fazer" | "Consulta e exame a fazer" | "Consulta e exame em dia";

export type ConditionIdentifiedBy = "Diagnóstico clínico" | "Autorreferido";

//TODO: Não usar isso, definir no código do front
export type PatientAgeRange = "Menos de 17 anos " | "Entre 18 e 24 anos" | "Entre 25 e 34 anos" | "Entre 35 e 44 anos" | "Entre 45 e 54 anos" | "Entre 55 e 65 anos" | "65 anos ou mais";
export type DiabetesAcfDbItem = {
    "cidadao_cpf_dt_nascimento": string
    "municipio_id_sus": string,
    "cidadao_nome": string,
    "identificacao_condicao_diabetes": string,
    "dt_consulta_mais_recente": string,
    "prazo_proxima_consulta": string,
    "dt_solicitacao_hemoglobina_glicada_mais_recente": string,
    "prazo_proxima_solicitacao_hemoglobina_glicada": string,
    "acs_nome_cadastro": string,
    "equipe_ine_cadastro": string,
    "equipe_nome_cadastro": string,
    "dt_registro_producao_mais_recente": string,
    "cidadao_idade": number,
    "cidadao_faixa_etaria": string,
    "status_usuario": string,
    "municipio_uf": string,
}
//ACF = Active Case Finding = Busca Ativa. Fonte: https://www.who.int/publications/i/item/9789290228486
//CHW = Community Health Worker = ACS = Agente Comunitário de Saúde
export type DiabetesAcfPrintItem = {
    municipalitySusID: string
    municipalityState: string
    latestExamRequestDate: Date
    mostRecentAppointmentDate: Date
    hemoglobinTestDueDate: string,
    patientStatus: PatientStatus
    conditionIndentifiedBy: ConditionIdentifiedBy
    patientCpfOrBirthday: string | Date | null,
    patientName: string
    patientAgeRange: PatientAgeRange
    patientAge: number
    careTeamIne: string
    careTeamName: string
    visitantCommunityHealthWorker: string 
    mostRecentProductionRecordDate: Date
}

import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';
import type { ConditionIdentifiedBy, DiabetesAcfItem, PatientAgeRange, PatientStatus } from "./DiabetesAcfItem.model"

const patientCpfOrBirthdayAdapter = (patientCpfOrBirthdayString : string) => {
    if (patientCpfOrBirthdayString .length === 11 && !patientCpfOrBirthdayString.includes("-") ) return patientCpfOrBirthdayString 
    if (patientCpfOrBirthdayString .length === 10 && patientCpfOrBirthdayString.includes("-")) return new Date(patientCpfOrBirthdayString)
    return null
}

export const diabetesAcfDashboardDataAdapter = (
    data: readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]
): DiabetesAcfItem[] => {
    return data
    .map((item) => ({
        municipalitySusID: item.municipio_id_sus,
        municipalityState: item.municipio_uf,
        latestExamRequestDate: item.dt_solicitacao_hemoglobina_glicada_mais_recente ? new Date(String(item.dt_solicitacao_hemoglobina_glicada_mais_recente)) : null,
        mostRecentAppointmentDate: item.dt_solicitacao_hemoglobina_glicada_mais_recente ? new Date(String(item.dt_consulta_mais_recente)) : null,
        hemoglobinTestDueDate: item.prazo_proxima_solicitacao_hemoglobina,
        nextAppointmentDueDate: item.prazo_proxima_consulta,
        patientStatus: item.status_usuario as PatientStatus,
        conditionIndentifiedBy: item.identificacao_condicao_diabetes as ConditionIdentifiedBy,
        patientCpfOrBirthday: item.cidadao_cpf_dt_nascimento ? patientCpfOrBirthdayAdapter(String(item.cidadao_cpf_dt_nascimento)): null,
        patientName: item.cidadao_nome,
        patientAgeRange: item.cidadao_faixa_etaria as PatientAgeRange,
        patientAge: item.cidadao_idade,
        careTeamIne: item.equipe_ine_cadastro,
        careTeamName: item.equipe_nome_cadastro,
        visitantCommunityHealthWorker: item.acs_nome_cadastro,
        mostRecentProductionRecordDate: item.dt_registro_producao_mais_recente ? new Date(String(item.dt_registro_producao_mais_recente)): null,
    })) as DiabetesAcfItem[]
}
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';
import type { ConditionIdentifiedBy, DiabetesAcfItem, PatientAgeRange, PatientStatus } from "./DiabetesAcfItem.model"

const patientCpfOrBirthdayAdapter = (patientCpfOrBirthdayString : string | null): Date | string | null => {
    if (!patientCpfOrBirthdayString) return null
    if (patientCpfOrBirthdayString.length === 11 && !patientCpfOrBirthdayString.includes("-")) return patientCpfOrBirthdayString 
    if (patientCpfOrBirthdayString.length === 10 && patientCpfOrBirthdayString.includes("-")) return new Date(patientCpfOrBirthdayString)
    return null
}
const dateAdapter = (date: Date | null): Date | null => {
    if (!date) return null
    return new Date(date.toISOString())
}
export const diabetesAcfDashboardDataAdapter = (
    data: readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]
): DiabetesAcfItem[] => {
    return data
    .map<DiabetesAcfItem>((item) => ({
        municipalitySusID: item.municipio_id_sus,
        municipalityState: item.municipio_uf,
        latestExamRequestDate: item.dt_solicitacao_hemoglobina_glicada_mais_recente ? new Date(item.dt_solicitacao_hemoglobina_glicada_mais_recente) : null,
        mostRecentAppointmentDate: dateAdapter(item.dt_consulta_mais_recente),
        hemoglobinTestDueDate: item.prazo_proxima_solicitacao_hemoglobina,
        nextAppointmentDueDate: item.prazo_proxima_consulta,
        patientStatus: item.status_usuario as PatientStatus,
        conditionIndentifiedBy: item.identificacao_condicao_diabetes as ConditionIdentifiedBy,
        patientCpfOrBirthday: patientCpfOrBirthdayAdapter(item.cidadao_cpf_dt_nascimento),
        patientName: item.cidadao_nome,
        patientAgeRange: item.cidadao_faixa_etaria as PatientAgeRange,
        patientAge: item.cidadao_idade,
        careTeamIne: item.equipe_ine_cadastro,
        careTeamName: item.equipe_nome_cadastro,
        visitantCommunityHealthWorker: item.acs_nome_cadastro,
        mostRecentProductionRecordDate: dateAdapter(item.dt_registro_producao_mais_recente),
    }))
}
import { isDate, parseDate } from '@/common/time';
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';
import type { ConditionIdentifiedBy, DiabetesAcfItem, PatientAgeRange, PatientStatus } from "./DiabetesAcfItem.model"
import { isCpfPatientNotBirthday } from './modules/isCpfPatientNotBirthday';

export const patientCpfOrBirthdayAdapter = (patientCpfOrBirthdayString : string | null): Date | string | null => {
    if (!patientCpfOrBirthdayString) return null
    if (isCpfPatientNotBirthday(patientCpfOrBirthdayString)) return patientCpfOrBirthdayString 
    try {
        const isBirthday = isDate(patientCpfOrBirthdayString)
        if (isBirthday) return parseDate(patientCpfOrBirthdayString)
    } catch (error) {
//TODO: isso deveria logar erro no console mesmo?
        console.error("Erro ao converter a data de nascimento:", error)
        return null
    }
    return null
}

export const diabetesAcfDashboardDataAdapter = (
    data: readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]
): DiabetesAcfItem[] => {
    return data
    .map<DiabetesAcfItem>((item) => ({
        municipalitySusID: item.municipio_id_sus,
        municipalityState: item.municipio_uf,
        latestExamRequestDate: item.dt_solicitacao_hemoglobina_glicada_mais_recente ? new Date(item.dt_solicitacao_hemoglobina_glicada_mais_recente) : null,
        mostRecentAppointmentDate: item.dt_consulta_mais_recente,
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
        mostRecentProductionRecordDate: item.dt_registro_producao_mais_recente,
    }))
}
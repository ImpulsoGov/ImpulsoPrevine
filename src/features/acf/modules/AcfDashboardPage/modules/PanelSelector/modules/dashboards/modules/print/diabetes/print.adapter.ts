import type { ConditionIdentifiedBy, DiabetesAcfDbItem, DiabetesAcfPrintItem, PatientAgeRange, PatientStatus } from "./print.model"

const patientCpfOrBirthdayAdapter = (patientCpfOrBirthdayString : string) => {
    if (patientCpfOrBirthdayString .length === 11 && !patientCpfOrBirthdayString.includes("-") ) return patientCpfOrBirthdayString 
    if (patientCpfOrBirthdayString .length === 10 && patientCpfOrBirthdayString.includes("-")) return new Date(patientCpfOrBirthdayString)
    return null
}

export const diabetesAcfPrintForTeamDataAdapter = (
    data: DiabetesAcfDbItem[],
): DiabetesAcfPrintItem[] => {
    return data
    .map((item) => ({
        municipalitySusID: item.municipio_id_sus,
        municipalityState: item.municipio_uf,
        latestExamRequestDate: new Date(item.dt_solicitacao_hemoglobina_glicada_mais_recente),
        mostRecentAppointmentDate: new Date(item.dt_consulta_mais_recente),
        hemoglobinTestDueDate: item.prazo_proxima_solicitacao_hemoglobina_glicada,
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
        mostRecentProductionRecordDate: new Date(item.dt_registro_producao_mais_recente),
    }))
}
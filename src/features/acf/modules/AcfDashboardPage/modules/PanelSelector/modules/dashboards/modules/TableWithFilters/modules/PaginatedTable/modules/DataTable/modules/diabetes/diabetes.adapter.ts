import { isDate, parseDate } from '@/common/time';
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';
import type { ConditionIdentifiedBy, DiabetesAcfItem, PatientAgeRange, PatientStatus } from "./diabetes.model"
import type { FilterItem } from '@/services/lista-nominal/ListaNominal';
import { filterDbtoModelOptions } from '../../../../../filters/modules/diabetes/diabetes.adapter';
import type { DiabetesFilterOptions } from '../../../../../filters/modules/diabetes/diabetes.model';

export const cpfOrDate = (fieldValue : string | null): Date | string | null => {
    if (fieldValue && isDate(fieldValue)) {
        return parseDate(fieldValue);
    }
    return fieldValue;
}

export const diabetesPageDbToModel = (
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
        conditionIdentifiedBy: item.identificacao_condicao_diabetes as ConditionIdentifiedBy,
        patientCpfOrBirthday: cpfOrDate(item.cidadao_cpf_dt_nascimento),
        patientName: item.cidadao_nome,
        patientAgeRange: item.cidadao_faixa_etaria as PatientAgeRange,
        patientAge: item.cidadao_idade,
        careTeamIne: item.equipe_ine_cadastro,
        careTeamName: item.equipe_nome_cadastro,
        visitantCommunityHealthWorker: item.acs_nome_cadastro,
        mostRecentProductionRecordDate: item.dt_registro_producao_mais_recente,
    }))
}
export type DiabetesDbFilterItem = {
    status_usuario?: string[] | null | undefined;
    identificacao_condicao_diabetes?: string[] | null | undefined;
    acs_nome_cadastro?: string[] | null | undefined;
}
const mapFilterKeyToDbField = (key: DiabetesFilterOptions, value: string | string[]): Partial<DiabetesDbFilterItem> => {
    if (value.length > 0) {
        return { [filterDbtoModelOptions[key]]: Array.isArray(value) ? value : [value] };
    }

    return {};
};

//TODO tornar FilterItem um tipo mais especifico
export const diabetesFilterToDb = (filters: FilterItem): DiabetesDbFilterItem => {
    return Object.entries(filters).reduce<DiabetesDbFilterItem>((acc, [key, value]) => (
        Object.assign(acc, mapFilterKeyToDbField(key as DiabetesFilterOptions, value))
    ), {});
};
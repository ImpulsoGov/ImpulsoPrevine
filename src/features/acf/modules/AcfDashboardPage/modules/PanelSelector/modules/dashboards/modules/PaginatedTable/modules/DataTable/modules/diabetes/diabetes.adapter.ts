import { isDate, parseDate } from '@/common/time';
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';
import type { ConditionIdentifiedBy, DiabetesAcfItem, PatientAgeRange, PatientStatus } from "./diabetes.model"
import type { FilterItem } from '@/services/lista-nominal/ListaNominal';
import type { DiabetesFilterOptions } from '../../../../../TableWithFilters/modules/filters/modules/diabetes/diabetes.model';
import { filterDbtoModelOptions } from '../../../../../TableWithFilters/modules/filters/modules/diabetes/diabetes.adapter';

export const cpfOrDate = (fieldValue : string | null): Date | string | null => {
    if (fieldValue && isDate(fieldValue)) {
        return parseDate(fieldValue);
    }
    return fieldValue;
}

const diabetesRowToModel = (diabetesRow: impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos): DiabetesAcfItem => {
    //Este throw é uma gambiarra. Nós sabemos que estes campos 
    //não tem nenhum valor null no BD hoje, e é só o tipo das colunas que está nullable, quando não deveria

    // biome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
    if (!diabetesRow.municipio_id_sus || !diabetesRow.equipe_ine_cadastro) {
        throw new Error("Municipo ou INE da equipe faltando em um dos registros");
    }

    return {
        municipalitySusID: diabetesRow.municipio_id_sus,
        municipalityState: diabetesRow.municipio_uf || '',
        latestExamRequestDate: diabetesRow.dt_solicitacao_hemoglobina_glicada_mais_recente ? new Date(diabetesRow.dt_solicitacao_hemoglobina_glicada_mais_recente) : null,
        mostRecentAppointmentDate: diabetesRow.dt_consulta_mais_recente,
        hemoglobinTestDueDate: diabetesRow.prazo_proxima_solicitacao_hemoglobina || '',
        nextAppointmentDueDate: diabetesRow.prazo_proxima_consulta || '',
        patientStatus: diabetesRow.status_usuario as PatientStatus,
        conditionIdentifiedBy: diabetesRow.identificacao_condicao_diabetes as ConditionIdentifiedBy,
        patientCpfOrBirthday: cpfOrDate(diabetesRow.cidadao_cpf_dt_nascimento) || '',
        patientName: diabetesRow.cidadao_nome || '',
        patientAgeRange: diabetesRow.cidadao_faixa_etaria as PatientAgeRange,
        patientAge: diabetesRow.cidadao_idade || 0,
        careTeamIne: diabetesRow.equipe_ine_cadastro,
        careTeamName: diabetesRow.equipe_nome_cadastro || '',
        visitantCommunityHealthWorker: diabetesRow.acs_nome_cadastro || '',
        mostRecentProductionRecordDate: diabetesRow.dt_registro_producao_mais_recente,
    }


}

export const diabetesPageDbToModel = (
    data: readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]
): DiabetesAcfItem[] => {
    return data.map<DiabetesAcfItem>(diabetesRowToModel)
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
import { isDate, parseDate } from "@/common/time";
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import type {
    ConditionIdentifiedBy,
    DiabetesAcfItem,
    PatientAgeRange,
    PatientStatus,
} from "../../common/model";
import type { FilterParams } from "../../common/schema";
import type { DiabetesDbFilterItem } from "../model";

export const cpfOrDate = (fieldValue: string | null): Date | string | null => {
    if (fieldValue && isDate(fieldValue)) {
        return parseDate(fieldValue);
    }
    return fieldValue;
};

const diabetesRowToModel = (
    diabetesRow: impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos
): DiabetesAcfItem => {
    //Este throw é uma gambiarra. Nós sabemos que estes campos
    //não tem nenhum valor null no BD hoje, e é só o tipo das colunas que está nullable, quando não deveria

    // -ignore lint/complexity/useSimplifiedLogicExpression: é mais fácil de ler desse jeito
    if (!diabetesRow.municipio_id_sus || !diabetesRow.equipe_ine_cadastro) {
        throw new Error(
            "Municipo ou INE da equipe faltando em um dos registros"
        );
    }

    return {
        municipalitySusID: diabetesRow.municipio_id_sus,
        municipalityState: diabetesRow.municipio_uf || "",
        latestExamRequestDate:
            diabetesRow.dt_solicitacao_hemoglobina_glicada_mais_recente
                ? new Date(
                      diabetesRow.dt_solicitacao_hemoglobina_glicada_mais_recente
                  )
                : null,
        mostRecentAppointmentDate: diabetesRow.dt_consulta_mais_recente,
        hemoglobinTestDueDate:
            diabetesRow.prazo_proxima_solicitacao_hemoglobina || "",
        nextAppointmentDueDate: diabetesRow.prazo_proxima_consulta || "",
        patientStatus: diabetesRow.status_usuario as PatientStatus,
        conditionIdentifiedBy:
            diabetesRow.identificacao_condicao_diabetes as ConditionIdentifiedBy,
        patientCpfOrBirthday:
            cpfOrDate(diabetesRow.cidadao_cpf_dt_nascimento) || "",
        patientName: diabetesRow.cidadao_nome || "",
        patientAgeRange: diabetesRow.cidadao_faixa_etaria as PatientAgeRange,
        patientAge: diabetesRow.cidadao_idade || 0,
        careTeamIne: diabetesRow.equipe_ine_cadastro,
        careTeamName: diabetesRow.equipe_nome_cadastro || "",
        visitantCommunityHealthWorker: diabetesRow.acs_nome_cadastro || "",
        mostRecentProductionRecordDate:
            diabetesRow.dt_registro_producao_mais_recente,
    };
};

export const diabetesPageDbToModel = (
    data: ReadonlyArray<impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos>
): Array<DiabetesAcfItem> => {
    return data.map<DiabetesAcfItem>(diabetesRowToModel);
};

export const filterParamsToDb = (
    filters: FilterParams
): DiabetesDbFilterItem => {
    return {
        //TODO: Encontrar uma maneira de fazer o suppress em um bloco de linhas
        // -ignore lint/style/useNamingConvention: <explanation>
        status_usuario: filters.patientStatus,
        // -ignore lint/style/useNamingConvention: <explanation>
        identificacao_condicao_diabetes: filters.conditionIdentifiedBy,
        // -ignore lint/style/useNamingConvention: <explanation>
        acs_nome_cadastro: filters.visitantCommunityHealthWorker,
        // -ignore lint/style/useNamingConvention: <explanation>
        cidadao_faixa_etaria: filters.patientAgeRange,
    };
};

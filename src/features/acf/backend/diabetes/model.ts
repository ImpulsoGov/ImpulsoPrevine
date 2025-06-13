import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import type {
    AcfDashboardType,
    DiabetesAcfItem,
    SortableField,
} from "../../shared/diabetes/model";

//TODO: sumir com esse arquivo, esses tipos podem ir pra dentro dos módulos
export type FiltersOptions = {
    visitantCommunityHealthWorker: Array<
        DiabetesAcfItem["visitantCommunityHealthWorker"]
    >;
    patientStatus: Array<DiabetesAcfItem["patientStatus"]>;
    conditionIdentifiedBy: Array<DiabetesAcfItem["conditionIdentifiedBy"]>;
    patientAgeRange: Array<DiabetesAcfItem["patientAgeRange"]>;
};

export type FilterOptionsDb = Pick<
    impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos,
    | "acs_nome_cadastro"
    | "status_usuario"
    | "identificacao_condicao_diabetes"
    | "cidadao_faixa_etaria"
>;
export type SortableDbField =
    | "dt_solicitacao_hemoglobina_glicada_mais_recente"
    | "dt_consulta_mais_recente"
    | "prazo_proxima_solicitacao_hemoglobina"
    | "prazo_proxima_consulta"
    | "identificacao_condicao_diabetes"
    | "cidadao_cpf_dt_nascimento"
    | "cidadao_nome"
    | "cidadao_idade"
    | "acs_nome_cadastro";

export const sortableFieldsToDb: Record<SortableField, SortableDbField> = {
    latestExamRequestDate: "dt_solicitacao_hemoglobina_glicada_mais_recente",
    mostRecentAppointmentDate: "dt_consulta_mais_recente",
    hemoglobinTestDueDate: "prazo_proxima_solicitacao_hemoglobina",
    nextAppointmentDueDate: "prazo_proxima_consulta",
    conditionIdentifiedBy: "identificacao_condicao_diabetes",
    patientCpfOrBirthday: "cidadao_cpf_dt_nascimento",
    patientName: "cidadao_nome",
    patientAge: "cidadao_idade",
    visitantCommunityHealthWorker: "acs_nome_cadastro",
};

export type DiabetesDbFilterItem = {
    status_usuario?: Array<string>;
    identificacao_condicao_diabetes?: Array<string>;
    acs_nome_cadastro?: Array<string>;
    cidadao_faixa_etaria?: Array<string>;
};

export type AcfExternalCardsDescription =
    | "DIAGNOSTICO_AUTORREFERIDO"
    | "DIAGNOSTICO_CLINICO";

export type ExternalCardDataItem = {
    acfDashboardType: AcfDashboardType;
    acfExternalCardsDescription: AcfExternalCardsDescription;
    value: number;
};

export type ExternalCardDBDataItem = {
    municipio_id_sus: string;
    ine: string;
    lista: string;
    valor: number;
    descricao: string;
};

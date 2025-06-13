import type { SortableField } from "@/features/acf/shared/diabetes/model";

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

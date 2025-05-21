import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import type { AcfDashboardType, DiabetesAcfItem } from "../common/model";

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

export type DiabetesDbFilterItem = {
    status_usuario?: Array<string>;
    identificacao_condicao_diabetes?: Array<string>;
    acs_nome_cadastro?: Array<string>;
    cidadao_faixa_etaria?: Array<string>;
};

// TODO rever nomes dos tipos abaixo
// Cards externos

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

//Cards internos

export const DiabetesAcfInternalCardsHealthIndicator = {
    TOTAL_COM_DIABETES: "TOTAL_COM_DIABETES",
    EXAME_E_CONSULTA_EM_DIA: "EXAME_E_CONSULTA_EM_DIA",
    DIAGNOSTICO_AUTORREFERIDO: "DIAGNOSTICO_AUTORREFERIDO",
    DIAGNOSTICO_CLINICO: "DIAGNOSTICO_CLINICO",
} as const;

export type DiabetesInternalCardsId =
    typeof DiabetesAcfInternalCardsHealthIndicator;
export type DiabetesInternalCardsKey = keyof DiabetesInternalCardsId;
export type DiabetesInternalCardsValue =
    DiabetesInternalCardsId[DiabetesInternalCardsKey];

export type InternalCardDBDataItem = {
    valor: number;
    descricao: DiabetesInternalCardsValue;
};

export type InternalCardDataItem = {
    value: number;
    healthIndicator: DiabetesInternalCardsValue;
};

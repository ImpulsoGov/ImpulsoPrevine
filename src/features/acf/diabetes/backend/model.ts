import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import type { AcfDashboardType, DiabetesAcfItem } from "../common/model";

export type FiltersOptions = {
    visitantCommunityHealthWorker: DiabetesAcfItem["visitantCommunityHealthWorker"][];
    patientStatus: DiabetesAcfItem["patientStatus"][];
    conditionIdentifiedBy: DiabetesAcfItem["conditionIdentifiedBy"][];
    patientAgeRange: DiabetesAcfItem["patientAgeRange"][];
};

export type FilterOptionsDb = Pick<
    impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos,
    | "acs_nome_cadastro"
    | "status_usuario"
    | "identificacao_condicao_diabetes"
    | "cidadao_faixa_etaria"
>;

export type DiabetesDbFilterItem = {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    status_usuario?: string[];
    // biome-ignore lint/style/useNamingConvention: <explanation>
    identificacao_condicao_diabetes?: string[];
    // biome-ignore lint/style/useNamingConvention: <explanation>
    acs_nome_cadastro?: string[];
    // biome-ignore lint/style/useNamingConvention: <explanation>
    cidadao_faixa_etaria?: string[];
};

// TODO rever nomes dos tipos abaixo
// Cards externos

export type AcfExternalCardsDescription = "DIAGNOSTICO_AUTORREFERIDO" | "DIAGNOSTICO_CLINICO"


export type ExternalCardDataItem = {
    acfDashboardType: AcfDashboardType,
    acfExternalCardsDescription: AcfExternalCardsDescription;
    value: number;
} 

export type ExternalCardDBDataItem = {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    municipio_id_sus: string;
    ine: string;
    lista: string;
    valor: number;
    descricao: string;
}

//Cards internos

export const DiabetesAcfInternalCardsHealthIndicator = {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    TOTAL_COM_DIABETES: "TOTAL_COM_DIABETES",
    // biome-ignore lint/style/useNamingConvention: <explanation>
    EXAME_E_CONSULTA_EM_DIA: "EXAME_E_CONSULTA_EM_DIA",
    // biome-ignore lint/style/useNamingConvention: <explanation>
    DIAGNOSTICO_AUTORREFERIDO: "DIAGNOSTICO_AUTORREFERIDO",
    // biome-ignore lint/style/useNamingConvention: <explanation>
    DIAGNOSTICO_CLINICO: "DIAGNOSTICO_CLINICO",
} as const;

export type DiabetesInternalCardsId = typeof DiabetesAcfInternalCardsHealthIndicator;
export type DiabetesInternalCardsKey = keyof DiabetesInternalCardsId;
export type DiabetesInternalCardsValue = DiabetesInternalCardsId[DiabetesInternalCardsKey];

export type InternalCardDBDataItem = {
    valor: number;
    descricao: DiabetesInternalCardsValue;
}

export type InternalCardDataItem = {
    value: number;
    healthIndicator: DiabetesInternalCardsValue;
}

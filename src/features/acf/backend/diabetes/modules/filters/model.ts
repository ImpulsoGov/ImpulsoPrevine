import type { DiabetesAcfItem } from "@features/acf/shared/diabetes/model";
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";

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

import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import type { DiabetesAcfItem } from "../common/model";

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
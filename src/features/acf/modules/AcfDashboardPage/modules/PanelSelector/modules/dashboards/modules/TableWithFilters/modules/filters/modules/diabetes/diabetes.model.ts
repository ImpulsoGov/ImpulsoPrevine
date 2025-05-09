import type { DiabetesAcfItem } from "../../../PaginatedTable/modules/DataTable/modules/diabetes/diabetes.model";

export type DiabetesFilterItem = {
  visitantCommunityHealthWorker: DiabetesAcfItem['visitantCommunityHealthWorker'][];
  patientStatus: DiabetesAcfItem['patientStatus'][];
  conditionIdentifiedBy: DiabetesAcfItem['conditionIdentifiedBy'][];
}
// TODO mudar esses tipos para não serem hard coded
export type DiabetesFilterOptions = 'visitantCommunityHealthWorker' |'patientStatus' |'conditionIdentifiedBy'

export type DiabetesFilterOptionsDB = 'acs_nome_cadastro' | 'status_usuario' | 'identificacao_condicao_diabetes'

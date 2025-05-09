import type { DiabetesAcfItem } from "../../../TableWithFilters/modules/PaginatedTable/modules/DataTable/modules/diabetes/diabetes.model";

export type DiabetesFilterItem = {
  visitantCommunityHealthWorker: DiabetesAcfItem['visitantCommunityHealthWorker'][];
  patientStatus: DiabetesAcfItem['patientStatus'][];
  conditionIdentifiedBy: DiabetesAcfItem['conditionIdentifiedBy'][];
}
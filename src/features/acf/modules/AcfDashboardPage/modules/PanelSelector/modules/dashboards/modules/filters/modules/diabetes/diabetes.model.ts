import type { DiabetesAcfItem } from "../../../table/modules/diabetes/DiabetesAcfItem.model";

export type DiabetesFilterItem = {
  visitantCommunityHealthWorker: DiabetesAcfItem['visitantCommunityHealthWorker'][];
  patientStatus: DiabetesAcfItem['patientStatus'][];
  conditionIdentifiedBy: DiabetesAcfItem['conditionIdentifiedBy'][];
}
import type { ConditionIdentifiedBy, PatientAgeRange, PatientStatus, VisitantCommunityHealthWorker } from "../common/model";

export type SelectedValues = {
    visitantCommunityHealthWorker: VisitantCommunityHealthWorker[];
    patientStatus: PatientStatus[];
    conditionIdentifiedBy: ConditionIdentifiedBy;
    patientAgeRange: PatientAgeRange[];
};

export type FiltersUi = {
    visitantCommunityHealthWorker: VisitantCommunityHealthWorker[];
    patientStatus: PatientStatus[];
    conditionIdentifiedBy: ConditionIdentifiedBy[];
    patientAgeRange: PatientAgeRange[];
};
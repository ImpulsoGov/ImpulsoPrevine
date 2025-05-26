import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
    VisitantCommunityHealthWorker,
} from "../common/model";

export type SelectedValues = {
    visitantCommunityHealthWorker: Array<VisitantCommunityHealthWorker>;
    patientStatus: Array<PatientStatus>;
    conditionIdentifiedBy: ConditionIdentifiedBy;
    patientAgeRange: Array<PatientAgeRange>;
};

export type FiltersUi = {
    visitantCommunityHealthWorker: Array<VisitantCommunityHealthWorker>;
    patientStatus: Array<PatientStatus>;
    conditionIdentifiedBy: Array<ConditionIdentifiedBy>;
    patientAgeRange: Array<PatientAgeRange>;
};

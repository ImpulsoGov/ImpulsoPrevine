import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
    VisitantCommunityHealthWorker,
} from "../common/model";

export type SelectedFilterValuesCoeq = {
    visitantCommunityHealthWorker: Array<VisitantCommunityHealthWorker>;
    patientStatus: Array<PatientStatus>;
    conditionIdentifiedBy: ConditionIdentifiedBy | "";
    patientAgeRange: Array<PatientAgeRange>;
};

export type SelectedFilterValuesCoaps = SelectedFilterValuesCoeq & {
    campoDeCoaps: Array<string>;
};

//TODO: Remover este union type, e usar generics no lugar
export type SelectedFilterValues =
    | SelectedFilterValuesCoeq
    | SelectedFilterValuesCoaps
    | null;

//TODO: Trocar este tipo por CoeqFilters do schema comum
export type FiltersUi = {
    visitantCommunityHealthWorker: Array<VisitantCommunityHealthWorker>;
    patientStatus: Array<PatientStatus>;
    conditionIdentifiedBy: Array<ConditionIdentifiedBy>;
    patientAgeRange: Array<PatientAgeRange>;
};

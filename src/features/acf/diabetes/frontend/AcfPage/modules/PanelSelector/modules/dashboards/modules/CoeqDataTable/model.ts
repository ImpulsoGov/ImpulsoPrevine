import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
    VisitantCommunityHealthWorker,
} from "@/features/acf/diabetes/common/model";

export type SelectedFilterValuesCoeq = {
    visitantCommunityHealthWorker: Array<VisitantCommunityHealthWorker>;
    patientStatus: Array<PatientStatus>;
    conditionIdentifiedBy: ConditionIdentifiedBy | "";
    patientAgeRange: Array<PatientAgeRange>;
};

//TODO: Trocar pelo tipo real quando ele existir
export type SelectedFilterValuesCoaps = SelectedFilterValuesCoeq & {
    campoDeCoaps: Array<string>;
};

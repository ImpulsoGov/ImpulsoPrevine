import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
    VisitantCommunityHealthWorker,
} from "@/features/acf/shared/diabetes/model";

export type AppliedFiltersCoeq = {
    visitantCommunityHealthWorker: Array<VisitantCommunityHealthWorker>;
    patientStatus: Array<PatientStatus>;
    conditionIdentifiedBy: ConditionIdentifiedBy | "";
    patientAgeRange: Array<PatientAgeRange>;
};

//TODO: Trocar pelo tipo real quando ele existir
export type AppliedFiltersCoaps = AppliedFiltersCoeq & {
    campoDeCoaps: Array<string>;
};

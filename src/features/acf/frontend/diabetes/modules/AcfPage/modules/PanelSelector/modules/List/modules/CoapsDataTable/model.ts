import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
    CommunityHealthWorker,
} from "@/features/acf/shared/diabetes/model";

export type AppliedFiltersCoeq = {
    communityHealthWorker: Array<CommunityHealthWorker>;
    patientStatus: Array<PatientStatus>;
    conditionIdentifiedBy: ConditionIdentifiedBy | "";
    patientAgeRange: Array<PatientAgeRange>;
};

//TODO: Trocar pelo tipo real quando ele existir
export type AppliedFiltersCoaps = AppliedFiltersCoeq & {
    careTeamName: Array<string>;
};

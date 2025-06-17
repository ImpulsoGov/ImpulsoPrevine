import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
    communityHealthWorker,
} from "@/features/acf/shared/diabetes/model";

export type AppliedFiltersCoeq = {
    communityHealthWorker: Array<communityHealthWorker>;
    patientStatus: Array<PatientStatus>;
    conditionIdentifiedBy: ConditionIdentifiedBy | "";
    patientAgeRange: Array<PatientAgeRange>;
};

//TODO: Trocar pelo tipo real quando ele existir
export type AppliedFiltersCoaps = AppliedFiltersCoeq & {
    campoDeCoaps: Array<string>;
};

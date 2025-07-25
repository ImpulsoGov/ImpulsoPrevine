import type {
    CommunityHealthWorker,
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
} from "@/features/acf/shared/diabetes/model";

export type SharedAppliedFilters = {
    communityHealthWorker: Array<CommunityHealthWorker>;
    patientStatus: Array<PatientStatus>;
    conditionIdentifiedBy: ConditionIdentifiedBy | "";
    patientAgeRange: Array<PatientAgeRange>;
};

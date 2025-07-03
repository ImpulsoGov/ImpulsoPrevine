import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
    CommunityHealthWorker,
} from "@/features/acf/shared/diabetes/model";

export type SharedAppliedFilters = {
    communityHealthWorker: Array<CommunityHealthWorker>;
    patientStatus: Array<PatientStatus>;
    conditionIdentifiedBy: ConditionIdentifiedBy | "";
    patientAgeRange: Array<PatientAgeRange>;
};

export type AppliedFilters = SharedAppliedFilters & {
    careTeamName: Array<string>;
};
//TODO: rever o export desse tipo aqui, pois ele já existe em outras camadas da aplicação.

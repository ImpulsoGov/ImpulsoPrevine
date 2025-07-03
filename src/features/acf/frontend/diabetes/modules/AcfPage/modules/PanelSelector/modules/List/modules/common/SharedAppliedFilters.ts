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

//TODO: rever o export desse tipo aqui, pois ele já existe em outras camadas da aplicação.
export type AppliedFilters =
    | SharedAppliedFilters
    | (SharedAppliedFilters & {
          careTeamName: Array<string>;
      });

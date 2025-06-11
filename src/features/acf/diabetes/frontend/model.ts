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

/// Contém todos os possíveis conjuntos de filtros.
/// Eventualmente, este Union type deve ter um item para cada combinação indicador x perfil
export type SelectedFilterValues =
    | SelectedFilterValuesCoeq
    | SelectedFilterValuesCoaps;

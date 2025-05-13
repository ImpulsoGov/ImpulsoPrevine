import type { ConditionIdentifiedBy, PatientAgeRange, PatientStatus } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/PaginatedTable/modules/DataTable/modules/diabetes/diabetes.model"

//TODO: Usar unions ao invés de ?
export type FilterParams = {
    municipalitySusID: string,
    teamIne: string,
    patientStatus?: PatientStatus,
    conditionIdentifiedBy?: ConditionIdentifiedBy,
    visitantCommunityHealthWorker?: string,
    patientAgeRange?: PatientAgeRange,
}

export type PaginationParams = {
    page: number,
    pageSize: number,
}

export type QueryParams = {
    pagination: PaginationParams,
    filters?: FilterParams
}

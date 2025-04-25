import type { Filters } from "@/utils/FilterData"
import type { GridPaginationModel } from "@mui/x-data-grid"
import type { DiabetesAcfItem } from "./DiabetesAcfItem.model"
import { diabetesAcfDashboardDataAdapter } from "./diabetesAcfDashboardData.adapter"
import { diabetesAcfDashboardDataRepository } from "./diabetesAcfDashboardData.repository"

export const diabetesAcfDashboardDataController = async(
    municipalitySusID: string,
    teamIne: string,
    pagination: GridPaginationModel,
    filters: Filters
): Promise<DiabetesAcfItem[]> => {
    const data = await diabetesAcfDashboardDataRepository(municipalitySusID, teamIne, pagination, filters)
    return diabetesAcfDashboardDataAdapter(data)
}
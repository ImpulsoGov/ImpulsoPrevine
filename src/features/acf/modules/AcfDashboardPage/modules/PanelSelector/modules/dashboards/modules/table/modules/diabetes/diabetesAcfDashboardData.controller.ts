import type { DiabetesAcfItem } from "./DiabetesAcfItem.model"
import { diabetesAcfDashboardDataAdapter } from "./diabetesAcfDashboardData.adapter"
import { diabetesAcfDashboardDataRepository } from "./diabetesAcfDashboardData.repository"

export const diabetesAcfDashboardDataController = async(
    municipalitySusID: string,
    teamIne: string,
): Promise<DiabetesAcfItem[]> => {
    const data = await diabetesAcfDashboardDataRepository(municipalitySusID, teamIne)
    return diabetesAcfDashboardDataAdapter(data)
}
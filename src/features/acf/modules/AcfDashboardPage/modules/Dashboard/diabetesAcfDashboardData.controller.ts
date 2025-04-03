import { diabetesAcfDashboardDataAdapter } from "./diabetesAcfDashboardData.adapter"
import type { DiabetesAcfItem } from "./DiabetesAcfItem.model"

export const diabetesAcfDashboardDataController = (
    municipalitySusID: string,
    TeamIne: string,
): DiabetesAcfItem[] => {
    return diabetesAcfDashboardDataAdapter(municipalitySusID, TeamIne)
}
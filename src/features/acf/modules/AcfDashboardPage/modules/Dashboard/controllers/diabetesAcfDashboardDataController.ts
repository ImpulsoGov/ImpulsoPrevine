import { diabetesAcfDashboardDataAdapter } from "../adapters/diabetesAcfDashboardDataAdapter"
import type { DiabetesAcfItem } from "../models/DiabetesAcfItem"

export const diabetesAcfDashboardDataController = (
    municipalitySusID: string,
    TeamIne: string,
): DiabetesAcfItem[] => {
    return diabetesAcfDashboardDataAdapter(municipalitySusID, TeamIne)
}
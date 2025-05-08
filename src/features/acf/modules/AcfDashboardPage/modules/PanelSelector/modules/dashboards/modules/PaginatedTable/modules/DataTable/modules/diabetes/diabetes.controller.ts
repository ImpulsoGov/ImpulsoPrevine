import type { GridPaginationModel } from "@mui/x-data-grid"
import type { DiabetesAcfItem } from "./diabetes.model"
import { diabetesPageDbToModel } from "./diabetes.adapter"
import { diabetesPage } from "./diabetes.repository"

export const diabetesData = async(
    municipalitySusID: string,
    teamIne: string,
    pagination: GridPaginationModel
): Promise<DiabetesAcfItem[]> => {
    const data = await diabetesPage(municipalitySusID, teamIne, pagination)
    return diabetesPageDbToModel(data)
}
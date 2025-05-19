import type { GridPaginationModel } from "@mui/x-data-grid"
import type { DiabetesAcfItem } from "./diabetes.model"
import { diabetesFilterToDb, diabetesPageDbToModel } from "./diabetes.adapter"
import { diabetesListCount, diabetesPage } from "./diabetes.repository"
import type { FilterItem } from "@/services/lista-nominal/ListaNominal"

export const diabetesData = async(
    municipalitySusID: string,
    teamIne: string,
    pagination: GridPaginationModel,
    filters: FilterItem
): Promise<DiabetesAcfItem[]> => {
    const filtersDb = diabetesFilterToDb(filters)
    const data = await diabetesPage(municipalitySusID, teamIne, pagination, filtersDb)
    return diabetesPageDbToModel(data)
}

export const diabetesDataCount = async(
    municipalitySusID: string,
    teamIne: string,
    filters: FilterItem
): Promise<number> => {
    const filtersDb = diabetesFilterToDb(filters)
    return await diabetesListCount(municipalitySusID, teamIne, filtersDb)
}
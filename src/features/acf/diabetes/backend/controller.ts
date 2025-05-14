
import type { DiabetesAcfItem } from "../common/model"
import type { FilterParams } from "../common/schema"
import { diabetesFilterToDb, diabetesPageDbToModel } from "./adapter"
import { diabetesListCount, diabetesPage } from "./repository"
import type { FilterItem } from "@/services/lista-nominal/ListaNominal"

export const diabetesData = async(
    municipalitySusID: string,
    teamIne: string,
    page: number,
    filters: FilterParams
): Promise<DiabetesAcfItem[]> => {
    const filtersDb = diabetesFilterToDb(filters)
    const data = await diabetesPage(municipalitySusID, teamIne, page, filtersDb)
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
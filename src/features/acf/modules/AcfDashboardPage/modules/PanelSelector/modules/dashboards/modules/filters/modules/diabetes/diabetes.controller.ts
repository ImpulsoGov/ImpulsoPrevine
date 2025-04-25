import { diabetesAcfFilterDataAdapter } from "./diabetes.adapter"
import type { DiabetesFilterItem } from "./diabetes.model"
import { type FieldNames, filterOptions } from "./diabetes.repository"
export const diabetesFilterItemController = async(
    municipalitySusID: string,
    teamIne: string,
    fields: FieldNames[]
): Promise<DiabetesFilterItem[]> => {
    const data = await filterOptions(municipalitySusID, teamIne, fields)
    return diabetesAcfFilterDataAdapter(data)
}
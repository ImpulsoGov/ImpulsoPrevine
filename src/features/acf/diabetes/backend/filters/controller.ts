import type { Filters } from "../../common/model";
import type { FieldNames, } from "./repository";
import * as repository from "./repository";
import * as adapter from "./adapter";

export const filterOptions = async(
    municipalitySusID: string,
    teamIne: string,
    fields: FieldNames[]
): Promise<Filters> => {
    const data = await repository.filterOptions(municipalitySusID, teamIne, fields)
    return adapter.filtersOptions(data)
}
import type { FiltersOptions } from "../model";
import * as repository from "./repository";
import * as adapter from "./adapter";

export const filterOptions = async(
    municipalitySusID: string,
    teamIne: string,
): Promise<FiltersOptions> => {
    const data = await repository.filterOptions(municipalitySusID, teamIne)
    return adapter.filtersOptionsDbToModel(data)
}
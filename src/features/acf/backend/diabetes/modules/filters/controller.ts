import type { FiltersOptions } from "../../model";
import * as adapter from "./adapter";
import * as repository from "./repository";

export const filterOptionsCoeq = async (
    municipalitySusID: string,
    teamIne: string
): Promise<FiltersOptions> => {
    const data = await repository.filterOptionsCoeq(municipalitySusID, teamIne);
    return adapter.filtersOptionsDbToModel(data);
};

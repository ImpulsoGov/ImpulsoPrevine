import type { FiltersOptions } from "../model";
import * as repository from "./repository";
import * as adapter from "./adapter";

export const filterOptionsCoaps = async (
    municipalitySusID: string
): Promise<FiltersOptions> => {
    const data = await repository.filterOptionsCoaps(municipalitySusID);
    return adapter.filtersOptionsDbToModel(data);
};

export const filterOptionsCoeq = async (
    municipalitySusID: string,
    teamIne: string
): Promise<FiltersOptions> => {
    const data = await repository.filterOptionsCoeq(municipalitySusID, teamIne);
    return adapter.filtersOptionsDbToModel(data);
};

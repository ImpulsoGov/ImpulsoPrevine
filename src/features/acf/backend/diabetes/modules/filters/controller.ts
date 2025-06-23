import type { FiltersOptionsCoaps, FiltersOptionsCoeq } from "./model";
import * as repository from "./repository";

export const filterOptionsCoeq = async (
    municipalitySusID: string,
    teamIne: string
): Promise<FiltersOptionsCoeq> => {
    return await repository.coeqFilterOptions(municipalitySusID, teamIne);
};

export const filterOptionsCoaps = async (
    municipalitySusID: string
): Promise<FiltersOptionsCoaps> => {
    return await repository.coapsFilterOptions(municipalitySusID);
};

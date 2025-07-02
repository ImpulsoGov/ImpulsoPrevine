import type { FiltersOptionsCoaps, FiltersOptionsCoeq } from "./model";
import * as repository from "./repository";

export const filterOptionsCoeq = async (
    municipalitySusId: string,
    teamIne: string
): Promise<FiltersOptionsCoeq> => {
    return await repository.coeqFilterOptions(municipalitySusId, teamIne);
};

export const filterOptionsCoaps = async (
    municipalitySusId: string
): Promise<FiltersOptionsCoaps> => {
    return await repository.coapsFilterOptions(municipalitySusId);
};

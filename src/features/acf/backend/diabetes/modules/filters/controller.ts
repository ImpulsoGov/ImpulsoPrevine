import type { FiltersOptions } from "./model";
import * as repository from "./repository";

export const filterOptionsCoeq = async (
    municipalitySusID: string,
    teamIne: string
): Promise<FiltersOptions> => {
    return await repository.coeqFilterOptions(municipalitySusID, teamIne);
};

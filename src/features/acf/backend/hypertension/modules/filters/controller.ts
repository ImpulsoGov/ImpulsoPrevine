import type { FiltersOptionsCoaps, FiltersOptionsCoeq } from "./model";
import * as repository from "./repository";
import * as adapter from "./adapter";

export const filterOptionsCoeq = async (
    municipalitySusId: string,
    teamIne: string
): Promise<FiltersOptionsCoeq> => {
    const data = await repository.coeqFilterOptions(municipalitySusId, teamIne);
    return adapter.dbToModelCoeq(data);
};

export const filterOptionsCoaps = async (
    municipalitySusId: string
): Promise<FiltersOptionsCoaps> => {
    const data = await repository.coapsFilterOptions(municipalitySusId);
    return adapter.dbToModelCoaps(data);
};

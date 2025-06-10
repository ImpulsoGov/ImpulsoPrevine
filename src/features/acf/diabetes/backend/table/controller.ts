import type { DiabetesAcfItem } from "../../common/model";
import type { CoeqFilters, CoeqSort } from "../../common/schema";
import * as adapter from "./adapter";
import * as repository from "./repository";

export const page = async (
    municipalitySusID: string,
    teamIne: string,
    pageIndex: number,
    filters: CoeqFilters,
    sorting: CoeqSort,
    searchString: string
): Promise<Array<DiabetesAcfItem>> => {
    const filtersDb = adapter.filterParamsToDb(filters);
    const page = await repository.page(
        municipalitySusID,
        teamIne,
        pageIndex,
        filtersDb,
        {
            field: adapter.sortableFieldToDb(sorting.field),
            sort: sorting.sort,
        },
        searchString
    );
    return adapter.diabetesPageDbToModel(page);
};

export const rowCount = async (
    municipalitySusID: string,
    teamIne: string,
    filters: CoeqFilters,
    searchString: string
): Promise<number> => {
    const filtersDb = adapter.filterParamsToDb(filters);
    return await repository.rowCount(
        municipalitySusID,
        teamIne,
        filtersDb,
        searchString
    );
};

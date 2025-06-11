import type { DiabetesAcfItem } from "../../common/model";
import type { CoeqFilters, CoeqSort } from "../../common/schema";
import * as adapter from "./adapter";
import * as repository from "./repository";

const defaultCoeqFilters: CoeqFilters = {
    patientStatus: [],
    conditionIdentifiedBy: [],
    visitantCommunityHealthWorker: [],
    patientAgeRange: [],
};

type PageParams = {
    municipalitySusID: string;
    teamIne: string;
    pageIndex: number;
    sorting: CoeqSort;
    searchString: string;
    filters?: CoeqFilters;
};

export const page = async ({
    municipalitySusID,
    teamIne,
    pageIndex,
    sorting,
    searchString,
    filters,
}: PageParams): Promise<Array<DiabetesAcfItem>> => {
    const filtersDb = adapter.filterParamsToDb(filters || defaultCoeqFilters);
    const sortingDb = {
        field: adapter.sortableFieldToDb(sorting.field),
        sort: sorting.sort,
    };
    const page = await repository.page(
        municipalitySusID,
        teamIne,
        pageIndex,
        filtersDb,
        sortingDb,
        searchString
    );
    return adapter.diabetesPageDbToModel(page);
};

type RowCountParams = {
    municipalitySusID: string;
    teamIne: string;
    searchString: string;
    filters?: CoeqFilters;
};

export const rowCount = async ({
    municipalitySusID,
    teamIne,
    searchString,
    filters,
}: RowCountParams): Promise<number> => {
    const filtersDb = adapter.filterParamsToDb(filters || defaultCoeqFilters);
    return await repository.rowCount(
        municipalitySusID,
        teamIne,
        filtersDb,
        searchString
    );
};

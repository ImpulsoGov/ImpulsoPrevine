import type { DiabetesAcfItem } from "@/features/acf/shared/diabetes/model";
import type {
    CoapsFilters,
    CoapsSort,
    CoeqFilters,
    CoeqSort,
} from "@/features/acf/shared/diabetes/schema";
import * as adapter from "./adapter";
import * as repository from "./repository";

const defaultCoeqFilters: CoeqFilters = {
    patientStatus: [],
    conditionIdentifiedBy: [],
    communityHealthWorker: [],
    patientAgeRange: [],
};

const defaultCoapsFilters: CoapsFilters = {
    ...defaultCoeqFilters,
    careTeamName: [],
};

type PageParams = {
    municipalitySusID: string;
    pageIndex: number;
    searchString: string;
};

type PageParamsCoaps = PageParams & {
    sorting: CoapsSort;
    filters?: CoapsFilters;
};
type PageParamsCoeq = PageParams & {
    teamIne: string;
    sorting: CoeqSort;
    filters?: CoeqFilters;
};

export const pageCoeq = async ({
    municipalitySusID,
    teamIne,
    pageIndex,
    sorting,
    searchString,
    filters,
}: PageParamsCoeq): Promise<Array<DiabetesAcfItem>> => {
    const filtersDb = adapter.filterParamsToDbCoeq(
        filters || defaultCoeqFilters
    );
    const sortingDb = {
        field: adapter.sortableFieldToDbCoeq(sorting.field),
        sort: sorting.sort,
    };
    const page = await repository.pageCoeq(
        municipalitySusID,
        teamIne,
        pageIndex,
        filtersDb,
        sortingDb,
        searchString
    );
    return adapter.diabetesPageDbToModel(page);
};

export const pageCoaps = async ({
    municipalitySusID,
    pageIndex,
    sorting,
    searchString,
    filters,
}: PageParamsCoaps): Promise<Array<DiabetesAcfItem>> => {
    const filtersDb = adapter.filterParamsToDbCoaps(
        filters || defaultCoapsFilters
    );
    const sortingDb = {
        field: adapter.sortableFieldToDbCoaps(sorting.field),
        sort: sorting.sort,
    };
    const page = await repository.pageCoaps(
        municipalitySusID,
        pageIndex,
        filtersDb,
        sortingDb,
        searchString
    );
    return adapter.diabetesPageDbToModel(page);
};

type RowCountParams = {
    municipalitySusID: string;
    searchString: string;
};

type RowCountParamsCoaps = RowCountParams & {
    filters?: CoapsFilters;
};

type RowCountParamsCoeq = RowCountParams & {
    teamIne: string;
    filters?: CoeqFilters;
};

export const rowCountCoeq = async ({
    municipalitySusID,
    teamIne,
    searchString,
    filters,
}: RowCountParamsCoeq): Promise<number> => {
    const filtersDb = adapter.filterParamsToDbCoeq(
        filters || defaultCoeqFilters
    );
    return await repository.rowCountCoeq(
        municipalitySusID,
        teamIne,
        filtersDb,
        searchString
    );
};

export const rowCountCoaps = async ({
    municipalitySusID,
    searchString,
    filters,
}: RowCountParamsCoaps): Promise<number> => {
    const filtersDb = adapter.filterParamsToDbCoaps(
        filters || defaultCoapsFilters
    );
    return await repository.rowCountCoaps(
        municipalitySusID,
        filtersDb,
        searchString
    );
};

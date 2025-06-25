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

const defaultSorting = {
    field: "patientName",
    sort: "asc",
} as const satisfies CoapsSort;

type PageParams = {
    municipalitySusId: string;
    pageIndex: number;
    searchString?: string;
};

type PageParamsCoaps = PageParams & {
    sorting?: CoapsSort;
    filters?: CoapsFilters;
};
type PageParamsCoeq = PageParams & {
    teamIne: string;
    sorting?: CoeqSort;
    filters?: CoeqFilters;
};

export const pageCoeq = async ({
    municipalitySusId,
    teamIne,
    pageIndex,
    sorting,
    searchString,
    filters,
}: PageParamsCoeq): Promise<Array<DiabetesAcfItem>> => {
    const page = await repository.pageCoeq(
        municipalitySusId,
        teamIne,
        pageIndex,
        filters || defaultCoeqFilters,
        sorting || defaultSorting,
        searchString || ""
    );
    return adapter.diabetesPageDbToModel(page);
};

export const pageCoaps = async ({
    municipalitySusId,
    pageIndex,
    sorting,
    searchString,
    filters,
}: PageParamsCoaps): Promise<Array<DiabetesAcfItem>> => {
    const page = await repository.pageCoaps(
        municipalitySusId,
        pageIndex,
        filters || defaultCoapsFilters,
        sorting || defaultSorting,
        searchString || ""
    );
    return adapter.diabetesPageDbToModel(page);
};

type RowCountParams = {
    municipalitySusId: string;
    searchString?: string;
};

type RowCountParamsCoaps = RowCountParams & {
    filters?: CoapsFilters;
};

type RowCountParamsCoeq = RowCountParams & {
    teamIne: string;
    filters?: CoeqFilters;
};

export const rowCountCoeq = async ({
    municipalitySusId,
    teamIne,
    searchString,
    filters,
}: RowCountParamsCoeq): Promise<number> => {
    return await repository.rowCountCoeq(
        municipalitySusId,
        teamIne,
        filters || defaultCoeqFilters,
        searchString || ""
    );
};

export const rowCountCoaps = async ({
    municipalitySusId,
    searchString,
    filters,
}: RowCountParamsCoaps): Promise<number> => {
    return await repository.rowCountCoaps(
        municipalitySusId,
        filters || defaultCoapsFilters,
        searchString || ""
    );
};

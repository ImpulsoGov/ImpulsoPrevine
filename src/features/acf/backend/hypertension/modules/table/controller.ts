import type {
    PageParamsCoaps,
    PageParamsCoeq,
    RowCountParamsCoaps,
    RowCountParamsCoeq,
} from "@/features/acf/backend/common/Defaults";
import { defaultSorting } from "@/features/acf/backend/common/Defaults";
import type {
    CoapsFilters,
    CoapsSort,
    CoeqFilters,
    CoeqSort,
} from "@/features/acf/shared/hypertension/schema";
import * as adapter from "./adapter";
import * as repository from "./repository";
import type { PageItem } from "./model";

const defaultCoeqFilters: CoeqFilters = {
    microAreaName: [],
    appointmentStatusByQuarter: [],
    latestExamRequestStatusByQuarter: [],
    patientAgeRange: [],
};

const defaultCoapsFilters: CoapsFilters = {
    ...defaultCoeqFilters,
    careTeamName: [],
};

export const pageCoeq = async ({
    municipalitySusId,
    teamIne,
    pageIndex,
    sorting,
    searchString,
    filters,
}: PageParamsCoeq<CoeqSort, CoeqFilters>): Promise<Array<PageItem>> => {
    const page = await repository.pageCoeq(
        municipalitySusId,
        teamIne,
        pageIndex,
        filters || defaultCoeqFilters,
        sorting || defaultSorting,
        searchString || ""
    );
    return adapter.hypertensionPageDbToModel(page);
};

export const pageCoaps = async ({
    municipalitySusId,
    pageIndex,
    sorting,
    searchString,
    filters,
}: PageParamsCoaps<CoapsSort, CoapsFilters>): Promise<Array<PageItem>> => {
    const page = await repository.pageCoaps(
        municipalitySusId,
        pageIndex,
        filters || defaultCoapsFilters,
        sorting || defaultSorting,
        searchString || ""
    );
    return adapter.hypertensionPageDbToModel(page);
};

export const rowCountCoeq = async ({
    municipalitySusId,
    teamIne,
    searchString,
    filters,
}: RowCountParamsCoeq<CoeqFilters>): Promise<number> => {
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
}: RowCountParamsCoaps<CoapsFilters>): Promise<number> => {
    return await repository.rowCountCoaps(
        municipalitySusId,
        filters || defaultCoapsFilters,
        searchString || ""
    );
};

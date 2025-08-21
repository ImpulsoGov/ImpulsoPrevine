import type {
    PrintParamsCoaps,
    PrintParamsCoeq,
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

export const dataPrintCoeq = async ({
    municipalitySusId,
    teamIne,
    sorting,
    searchString,
    filters,
}: PrintParamsCoeq<CoeqSort, CoeqFilters>): Promise<Array<PageItem>> => {
    const page = await repository.pageCoeq(
        municipalitySusId,
        teamIne,
        adapter.filtersModelToDbCoeq(filters || defaultCoeqFilters),
        sorting || defaultSorting,
        searchString || ""
    );
    return adapter.hypertensionPageDbToModel(page);
};

export const dataPrintCoaps = async ({
    municipalitySusId,
    sorting,
    searchString,
    filters,
}: PrintParamsCoaps<CoapsSort, CoapsFilters>): Promise<Array<PageItem>> => {
    const page = await repository.pageCoaps(
        municipalitySusId,
        adapter.filtersModelToDbCoaps(filters || defaultCoapsFilters),
        sorting || defaultSorting,
        searchString || ""
    );
    return adapter.hypertensionPageDbToModel(page);
};

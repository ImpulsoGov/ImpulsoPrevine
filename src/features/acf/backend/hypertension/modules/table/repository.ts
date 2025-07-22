import type {
    CoapsFilters,
    CoapsSort,
    CoeqFilters,
    CoeqSort,
} from "@/features/acf/shared/diabetes/schema";
import type { DiabetesAcfItem } from "@prisma/client";
import { prisma } from "@prisma/production/prismaClient";
const pageSize = 8;

type QueryWhere = {
    patientStatus?: { in: Array<string> };
    conditionIdentifiedBy?: { in: Array<string> };
    communityHealthWorker?: { in: Array<string> };
    patientAgeRange?: { in: Array<string> };
    municipalitySusId: string;
    patientName?: { contains: string };
};

type QueryWhereCoaps = QueryWhere & {
    careTeamName?: { in: Array<string> };
};

type QueryWhereCoeq = QueryWhere & {
    careTeamIne: string;
};

const addFilterFieldCoaps = (
    where: QueryWhereCoaps,
    filter: CoapsFilters,
    field: keyof CoapsFilters
): void => {
    if (filter[field].length > 0) {
        where[field] = { in: filter[field] };
    }
};

const addFilterFieldCoeq = (
    where: QueryWhereCoeq,
    filter: CoeqFilters,
    field: keyof CoeqFilters
): void => {
    if (filter[field].length > 0) {
        where[field] = { in: filter[field] };
    }
};

const addSearchField = (where: QueryWhere, search: string): void => {
    if (search.length > 0) {
        where["patientName"] = { contains: search };
    }
};

const queryWhereCoaps = (
    filter: CoapsFilters,
    municipalitySusId: string,
    search: string
): QueryWhere => {
    const querys = {} as QueryWhereCoaps;

    addFilterFieldCoaps(querys, filter, "patientStatus");
    addFilterFieldCoaps(querys, filter, "communityHealthWorker");
    addFilterFieldCoaps(querys, filter, "patientAgeRange");
    addFilterFieldCoaps(querys, filter, "conditionIdentifiedBy");
    addFilterFieldCoaps(querys, filter, "careTeamName");

    querys.municipalitySusId = municipalitySusId;
    addSearchField(querys, search);

    return querys;
};

const queryWhereCoeq = (
    filter: CoeqFilters,
    municipalitySusId: string,
    teamIne: string,
    search: string
): QueryWhere => {
    const querys = {} as QueryWhereCoeq;
    addFilterFieldCoeq(querys, filter, "patientStatus");
    addFilterFieldCoeq(querys, filter, "communityHealthWorker");
    addFilterFieldCoeq(querys, filter, "patientAgeRange");
    addFilterFieldCoeq(querys, filter, "conditionIdentifiedBy");
    querys.municipalitySusId = municipalitySusId;
    querys.careTeamIne = teamIne;
    addSearchField(querys, search);

    return querys;
};

export const pageCoeq = async (
    municipalitySusId: string,
    teamIne: string,
    page: number,
    filters: CoeqFilters,
    sorting: CoeqSort,
    searchString: string
): Promise<ReadonlyArray<DiabetesAcfItem>> => {
    return await prisma.diabetesAcfItem.findMany({
        where: queryWhereCoeq(
            filters,
            municipalitySusId,
            teamIne,
            searchString.toLocaleUpperCase()
        ),
        orderBy: {
            [sorting.field]: {
                sort: sorting.sort,
                nulls: sorting.sort == "asc" ? "first" : "last",
            },
        },
        take: pageSize,
        skip: pageSize * page,
    });
};

export const pageCoaps = async (
    municipalitySusId: string,
    page: number,
    filters: CoapsFilters,
    sorting: CoapsSort,
    searchString: string
): Promise<ReadonlyArray<DiabetesAcfItem>> => {
    return await prisma.diabetesAcfItem.findMany({
        where: queryWhereCoaps(
            filters,
            municipalitySusId,
            searchString.toLocaleUpperCase()
        ),
        orderBy: {
            [sorting.field]: {
                sort: sorting.sort,
                nulls: sorting.sort == "asc" ? "first" : "last",
            },
        },
        take: pageSize,
        skip: pageSize * page,
    });
};

export const rowCountCoaps = async (
    municipalitySusId: string,
    filters: CoapsFilters,
    search: string
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
        where: queryWhereCoaps(
            filters,
            municipalitySusId,
            search.toLocaleUpperCase()
        ),
    });
};

export const rowCountCoeq = async (
    municipalitySusId: string,
    teamIne: string,
    filters: CoeqFilters,
    search: string
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
        where: queryWhereCoeq(
            filters,
            municipalitySusId,
            teamIne,
            search.toLocaleUpperCase()
        ),
    });
};

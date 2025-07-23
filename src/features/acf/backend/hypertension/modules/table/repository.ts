// TODO: Criar e importar tipos de hipertensão
import type {
    CoapsFilters,
    CoapsSort,
    CoeqFilters,
    CoeqSort,
} from "@/features/acf/shared/hypertension/schema";
import type { HypertensionAcfItem } from ".prisma/serviceLayerClient";
import { prisma } from "@prisma/serviceLayer/prismaClient";
import type {
    GenericQueryWhereCoaps,
    GenericQueryWhereCoeq,
} from "@/features/acf/backend/common/PageParams";
import { addFilterField } from "@/features/acf/backend/common/addFilterField";
import { addSearchField } from "@/features/acf/backend/common/addSearchField";

const pageSize = 8;

const queryWhereCoaps = (
    filter: CoapsFilters,
    municipalitySusId: string,
    search: string
): GenericQueryWhereCoaps<CoapsFilters> => {
    const querys = {} as GenericQueryWhereCoaps<CoapsFilters>;
    //TODO: Criar loop para evitar repetição
    addFilterField(querys, filter, "microArea");
    addFilterField(querys, filter, "appointmentStatusByQuarter");
    addFilterField(querys, filter, "latestExamRequestStatusByQuarter");
    addFilterField(querys, filter, "patientAgeRange");
    addFilterField(querys, filter, "careTeamName");

    querys.municipalitySusId = municipalitySusId;
    addSearchField(querys, search);

    return querys;
};

const queryWhereCoeq = (
    filter: CoeqFilters,
    municipalitySusId: string,
    teamIne: string,
    search: string
): GenericQueryWhereCoeq<CoeqFilters> => {
    const querys = {} as GenericQueryWhereCoeq<CoeqFilters>;
    addFilterField(querys, filter, "microArea");
    addFilterField(querys, filter, "appointmentStatusByQuarter");
    addFilterField(querys, filter, "latestExamRequestStatusByQuarter");
    addFilterField(querys, filter, "patientAgeRange");
    querys.municipalitySusId = municipalitySusId;
    querys.careTeamName = teamIne;
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
): Promise<ReadonlyArray<HypertensionAcfItem>> => {
    return await prisma.hypertensionAcfItem.findMany({
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
): Promise<ReadonlyArray<HypertensionAcfItem>> => {
    return await prisma.hypertensionAcfItem.findMany({
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
    return await prisma.hypertensionAcfItem.count({
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
    return await prisma.hypertensionAcfItem.count({
        where: queryWhereCoeq(
            filters,
            municipalitySusId,
            teamIne,
            search.toLocaleUpperCase()
        ),
    });
};

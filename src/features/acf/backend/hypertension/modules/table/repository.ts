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
    AreKeysNullable,
} from "@/features/acf/backend/common/PageParams";
import { addFilterField } from "@/features/acf/backend/common/addFilterField";
import { addSearchField } from "@/features/acf/backend/common/addSearchField";
import type { HypertensionAcfItem as HypertensionFields } from "@/features/acf/shared/hypertension/model";
const pageSize = 8;

const queryWhereCoaps = (
    filter: CoapsFilters,
    municipalitySusId: string,
    search: string
): GenericQueryWhereCoaps<CoapsFilters> => {
    const querys = {} as GenericQueryWhereCoaps<CoapsFilters>;
    Object.keys(filter).forEach((key) => {
        addFilterField(querys, filter, key as keyof CoapsFilters);
    });

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
    // TODO: criar uma função própria que retorna as chaves de um objeto como string literal
    //  Ex: function typedKeys<T extends object>(obj: T): Array<keyof T> {return Object.keys(obj) as Array<keyof T>;}
    Object.keys(filter).forEach((key) => {
        addFilterField(querys, filter, key as keyof CoeqFilters);
    });
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
): Promise<ReadonlyArray<HypertensionAcfItem>> => {
    const isFieldNullable = nullableFields[sorting.field].nullable;

    return await prisma.hypertensionAcfItem.findMany({
        where: queryWhereCoeq(
            filters,
            municipalitySusId,
            teamIne,
            searchString.toLocaleUpperCase()
        ),
        orderBy: isFieldNullable
            ? {
                  [sorting.field]: {
                      sort: sorting.sort,
                      nulls: sorting.sort == "asc" ? "first" : "last",
                  },
              }
            : { [sorting.field]: sorting.sort },
        take: pageSize,
        skip: pageSize * page,
    });
};

type NullableFields = AreKeysNullable<
    Omit<HypertensionFields, "municipalitySusId" | "municipalityName">
>;

const nullableFields: NullableFields = {
    patientName: { nullable: false },
    latestAppointmentDate: { nullable: true },
    appointmentStatusByQuarter: { nullable: false },
    latestExamRequestStatusByQuarter: { nullable: false },
    careTeamName: { nullable: true },
    microAreaName: { nullable: true },
    patientPhoneNumber: { nullable: true },
    patientAge: { nullable: false },
    latestExamRequestDate: { nullable: true },
    patientCpf: { nullable: false },
};

export const pageCoaps = async (
    municipalitySusId: string,
    page: number,
    filters: CoapsFilters,
    sorting: CoapsSort,
    searchString: string
): Promise<ReadonlyArray<HypertensionAcfItem>> => {
    const isFieldNullable = nullableFields[sorting.field].nullable;
    return await prisma.hypertensionAcfItem.findMany({
        where: queryWhereCoaps(
            filters,
            municipalitySusId,
            searchString.toLocaleUpperCase()
        ),
        orderBy: isFieldNullable
            ? {
                  [sorting.field]: {
                      sort: sorting.sort,
                      nulls: sorting.sort == "asc" ? "first" : "last",
                  },
              }
            : { [sorting.field]: sorting.sort },
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

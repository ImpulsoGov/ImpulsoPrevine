import type { HypertensionAcfItem, Prisma } from ".prisma/serviceLayerClient";
import type { NullableFields } from "@/features/acf/backend/common/QueryBuilder";
import {
    isFieldNullable,
    orderByNotNullable,
    orderByNullable,
    whereInput,
} from "@/features/acf/backend/common/QueryBuilder";
import type {
    CoapsFilters,
    CoapsSort,
    CoeqFilters,
    CoeqSort,
} from "@/features/acf/shared/hypertension/schema";
import { prisma } from "@prisma/serviceLayer/prismaClient";

const pageSize = 8;

const whereInputCoaps = whereInput;

const whereInputCoeq = (
    filter: CoeqFilters,
    municipalitySusId: string,
    teamIne: string,
    search: string
): Prisma.HypertensionAcfItemWhereInput => {
    return {
        ...whereInput(filter, municipalitySusId, search),
        careTeamIne: teamIne,
    };
};

export const nullableFields: NullableFields = {
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

export const pageCoeq = async (
    municipalitySusId: string,
    teamIne: string,
    page: number,
    filters: CoeqFilters,
    sorting: CoeqSort,
    searchString: string
): Promise<ReadonlyArray<HypertensionAcfItem>> => {
    return await prisma.hypertensionAcfItem.findMany({
        where: whereInputCoeq(
            filters,
            municipalitySusId,
            teamIne,
            searchString.toLocaleUpperCase()
        ),
        orderBy: isFieldNullable(sorting.field as keyof typeof nullableFields)
            ? orderByNullable(sorting.field, sorting.sort)
            : orderByNotNullable(sorting.field, sorting.sort),
        take: pageSize,
        skip: pageSize * page,
    });
};

// export const orderByNullable = (
//     field: keyof Prisma.HypertensionAcfItemOrderByWithRelationInput,
//     sort: "asc" | "desc"
// ): Prisma.HypertensionAcfItemOrderByWithRelationInput => ({
//     [field]: {
//         sort: sort,
//         nulls: sort == "asc" ? "first" : "last",
//     },
// });

// export const orderByNotNullable = (
//     field: keyof Prisma.HypertensionAcfItemOrderByWithRelationInput,
//     sort: "asc" | "desc"
// ):  Prisma.HypertensionAcfItemOrderByWithRelationInput => ({
//     [field]: sort,
// });

export const pageCoaps = async (
    municipalitySusId: string,
    page: number,
    filters: CoapsFilters,
    sorting: CoapsSort,
    searchString: string
): Promise<ReadonlyArray<HypertensionAcfItem>> => {
    return await prisma.hypertensionAcfItem.findMany({
        where: whereInputCoaps(
            filters,
            municipalitySusId,
            searchString.toLocaleUpperCase()
        ),
        orderBy: isFieldNullable(sorting.field as keyof typeof nullableFields)
            ? orderByNullable(sorting.field, sorting.sort)
            : orderByNotNullable(sorting.field, sorting.sort),
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
        where: whereInputCoaps(
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
        where: whereInputCoeq(
            filters,
            municipalitySusId,
            teamIne,
            search.toLocaleUpperCase()
        ),
    });
};

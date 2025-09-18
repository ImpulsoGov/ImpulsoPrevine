import type { HypertensionAcfItem, Prisma } from "@prisma/client";

import type { NullableFields } from "@/features/acf/backend/common/QueryBuilder";
import {
    isFieldNullable,
    orderByNotNullable,
    orderByNullable,
    whereInput,
} from "@/features/acf/backend/common/QueryBuilder";
import type {
    CoapsSort,
    CoeqSort,
} from "@/features/acf/shared/hypertension/schema";
import { prisma } from "@prisma/prismaClient";
import type {
    FiltersOptionsDbCoaps,
    FiltersOptionsDbCoeq,
} from "../common/FiltersOptionsDb";

const pageSize = 8;

//TODO: Essa foi a melhor forma que encontramos de passar a informação "quais campos do model são nullable?"
//      do sistema de tipos para runtime. Se algum dia descobrirmos uma forma melhor, podemos remover isso.
const nullableFields: NullableFields<HypertensionAcfItem> = {
    patientId: false,
    patientName: false,
    patientCpf: true,
    patientCns: true,
    latestAppointmentDate: true,
    appointmentStatusByQuarter: false,
    latestExamRequestDate: true,
    latestExamRequestStatusByQuarter: false,
    careTeamName: true,
    careTeamIne: true,
    microAreaName: true,
    patientPhoneNumber: true,
    patientAge: false,
    patientAgeRange: false,
    goodPracticesSum: false,
    latestHomeVisitDate: true,
    homeVisitStatusByQuarter: false,
    latestWeightHeightDate: true,
    weightHeightStatusByQuarter: false,
    isMedicalRecordUpdated: false,
    goodPracticesStatusByQuarter: false,
};

const whereInputCoaps = whereInput;

const whereInputCoeq = (
    filter: FiltersOptionsDbCoeq,
    municipalitySusId: string,
    teamIne: string,
    search: string
): Prisma.HypertensionAcfItemWhereInput => {
    return {
        ...whereInput(filter, municipalitySusId, search),
        careTeamIne: teamIne,
    };
};

export const pageCoeq = async (
    municipalitySusId: string,
    teamIne: string,
    page: number,
    filters: FiltersOptionsDbCoeq,
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
        //TODO: Extrair essa expressão pro QueryBuilder
        orderBy: isFieldNullable(
            nullableFields,
            sorting.field as keyof typeof nullableFields
        )
            ? orderByNullable(sorting.field, sorting.sort)
            : orderByNotNullable(sorting.field, sorting.sort),
        take: pageSize,
        skip: pageSize * page,
    });
};

export const pageCoaps = async (
    municipalitySusId: string,
    page: number,
    filters: FiltersOptionsDbCoaps,
    sorting: CoapsSort,
    searchString: string
): Promise<ReadonlyArray<HypertensionAcfItem>> => {
    return await prisma.hypertensionAcfItem.findMany({
        where: whereInputCoaps(
            filters,
            municipalitySusId,
            searchString.toLocaleUpperCase()
        ),
        orderBy: isFieldNullable(
            nullableFields,
            sorting.field as keyof typeof nullableFields
        )
            ? orderByNullable(sorting.field, sorting.sort)
            : orderByNotNullable(sorting.field, sorting.sort),
        take: pageSize,
        skip: pageSize * page,
    });
};

export const rowCountCoaps = async (
    municipalitySusId: string,
    filters: FiltersOptionsDbCoaps,
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
    filters: FiltersOptionsDbCoeq,
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

export const allDataCoeq = async (
    municipalitySusId: string,
    teamIne: string,
    filters: FiltersOptionsDbCoeq,
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
        //TODO: Extrair essa expressão pro QueryBuilder
        orderBy: isFieldNullable(
            nullableFields,
            sorting.field as keyof typeof nullableFields
        )
            ? orderByNullable(sorting.field, sorting.sort)
            : orderByNotNullable(sorting.field, sorting.sort),
    });
};

export const allDataCoaps = async (
    municipalitySusId: string,
    filters: FiltersOptionsDbCoaps,
    sorting: CoapsSort,
    searchString: string
): Promise<ReadonlyArray<HypertensionAcfItem>> => {
    return await prisma.hypertensionAcfItem.findMany({
        where: whereInputCoaps(
            filters,
            municipalitySusId,
            searchString.toLocaleUpperCase()
        ),
        orderBy: isFieldNullable(
            nullableFields,
            sorting.field as keyof typeof nullableFields
        )
            ? orderByNullable(sorting.field, sorting.sort)
            : orderByNotNullable(sorting.field, sorting.sort),
    });
};

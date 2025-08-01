import type { DiabetesAcfItem, Prisma } from ".prisma/pb2024Client";
import type {
    CoapsFilters,
    CoapsSort,
    CoeqFilters,
    CoeqSort,
} from "@/features/acf/shared/diabetes/schema";
import {
    isFieldNullable,
    orderByNotNullable,
    orderByNullable,
    whereInput,
    type NullableFields,
} from "@features/acf/backend/common/QueryBuilder";
import { prisma } from "@prisma/pb2024/prismaClient";

const pageSize = 8;

//TODO: Essa foi a melhor forma que encontramos de passar a informação "quais campos do model são nullable?"
//      do sistema de tipos para runtime. Se algum dia descobrirmos uma forma melhor, podemos remover isso.
const nullableFields: NullableFields<DiabetesAcfItem> = {
    id: false,
    municipalityState: true,
    latestExamRequestDate: true,
    mostRecentAppointmentDate: true,
    hemoglobinTestDueDate: true,
    nextAppointmentDueDate: true,
    patientStatus: true,
    conditionIdentifiedBy: true,
    patientCpfOrBirthday: true,
    patientName: true,
    patientAge: true,
    patientAgeRange: true,
    careTeamIne: true,
    careTeamName: true,
    communityHealthWorker: true,
    mostRecentProductionRecordDate: false,
};

const whereInputCoaps = whereInput;

const whereInputCoeq = (
    filter: CoeqFilters,
    municipalitySusId: string,
    teamIne: string,
    search: string
): Prisma.DiabetesAcfItemWhereInput => {
    return {
        ...whereInput(filter, municipalitySusId, search),
        careTeamIne: teamIne,
    };
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
        where: whereInputCoeq(
            filters,
            municipalitySusId,
            teamIne,
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

export const pageCoaps = async (
    municipalitySusId: string,
    page: number,
    filters: CoapsFilters,
    sorting: CoapsSort,
    searchString: string
): Promise<ReadonlyArray<DiabetesAcfItem>> => {
    return await prisma.diabetesAcfItem.findMany({
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
    filters: CoapsFilters,
    search: string
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
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
    return await prisma.diabetesAcfItem.count({
        where: whereInputCoeq(
            filters,
            municipalitySusId,
            teamIne,
            search.toLocaleUpperCase()
        ),
    });
};

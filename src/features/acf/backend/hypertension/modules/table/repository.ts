import type { HypertensionAcfItem, Prisma } from ".prisma/serviceLayerClient";
import type { HypertensionAcfItem as HypertensionFields } from "@/features/acf/shared/hypertension/model";
import type {
    CoapsFilters,
    CoapsSort,
    CoeqFilters,
    CoeqSort,
} from "@/features/acf/shared/hypertension/schema";
import type { AreKeysNullable } from "@/features/common/shared/types";
import { prisma } from "@prisma/serviceLayer/prismaClient";
import { addFilterField } from "../../../common/addFilterField";
import { addSearchField } from "../../../common/addSearchField";
const pageSize = 8;

//TODO: Mover pra algum módulo QueryBuilder ou parecido, junto com addSearchField e addFilterField
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const whereInput = <TFilters extends Record<string, Array<unknown>>>(
    filter: TFilters,
    municipalitySusId: string,
    search: string
): Prisma.HypertensionAcfItemWhereInput => {
    const queries: Prisma.HypertensionAcfItemWhereInput = Object.keys(
        filter
    ).reduce((acc, key) => {
        return addFilterField(acc, filter, key as keyof CoeqFilters);
    }, {});

    queries.municipalitySusId = municipalitySusId;
    addSearchField(queries, search);

    return queries;
};

const whereInputCoaps = whereInput;

const whereInputCoeq = (
    filter: CoeqFilters,
    municipalitySusId: string,
    teamIne: string,
    search: string
): Prisma.HypertensionAcfItemWhereInput => {
    const result = whereInput(filter, municipalitySusId, search);
    result.careTeamIne = teamIne;
    return result;
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
        where: whereInputCoeq(
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
        where: whereInputCoaps(
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

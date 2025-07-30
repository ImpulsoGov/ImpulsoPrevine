import type { Prisma } from ".prisma/serviceLayerClient";
import type { CoeqSort, CoapsSort } from "../../shared/hypertension/schema";
import { nullableFields } from "../hypertension/modules/table/repository";
import type { AreKeysNullable } from "@/features/common/shared/types";
import type { HypertensionAcfItem as HypertensionFields } from "../../shared/hypertension/model";

type BaseWhereInput = {
    municipalitySusId: string;
};

type BaseFilters = Record<string, Array<unknown>>;

const addFilterField = <TQueryInput, TFilters extends BaseFilters>(
    where: TQueryInput,
    filter: TFilters,
    field: keyof TFilters
): TQueryInput => {
    if (filter[field].length > 0) {
        return {
            ...where,
            field: {
                in: filter[field],
            },
        };
    }

    return where;
};

export const whereInput = <
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
    TFilters extends BaseFilters,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
    TPrismaWhereInput extends BaseWhereInput,
>(
    filter: TFilters,
    municipalitySusId: string,
    search: string
): TPrismaWhereInput => {
    const queries: TPrismaWhereInput = Object.keys(filter).reduce(
        (acc, key) => {
            return addFilterField(acc, filter, key);
        },
        {} as TPrismaWhereInput
    );

    queries.municipalitySusId = municipalitySusId;

    if (search.length > 0) {
        return {
            ...queries,
            patientName: { contains: search },
        };
    }
    return queries;
};
export const isFieldNullable = (sortingField: keyof NullableFields): boolean =>
    nullableFields[sortingField].nullable;
export const orderByNullable = (
    sorting: CoeqSort | CoapsSort
): Record<string, Prisma.SortOrderInput> => ({
    [sorting.field]: {
        sort: sorting.sort,
        nulls: sorting.sort == "asc" ? "first" : "last",
    },
});
export const orderByNotNullable = (
    sorting: CoeqSort | CoapsSort
): Record<string, Prisma.SortOrder> => ({
    [sorting.field]: sorting.sort,
});
export type NullableFields = AreKeysNullable<
    Omit<HypertensionFields, "municipalitySusId" | "municipalityName">
>;

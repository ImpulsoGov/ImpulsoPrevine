import type { Prisma } from "@prisma/client";
import type { AreKeysNullable } from "@/features/common/shared/types";

type BaseWhereInput = {
    municipalitySusId: string;
};

export type BaseFilters = Record<string, ReadonlyArray<unknown>>;

export const addFilterField = <TPrismaWhereInput, TFilters extends BaseFilters>(
    where: TPrismaWhereInput,
    filter: TFilters,
    field: keyof TFilters
): TPrismaWhereInput => {
    const values = filter[field] as ReadonlyArray<string | null>;
    if (values.length === 0) {
        return where;
    }

    const nonNulls = values.filter(
        (value): value is string => typeof value === "string"
    );

    const hasNull = values.includes(null);

    if (nonNulls.length > 0 && hasNull) {
        return {
            ...where,
            OR: [{ [field]: { in: nonNulls } }, { [field]: null }],
        };
    }
    if (nonNulls.length > 0) {
        return {
            ...where,
            [field]: {
                in: nonNulls,
            },
        };
    }

    if (hasNull) {
        return {
            ...where,
            [field]: null,
        };
    }
    return where;
};

export const whereInput = <
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
    TPrismaWhereInput extends BaseWhereInput,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
    TFilters extends BaseFilters,
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
            patientName: { contains: search, mode: "insensitive" },
        };
    }
    return queries;
};

export const isFieldNullable = <TPrismaModel>(
    nullableFields: NullableFields<TPrismaModel>,
    sortingField: keyof NullableFields<TPrismaModel>
): boolean => nullableFields[sortingField];

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const orderByNullable = <TSort>(
    field: keyof TSort,
    sort: "asc" | "desc"
): Record<string, Prisma.SortOrderInput> => ({
    [field]: {
        sort: sort,
        nulls: sort == "asc" ? "first" : "last",
    } satisfies Prisma.SortOrderInput,
});

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const orderByNotNullable = <TSort>(
    field: keyof TSort,
    sort: "asc" | "desc"
): Record<string, Prisma.SortOrder> => ({
    [field]: sort,
});

export type NullableFields<TPrismaModel> = AreKeysNullable<
    Omit<TPrismaModel, "municipalitySusId" | "municipalityName">
>;

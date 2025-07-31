import type { Prisma } from ".prisma/serviceLayerClient";
import type { AreKeysNullable } from "@/features/common/shared/types";
import type { HypertensionAcfItem as HypertensionFields } from "../../shared/hypertension/model";
import { nullableFields } from "../hypertension/modules/table/repository";

type BaseWhereInput = {
    municipalitySusId: string;
};

type BaseFilters = Record<string, Array<unknown>>;

const addFilterField = <TPrismaWhereInput, TFilters extends BaseFilters>(
    where: TPrismaWhereInput,
    filter: TFilters,
    field: keyof TFilters
): TPrismaWhereInput => {
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
            patientName: { contains: search },
        };
    }
    return queries;
};

//TODO: implementar de outra forma
export const isFieldNullable = (sortingField: keyof NullableFields): boolean =>
    nullableFields[sortingField].nullable;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const orderByNullable = <TSort>(
    field: keyof TSort,
    sort: "asc" | "desc"
): { [x: string]: { sort: "asc" | "desc"; nulls: string } } => ({
    [field]: {
        sort: sort,
        nulls: sort == "asc" ? "first" : "last",
    },
});

//TODO: Desacoplar de CoeqSort e CoapsSort
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const orderByNotNullable = <TSort>(
    field: keyof TSort,
    sort: "asc" | "desc"
): Record<string, Prisma.SortOrder> => ({
    [field]: sort,
});

//TODO: remover isso
export type NullableFields = AreKeysNullable<
    Omit<HypertensionFields, "municipalitySusId" | "municipalityName">
>;

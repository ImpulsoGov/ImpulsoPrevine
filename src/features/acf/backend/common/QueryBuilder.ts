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

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const whereInput = <
    TFilters extends BaseFilters,
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

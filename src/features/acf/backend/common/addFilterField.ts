export const addFilterField = <
    TQueryInput extends object,
    TFilters extends Record<string, Array<unknown>>,
>(
    where: TQueryInput,
    filter: TFilters,
    field: keyof TFilters
): TQueryInput => {
    if (filter[field].length > 0) {
        return Object.assign(where, {
            field: {
                in: filter[field],
            },
        });
    }

    return where;
};

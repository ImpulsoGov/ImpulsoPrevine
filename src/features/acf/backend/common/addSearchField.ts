export const addSearchField = <TQueryInput extends object>(
    where: TQueryInput,
    search: string
): TQueryInput => {
    if (search.length > 0) {
        return Object.assign(where, { patientName: { contains: search } });
    }
    return where;
};

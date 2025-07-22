import type { GenericQueryWhere } from "./PageParams";

export const addFilterField = <
    TFilters extends Record<string, Array<string | number>>,
>(
    where: GenericQueryWhere<TFilters>,
    filter: TFilters,
    field: keyof TFilters
): void => {
    if (filter[field].length > 0) {
        where[field] = {
            in: filter[field],
        } as unknown as GenericQueryWhere<TFilters>[typeof field];
    }
};

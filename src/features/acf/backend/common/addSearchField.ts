import type {
    GenericQueryWhereCoaps,
    GenericQueryWhereCoeq,
} from "./PageParams";

export const addSearchField = <TFilters>(
    where: GenericQueryWhereCoaps<TFilters> | GenericQueryWhereCoeq<TFilters>,
    search: string
): void => {
    if (search.length > 0) {
        where["patientName"] = { contains: search };
    }
};

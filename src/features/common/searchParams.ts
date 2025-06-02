import type { FilterItem } from "@/services/lista-nominal/ListaNominal";

export const extractFilters = (searchParams: URLSearchParams): FilterItem => {
    const filters = searchParams.get("filters");

    if (!filters) return {};

    const filterItem: FilterItem = {};
    for (const filter of filters.split(";").filter(Boolean)) {
        const [key, value] = filter.split(":");
        filterItem[key] =
            value.split(",").length > 1
                ? value.split(",")
                : value.split(",")[0];
    }
    return filterItem;
};

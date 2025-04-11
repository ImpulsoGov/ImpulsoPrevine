import type { FilterItem } from "@/services/lista-nominal/ListaNominal";

export interface Filter {
    id: string;
    label: string;
    options: OptionsType[];
    isMultiSelect: boolean;
    width: string;
}
export type OptionsType = {
    value: string;
    label: string;
};

export const initialFiltersBuilder = (
    searchParams: URLSearchParams,
    filters: Filter[]
)=>filters.reduce<FilterItem>((acc, filter: Filter) => {
    const paramValue = searchParams.get(filter.id);
    acc[filter.id] = paramValue
        ? filter.isMultiSelect
            ? paramValue.split(",")
            : paramValue
        : filter.isMultiSelect
            ? []
            : "";
    return acc;
}, {});

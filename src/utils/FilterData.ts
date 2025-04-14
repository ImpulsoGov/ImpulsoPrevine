import type { DiabetesAcfItem } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/DiabetesAcfItem.model";

export type ValidValue = string | number | boolean | Date | null | undefined;

export type FilterValue = string | readonly string[];

export interface Filters extends Record<string, FilterValue> {}

export interface DataItem extends Record<string, ValidValue> {}
const isArrayFilter = (value: FilterValue): value is readonly string[] =>
    Array.isArray(value);

//organizacao e legibilidade esta muito ruim
export const filterData = (
    dataArray: readonly DiabetesAcfItem[],
    filters: Filters,
): DiabetesAcfItem[] => {
    const filterEntries = Object.entries(filters).filter(([, value]) =>
        isArrayFilter(value) ? value.length > 0 : Boolean(value),
    );
    if (!filterEntries.length) return [...dataArray];
    const filterSets = new Map(
        filterEntries
            .filter(([, value]) => isArrayFilter(value))
            .map(([key, value]) => [key, new Set(value)]),
    );
    return dataArray.filter((item: DiabetesAcfItem) =>
        filterEntries.every(([key, value]) => {
            const normalizedItem = String(item[key as keyof DiabetesAcfItem])

            return isArrayFilter(value)
                ? (filterSets.get(key)?.has(normalizedItem) ?? false)
                : normalizedItem === value;
        }),
    );
};

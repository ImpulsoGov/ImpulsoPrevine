export type ValidValue = string | number | boolean | Date | null | undefined;

export type FilterValue = string | readonly string[];

export interface Filters extends Record<string, FilterValue> {}

export interface DataItem extends Record<string, ValidValue> {}

const isArrayFilter = (value: FilterValue): value is readonly string[] =>
    Array.isArray(value);

const normalizeValue = (value: ValidValue): string => String(value);

//organizacao e legibilidade esta muito ruim
export const filterData = (
    dataArray: readonly DataItem[],
    filters: Filters,
): DataItem[] => {
    const filterEntries = Object.entries(filters).filter(([, value]) =>
        isArrayFilter(value) ? value.length > 0 : Boolean(value),
    );
    if (!filterEntries.length) return [...dataArray];
    const filterSets = new Map(
        filterEntries
            .filter(([, value]) => isArrayFilter(value))
            .map(([key, value]) => [key, new Set(value)]),
    );
    return dataArray.filter((item) =>
        filterEntries.every(([key, value]) => {
            const normalizedItem = normalizeValue(item[key]);

            return isArrayFilter(value)
                ? (filterSets.get(key)?.has(normalizedItem) ?? false)
                : normalizedItem === value;
        }),
    );
};

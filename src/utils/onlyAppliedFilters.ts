import type { FilterItem } from "@/services/lista-nominal/ListaNominal";

export const onlyAppliedFilters = (filters: FilterItem): FilterItem => {
  const appliedFilters: FilterItem = {};
  for (const key in filters) {
    if (filters[key].length > 0) {
      appliedFilters[key] = filters[key];
    }
  }
  return appliedFilters;
}
"use client";
import type * as schema from "@/features/acf/shared/diabetes/schema";
import type { AppliedFiltersCoaps } from "./model";
import type { BodyBuilder } from "@/features/acf/frontend/common/DataTable";
import { getPageBuilder } from "@/features/acf/frontend/common/DataTable";

const bodyBuilder: BodyBuilder<
    AppliedFiltersCoaps,
    schema.CoapsPageRequestBody
> = (appliedSorting, appliedFilters, searchString) => {
    return Object.assign(
        {},
        !appliedSorting ? {} : { sorting: appliedSorting as schema.CoapsSort },
        !searchString ? {} : { search: searchString },
        !appliedFilters
            ? {}
            : {
                  filters: {
                      ...appliedFilters,
                      conditionIdentifiedBy:
                          appliedFilters.conditionIdentifiedBy === ""
                              ? []
                              : [appliedFilters.conditionIdentifiedBy],
                  },
              }
    );
};

export const getCoapsPage = getPageBuilder<
    schema.CoapsPageRequestBody,
    schema.PageResponse,
    AppliedFiltersCoaps
>("DIABETES", "coaps", bodyBuilder);

"use client";
import type { BodyBuilder } from "@/features/acf/frontend/common/DataTable";
import { getPageBuilder } from "@/features/acf/frontend/common/DataTable";
import type * as schema from "@/features/acf/shared/hypertension/schema";
import type { CoapsAppliedFilters } from "./model";

export const bodyBuilder: BodyBuilder<
    CoapsAppliedFilters,
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
                      patientAgeRange:
                          appliedFilters.patientAgeRange === ""
                              ? []
                              : [appliedFilters.patientAgeRange],
                  },
              }
    );
};

export const getCoapsPage = getPageBuilder<
    schema.CoapsPageRequestBody,
    schema.PageResponse,
    CoapsAppliedFilters
>("hypertension", "coaps", bodyBuilder);

"use client";

import type { BodyBuilder } from "@/features/acf/frontend/common/Print/modules/PrintTable/service";
import { getDataBuilder } from "@/features/acf/frontend/common/Print/modules/PrintTable/service";
import type * as schema from "@/features/acf/shared/hypertension/schema";
import type { CoapsAppliedFilters } from "../CoapsDataTable";

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

export const getCoapsData = getDataBuilder<
    schema.CoapsPageRequestBody,
    schema.DataResponse,
    CoapsAppliedFilters
>("hypertension", "coaps", bodyBuilder);

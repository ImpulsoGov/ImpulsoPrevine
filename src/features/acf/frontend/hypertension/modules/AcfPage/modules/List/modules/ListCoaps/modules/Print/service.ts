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
                      goodPracticesStatusByQuarter:
                          appliedFilters.goodPracticesStatusByQuarter === ""
                              ? []
                              : [appliedFilters.goodPracticesStatusByQuarter],
                      medicalRecordUpdated:
                          appliedFilters.medicalRecordUpdated === ""
                              ? []
                              : [appliedFilters.medicalRecordUpdated],
                  },
              }
    );
};

export const getCoapsData = getDataBuilder<
    schema.CoapsPageRequestBody,
    schema.DataResponse,
    CoapsAppliedFilters
>("cuidado_da_pessoa_com_hipertensao", "coaps", bodyBuilder);

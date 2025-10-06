"use client";
import type { BodyBuilder } from "@/features/acf/frontend/common/DataTable";
import { getDataBuilder } from "@/features/acf/frontend/common/Print/modules/PrintTable/service";
import type * as schema from "@/features/acf/shared/diabetes/schema";
import type { CoeqAppliedFilters } from "../CoeqDataTable";

export const bodyBuilder: BodyBuilder<
    CoeqAppliedFilters,
    schema.CoeqPageRequestBody
> = (appliedSorting, appliedFilters, searchString) => {
    return Object.assign(
        {},
        !appliedSorting ? {} : { sorting: appliedSorting as schema.CoeqSort },
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

export const getCoeqData = getDataBuilder<
    schema.CoeqPageRequestBody,
    schema.DataResponse,
    CoeqAppliedFilters
>("diabetes", "coeq", bodyBuilder);

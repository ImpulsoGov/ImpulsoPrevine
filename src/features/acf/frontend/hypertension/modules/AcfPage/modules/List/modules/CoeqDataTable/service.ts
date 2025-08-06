"use client";
import type * as schema from "@/features/acf/shared/hypertension/schema";
import type { BodyBuilder } from "@features/acf/frontend/common/DataTable";
import { getPageBuilder } from "@features/acf/frontend/common/DataTable";
import type { HypertensionCoeqAppliedFilters } from "./model";

//TODO: Por algum motivo, retirar estes type hints daqui fazem o typescript
//      ser incapaz de inferir os tipos dos parametros. Em algum momento, é uma boa estudar pq, e tentar tirar de novo.
//      Se essa variável for inlined, a inferência funciona. Coisa de louco.
export const bodyBuilder: BodyBuilder<
    HypertensionCoeqAppliedFilters,
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
                  },
              }
    );
};

export const getCoeqPage = getPageBuilder<
    schema.CoeqPageRequestBody,
    schema.PageResponse,
    HypertensionCoeqAppliedFilters
>("hypertension", "coeq", bodyBuilder);

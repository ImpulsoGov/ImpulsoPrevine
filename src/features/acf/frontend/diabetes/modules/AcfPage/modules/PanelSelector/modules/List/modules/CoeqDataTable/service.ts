"use client";
import type * as schema from "@/features/acf/shared/diabetes/schema";
import type { BodyBuilder } from "@features/acf/frontend/common/DataTable";
import { getPageBuilder } from "@features/acf/frontend/common/DataTable";
import type { AppliedFiltersCoeq } from "./model";

function filtersBuilder(filters: AppliedFiltersCoeq): schema.CoeqFilters {
    return {
        ...filters,
        conditionIdentifiedBy:
            filters.conditionIdentifiedBy === ""
                ? []
                : [filters.conditionIdentifiedBy],
    };
}

//TODO: Por algum motivo, retirar estes type hints daqui fazem o typescript
//      ser incapaz de inferir os tipos dos parametros. Em algum momento, é uma boa estudar pq, e tentar tirar de novo.
//      Se essa variável for inlined, a inferência funciona. Coisa de louco.
const bodyBuilder: BodyBuilder<
    AppliedFiltersCoeq,
    schema.CoeqPageRequestBody
> = (appliedSorting, appliedFilters, searchString) => {
    return Object.assign(
        {},
        !appliedSorting ? {} : { sorting: appliedSorting as schema.CoeqSort },
        !searchString ? {} : { search: searchString },
        !appliedFilters ? {} : { filters: filtersBuilder(appliedFilters) }
    );
};

export const getCoeqPage = getPageBuilder<
    schema.CoeqPageRequestBody,
    schema.PageResponse,
    AppliedFiltersCoeq
>("DIABETES", "coeq", bodyBuilder);

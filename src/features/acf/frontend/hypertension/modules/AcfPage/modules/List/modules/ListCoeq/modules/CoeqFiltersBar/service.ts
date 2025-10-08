"use client";
import { getFiltersBuilder } from "@/features/acf/frontend/common/FiltersBar";
import type * as schema from "@features/acf/shared/diabetes/schema";

export const getFiltersCoeq = getFiltersBuilder<schema.CoeqFiltersResponse>(
    "hypertension",
    "coeq"
);

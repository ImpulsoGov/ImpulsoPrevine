"use client";
import type * as schema from "@/features/acf/shared/hypertension/schema";
import { getFiltersBuilder } from "@/features/acf/frontend/common/FiltersBar";
export const getFiltersCoaps = getFiltersBuilder<schema.CoapsFiltersResponse>(
    "hypertension",
    "coaps"
);

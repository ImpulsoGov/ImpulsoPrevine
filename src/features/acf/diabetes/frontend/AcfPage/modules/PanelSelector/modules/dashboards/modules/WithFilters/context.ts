"use client";
import type { SelectedFilterValues } from "@/features/acf/diabetes/frontend/model";
import { createContext } from "react";

export const FiltersContext = createContext<SelectedFilterValues>(
    {} as SelectedFilterValues
);

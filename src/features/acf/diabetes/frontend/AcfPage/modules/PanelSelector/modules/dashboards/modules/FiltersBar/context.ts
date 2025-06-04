"use client";
import type { SelectedValues } from "@/features/acf/diabetes/frontend/model";
import { createContext } from "react";

export const FiltersContext = createContext<SelectedValues>(
    {} as SelectedValues
);

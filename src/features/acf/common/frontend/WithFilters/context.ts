"use client";
import { createContext } from "react";
import type { AppliedFilters } from "./model";

export const FiltersContext = createContext<AppliedFilters | null>(null);

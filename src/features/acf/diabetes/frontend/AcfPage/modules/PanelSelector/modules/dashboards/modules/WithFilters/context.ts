"use client";
import { createContext } from "react";
import type { PossibleSelectedFilterValues } from "./model";

export const FiltersContext =
    createContext<PossibleSelectedFilterValues | null>(null);

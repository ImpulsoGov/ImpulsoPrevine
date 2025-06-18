"use client";
import type { Context } from "react";
import { createContext } from "react";

export const createFiltersContext = <
    TAppliedFilters,
>(): Context<TAppliedFilters | null> =>
    createContext<TAppliedFilters | null>(null);

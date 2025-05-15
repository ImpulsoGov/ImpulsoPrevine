"use client"
import type { Filters } from "@/features/acf/diabetes/common/model";
import { createContext } from "react";

export const FiltersContext = createContext<Filters>({} as Filters);
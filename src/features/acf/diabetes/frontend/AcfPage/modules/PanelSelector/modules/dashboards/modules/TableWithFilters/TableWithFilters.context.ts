"use client"
import type { FiltersUI } from "@/features/acf/diabetes/common/model";
import { createContext } from "react";

export const FiltersContext = createContext<FiltersUI>({} as FiltersUI);
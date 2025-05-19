"use client"
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import { createContext } from "react";

export const FiltersContext = createContext<FilterItem>({});
"use client";
import type { GridSortModel } from "@mui/x-data-grid";
import { createContext } from "react";

export type SortingModel = {
    gridSortingModel: GridSortModel;
    onSortingModelChange: (newSortModel: GridSortModel) => void;
};

export const SortingContext = createContext<SortingModel>({} as SortingModel);

"use client";
import type { GridSortModel, GridSortItem } from "@mui/x-data-grid";
import { createContext } from "react";
//O campo que define a ordem da ordenação no tipo do x-data-grid se chama sort, por isso decidimos padronizar como sort no lugar de order.
export const DEFAULT_SORTING: GridSortItem = { field: "patientName", sort: "asc" };

export type SortingModel = {
    gridSortingModel: GridSortItem;
    onSortingModelChange: (newSortModel: GridSortModel) => void;
};

export const SortingContext = createContext<SortingModel>({
    gridSortingModel: DEFAULT_SORTING,
    onSortingModelChange: () => {},
});

"use client";
import type { GridSortItem, GridSortModel } from "@mui/x-data-grid";
import { createContext } from "react";

//TODO: Hoje em dia, este tipo não impede que passemos uma coluna inexistente na tabela como field. Em algum momento, isso pode ser um problema.
//      O ideal seria restringir este tipo e só transformar em string na hora de usar no data grid.

//O campo que define a ordem da ordenação no tipo do x-data-grid se chama sort, por isso decidimos padronizar como sort no lugar de order.
//TODO: Este default deveria estar no backend, e não aqui no front. Depois de adaptar lá, precisamos mudar aqui pra se tornar um GridSortItem | null
export const DEFAULT_SORTING: GridSortItem = {
    field: "patientName",
    sort: "asc",
};

export type SortingModel = {
    gridSortingModel: GridSortItem;
    onSortingModelChange: (newSortModel: GridSortModel) => void;
};

export const SortingContext = createContext<SortingModel>({
    gridSortingModel: DEFAULT_SORTING,
    onSortingModelChange: () => {},
});

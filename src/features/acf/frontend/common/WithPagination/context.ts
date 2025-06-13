"use client";
import type { GridPaginationModel } from "@mui/x-data-grid";
import type { DispatchWithoutAction } from "react";
import { createContext, type Dispatch, type SetStateAction } from "react";

export type PaginationModel = {
    gridPaginationModel: GridPaginationModel;
    onPaginationModelChange: Dispatch<SetStateAction<GridPaginationModel>>;
    resetPagination: DispatchWithoutAction;
};

export const PaginationContext = createContext<PaginationModel>(
    {} as PaginationModel
);

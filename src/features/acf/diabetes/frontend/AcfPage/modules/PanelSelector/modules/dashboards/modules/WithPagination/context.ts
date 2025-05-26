"use client";
import type { GridPaginationModel } from "@mui/x-data-grid";
import { createContext, type SetStateAction, type Dispatch } from "react";

export type PaginationModel = {
    gridPaginationModel: GridPaginationModel;
    handlePaginationModelChange: Dispatch<SetStateAction<GridPaginationModel>>;
};

export const PaginationContext = createContext<PaginationModel>(
    {} as PaginationModel
);

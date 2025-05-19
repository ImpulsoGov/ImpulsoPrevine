'use client';
import type { GridPaginationModel } from "@mui/x-data-grid";
import { type Dispatch, type SetStateAction, useState } from "react";
import { DataTable } from "./modules/DataTable";
import { PaginationContext } from "./PaginatedTable.context";

export type PaginationModel = {
    gridPaginationModel: GridPaginationModel;
    onPaginationModelChange: Dispatch<SetStateAction<GridPaginationModel>>;
}

export const PaginatedTable = () => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 8,
    });
    
    return (
        <PaginationContext.Provider value={{ gridPaginationModel: paginationModel, onPaginationModelChange: setPaginationModel }}>
            <DataTable  />
        </PaginationContext.Provider>
    );
};
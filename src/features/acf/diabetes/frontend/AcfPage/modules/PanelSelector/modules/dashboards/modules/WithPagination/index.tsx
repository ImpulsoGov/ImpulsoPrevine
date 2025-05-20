'use client';
import type React from "react";
import type { GridPaginationModel } from "@mui/x-data-grid";
import { type Dispatch, type SetStateAction, useState } from "react";
import { PaginationContext } from "./context";

export type PaginationModel = {
    gridPaginationModel: GridPaginationModel;
    onPaginationModelChange: Dispatch<SetStateAction<GridPaginationModel>>;
}

type WithPaginationProps = React.PropsWithChildren

export const WithPagination = ({
    children,
}: WithPaginationProps) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 8,
    });
    
    return (
        <PaginationContext.Provider value={{ gridPaginationModel: paginationModel, onPaginationModelChange: setPaginationModel }}>
            {children}
        </PaginationContext.Provider>
    );
};
"use client";
import type React from "react";
import type { GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";
import { PaginationContext } from "./context";

export type { PaginationModel } from "./context";

type WithPaginationProps = React.PropsWithChildren;

export const WithPagination: React.FC<WithPaginationProps> = ({
    children,
}: WithPaginationProps) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
        {
            page: 0,
            pageSize: 8,
        }
    );

    return (
        <PaginationContext.Provider
            value={{
                gridPaginationModel: paginationModel,
                onPaginationModelChange: setPaginationModel,
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
};

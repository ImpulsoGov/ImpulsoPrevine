"use client";
import type { GridPaginationModel } from "@mui/x-data-grid";
import type React from "react";
import { useState } from "react";
import { PaginationContext } from "./context";

export type { PaginationModel } from "./context";
export { PaginationContext };

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
    const resetPagination = (): void => {
        console.log("Resetting pagination model");

        setPaginationModel((prevState) => ({
            ...prevState,
            page: 0,
        }));
    };
    return (
        <PaginationContext.Provider
            value={{
                gridPaginationModel: paginationModel,
                onPaginationModelChange: setPaginationModel,
                resetPagination: resetPagination,
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
};

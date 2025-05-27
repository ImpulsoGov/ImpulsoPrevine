"use client";
import type React from "react";
import type { GridSortItem, GridSortModel } from "@mui/x-data-grid";
import { useState } from "react";
import { DEFAULT_SORTING, SortingContext } from "./context";
export type { SortingModel } from "./context";

type WithSortingProps = React.PropsWithChildren;

export const WithSorting: React.FC<WithSortingProps> = ({
    children,
}: WithSortingProps) => {
    const [sorting, setSorting] = useState<GridSortItem>(DEFAULT_SORTING);

    // Essa função usa o estado interno do Datagrid, que é o GridSortModel
    const handleSortModelChange = (
        newSortModel: GridSortModel,
    ): void => {
        if (newSortModel.length > 0) {
            setSorting(newSortModel[0]);
        } else {
            setSorting(DEFAULT_SORTING);
        }
    };

    return (
        <SortingContext.Provider
            value={{
                gridSortingModel: sorting,
                onSortingModelChange: handleSortModelChange,
            }}
        >
            {children}
        </SortingContext.Provider>
    );
};

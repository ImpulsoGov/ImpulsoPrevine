"use client";
import type React from "react";
import type { GridSortModel } from "@mui/x-data-grid";
import { useState } from "react";
import { DEFAULT_SORTING, SortingContext } from "./context";
export type { SortingModel } from "./context";

type WithSortingProps = React.PropsWithChildren;

export const WithSorting: React.FC<WithSortingProps> = ({
    children,
}: WithSortingProps) => {
    const [sorting, setSorting] = useState<GridSortModel>([
        ...DEFAULT_SORTING,
    ]);

    const handleSortModelChangeFunction = (
        newSortModel: GridSortModel,
    ): void => {
        if (newSortModel.length > 0) {
            setSorting([...newSortModel]);
        } else {
            setSorting([...DEFAULT_SORTING]);
        }
    };

    return (
        <SortingContext.Provider
            value={{
                gridSortingModel: sorting,
                onSortingModelChange: handleSortModelChangeFunction,
            }}
        >
            {children}
        </SortingContext.Provider>
    );
};

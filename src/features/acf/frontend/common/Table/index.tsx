import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import type {
    GridCallbackDetails,
    GridColDef,
    GridColumnGroupingModel,
    GridFeatureMode,
    GridPaginationModel,
    GridSortModel,
} from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";

import { sx } from "./sx";
import type { AcfItem } from "@/features/acf/shared/schema";
import type { SystemStyleObject } from "@mui/system";

export type TableProps = {
    columns: Array<GridColDef>;
    data: Array<AcfItem>;
    paginationMode?: GridFeatureMode;
    sortingMode?: GridFeatureMode;
    rowCount?: number;
    paginationModel?: GridPaginationModel;
    onPaginationModelChange?: (
        model: GridPaginationModel,
        details: GridCallbackDetails
    ) => void;
    onSortModelChange?: (
        model: GridSortModel,
        details: GridCallbackDetails
    ) => void;
    isLoading?: boolean;
    noRowsContent?: React.ReactNode;
    sortModel?: GridSortModel;
    slots?: object;
    customSx?: SystemStyleObject;
    columnGroupingModel?: GridColumnGroupingModel;
};

export const Table: React.FC<TableProps> = ({
    columns,
    data,
    isLoading = false,
    noRowsContent = "Nenhum registro para exibir",
    columnGroupingModel,
    customSx = {},
    ...props
}) => {
    const rowsWithID = data.map((row: AcfItem, index: number) => ({
        ...row,
        id: index,
    }));
    return (
        <>
            <div>
                <DataGrid
                    rows={rowsWithID}
                    columns={columns}
                    disableColumnMenu
                    columnGroupingModel={columnGroupingModel}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 8 } },
                    }}
                    getRowId={(row: AcfItem & { id: number }) => row.id}
                    getRowHeight={() => "auto"}
                    columnHeaderHeight={85}
                    columnGroupHeaderHeight={56}
                    localeText={
                        ptBR.components.MuiDataGrid.defaultProps.localeText
                    }
                    sx={{ ...sx, ...customSx }}
                    loading={isLoading}
                    slots={{
                        noRowsOverlay: () => noRowsContent,
                    }}
                    {...props}
                />
            </div>
        </>
    );
};

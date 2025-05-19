'use client';
import type { GridPaginationModel } from "@mui/x-data-grid";
import { type Dispatch, type SetStateAction, useState } from "react";
import { DataTable } from "./modules/DataTable";
import type { AcfDashboardType } from "@/features/acf/diabetes/common/model";
import { PaginationContext } from "./PaginatedTable.context";

type PaginatedTableProps = {
    acfDashboardType: AcfDashboardType;
}

export type PaginationModel = {
    gridPaginationModel: GridPaginationModel;
    onPaginationModelChange: Dispatch<SetStateAction<GridPaginationModel>>;
}

export const PaginatedTable = ({
    acfDashboardType,
}: PaginatedTableProps) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 8,
    });
    
    return (
        //TODO: Trocar diabetesColumns quando tivermos novas listas
        <PaginationContext.Provider value={{ gridPaginationModel: paginationModel, onPaginationModelChange: setPaginationModel }}>
            <DataTable 
            acfDashboardType={acfDashboardType} 
            onPaginationModelChange={setPaginationModel} />
        </PaginationContext.Provider>
    );
};
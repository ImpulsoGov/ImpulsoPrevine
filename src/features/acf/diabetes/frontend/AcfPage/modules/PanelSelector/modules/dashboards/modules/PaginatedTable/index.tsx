'use client';
import type { GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";
import { DataTable } from "./modules/DataTable";
import type { AcfDashboardType } from "@/features/acf/diabetes/common/model";

type PaginatedTableProps = {
    acfDashboardType: AcfDashboardType;
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
        <DataTable
            acfDashboardType={acfDashboardType}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
        />
    );
};
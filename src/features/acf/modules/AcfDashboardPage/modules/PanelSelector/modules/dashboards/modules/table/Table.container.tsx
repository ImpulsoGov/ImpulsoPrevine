import { PaginatedTable } from "./Table.presentation";
import type { GridPaginationModel } from "@mui/x-data-grid";
import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";
import { tableDataHook } from "./Table.hook";
import { useState } from "react";

type TableContainerProps = {
    acfDashboardType: AcfDashboardType;
};

export const TableContainer = ({ 
    acfDashboardType 
}: TableContainerProps
) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 8,
    });
    const { response, isLoading } = tableDataHook(acfDashboardType, paginationModel);
    return (
        <PaginatedTable
            response={response}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            isLoading={isLoading}
        />
    );
}
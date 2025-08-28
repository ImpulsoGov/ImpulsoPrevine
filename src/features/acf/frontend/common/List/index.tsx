"use client";
// import { ToolBarMounted } from "@/componentes/mounted/lista-nominal/ToolBarMounted";
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import type { GridSortModel } from "@mui/x-data-grid";
// import { clearFiltersArgs } from "./modules/filters/clearFiltersArgs";
// import { urlSearchParamsHook } from "./modules/urlSearchParams.hook";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
// import { buildPrintProps } from "./modules/print/buildPrintProps";

// Adicionar união de valores quando soubermos as listas que teremos
export type ListProps = {
    list: AcfDashboardType;
    // title: string;
};
export type PrintStatesType = {
    value: FilterItem;
    list: AcfDashboardType;
    sorting: GridSortModel;
    search: string;
};

export const List: React.FC<React.PropsWithChildren<ListProps>> = ({
    children,
}) => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "35px",
                    padding: "0px 0px 150px 0px",
                    marginTop: "50px",
                }}
            >
                {children}
            </div>
            {/* {
                user &&
                <PrintModal
                    isPrintModalVisible={isPrintModalVisible}
                    closePrintModal={closePrintModal}
                    handleCostumizePrint={handleCostumizePrint}
                    userProfiles={user.perfis}
                />
            } */}
        </>
    );
};

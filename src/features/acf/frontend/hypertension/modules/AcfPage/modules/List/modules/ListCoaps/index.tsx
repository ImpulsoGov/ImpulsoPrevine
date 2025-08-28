"use client";
export { ContentCoaps } from "./container";
export type { CoapsAppliedFilters } from "./modules/CoapsDataTable";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import { PrintModal } from "@/features/acf/frontend/common/PrintModal";
import { PrintTable } from "@/features/acf/frontend/common/Print";
import { coapsColumns } from "./modules/CoapsDataTable";
import { apsLabelsModal } from "./modules/Print/consts";
import { getCoapsData } from "./modules/Print/service";

export type ListProps = {
    list: AcfDashboardType;
    // title: string;
};

export const ListCoaps: React.FC<React.PropsWithChildren<ListProps>> = ({
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
            <PrintModal modalLabels={apsLabelsModal}>
                <PrintTable
                    columns={coapsColumns}
                    serviceGetData={getCoapsData}
                    // customization={customization}

                    // {...customization} ref={ref}
                />
            </PrintModal>
        </>
    );
};

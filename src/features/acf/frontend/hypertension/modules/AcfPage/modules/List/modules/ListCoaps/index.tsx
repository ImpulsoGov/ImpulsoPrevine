"use client";
export { ContentCoaps } from "./container";
export type { CoapsAppliedFilters } from "./modules/CoapsDataTable";
import type { AcfDashboardType } from "@/features/acf/frontend/common/AcfDashboard";

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
        </>
    );
};

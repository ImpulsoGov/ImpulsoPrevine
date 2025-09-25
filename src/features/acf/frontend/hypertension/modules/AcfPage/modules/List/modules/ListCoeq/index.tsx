"use client";
export { ContentCoeq } from "./container";
export type { CoeqAppliedFilters } from "./modules/CoeqDataTable";
import type { AcfDashboardType } from "@/features/acf/frontend/common/AcfDashboard";
export type ListProps = {
    list: keyof AcfDashboardType;
    // title: string;
};

export const ListCoeq: React.FC<React.PropsWithChildren<ListProps>> = ({
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

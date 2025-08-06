"use client";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";

export type ListProps = {
    list: AcfDashboardType;
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
                    marginTop: "75px",
                }}
            >
                {children}
            </div>
        </>
    );
};

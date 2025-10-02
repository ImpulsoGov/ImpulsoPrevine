"use client";
export { ContentCoaps } from "./container";
export type { CoapsAppliedFilters } from "./modules/CoapsDataTable";

export const ListCoaps: React.FC<React.PropsWithChildren> = ({ children }) => {
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

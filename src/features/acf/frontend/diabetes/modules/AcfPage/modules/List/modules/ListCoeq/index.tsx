"use client";
export { ContentCoeq } from "./container";
export type { CoeqAppliedFilters } from "./modules/CoeqDataTable";

export const ListCoeq: React.FC<React.PropsWithChildren> = ({ children }) => {
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

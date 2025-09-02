import type { PropsWithChildren } from "react";
import React from "react";

export type NoSplitProps = PropsWithChildren;

export const NoSplit: React.FC<NoSplitProps> = ({ children }) => {
    return (
        <div
            style={{
                marginBottom: "30px",
                pageBreakAfter: "always",
                pageBreakInside: "avoid",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            {children}
        </div>
    );
};

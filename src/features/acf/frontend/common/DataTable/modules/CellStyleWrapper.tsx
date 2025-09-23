import type { PropsWithChildren } from "react";

export const CellStyleWrapper: React.FC<PropsWithChildren> = ({ children }) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
        }}
    >
        {children}
    </div>
);

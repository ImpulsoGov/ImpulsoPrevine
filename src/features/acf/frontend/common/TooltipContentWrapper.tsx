import type { PropsWithChildren } from "react";

export const TooltipContentWrapper: React.FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <div
            style={{
                fontSize: "16px",
            }}
        >
            {children}
        </div>
    );
};

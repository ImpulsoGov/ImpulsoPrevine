import type { PropsWithChildren } from "react";

export type PrintTableProps = PropsWithChildren<{
    ref: React.RefObject<HTMLDivElement | null>;
}>;

export const PrintTable = ({
    ref,
    children,
}: PrintTableProps): React.ReactNode => {
    return (
        <div
            key="print-table"
            className="largura"
            ref={ref}
            style={{
                display: "none",
                fontFamily: `Inter, sans-serif`,
            }}
        >
            {children}
        </div>
    );
};

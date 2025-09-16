import { useEffect, type PropsWithChildren } from "react";
import { Print } from "../../RenderPrint";

export type PrintTableProps = PropsWithChildren<{
    ref: React.RefObject<HTMLDivElement | null>;
    setShouldRenderPrintTable: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export const PrintTable = ({
    ref,
    children,
    setShouldRenderPrintTable,
}: PrintTableProps): React.ReactNode => {
    useEffect(() => {
        if (ref.current?.innerHTML) {
            const htmlString = ref.current.innerHTML;
            if (htmlString.length > 0) {
                Print(htmlString);
                setShouldRenderPrintTable(false);
            }
        }
    }, []);
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

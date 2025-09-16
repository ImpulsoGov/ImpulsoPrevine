import { useEffect, useRef, type PropsWithChildren } from "react";
import { Print } from "../../RenderPrint";

export type PrintTableProps = PropsWithChildren<{
    setShouldRenderPrintTable: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export const PrintTable = ({
    children,
    setShouldRenderPrintTable,
}: PrintTableProps): React.ReactNode => {
    const ref = useRef<HTMLDivElement>(null);

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

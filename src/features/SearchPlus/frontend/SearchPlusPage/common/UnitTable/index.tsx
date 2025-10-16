import { Thead } from "./modules/Thead";
import { TableCell } from "./modules/TableCell";
import type { LayoutOrientation } from "./model";
import type { ColumnsProps, SearchPlusItem } from "../carePathways";

export type UnitTableProps<TSearchPlusItem extends SearchPlusItem> = {
    data: Array<TSearchPlusItem>;
    columns: Array<ColumnsProps<TSearchPlusItem>>;
    layoutOrientation: LayoutOrientation;
    tableRef: React.RefObject<HTMLDivElement | null>;
};

export const UnitTable = <TSearchPlusItem extends SearchPlusItem>({
    data,
    columns,
    layoutOrientation,
    tableRef,
}: UnitTableProps<TSearchPlusItem>): React.ReactNode => {
    return (
        <div
            ref={tableRef}
            className={
                layoutOrientation === "landscape" ? "landscape" : "portrait"
            }
            style={{
                display: layoutOrientation === "landscape" ? "block" : "none",
            }}
        >
            <table
                style={{
                    borderCollapse: "collapse",
                    color: "#1F1F1F",
                    textAlign: "center",
                    fontSize: "10px",
                    fontFamily: `Inter, sans-serif`,
                    letterSpacing: "-0.12px",
                    width: "fit-content",
                    marginBottom: "10px",
                }}
            >
                <Thead
                    columns={columns}
                    layoutOrientation={layoutOrientation}
                />
                <tbody>
                    {Array.isArray(data) &&
                        data.map((item, index) => (
                            <tr
                                key={`row-${index.toString()}`}
                                style={{
                                    borderBottom: "solid 1px #757574",
                                }}
                            >
                                <TableCell
                                    item={item}
                                    columns={columns}
                                    layoutOrientation={layoutOrientation}
                                />
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

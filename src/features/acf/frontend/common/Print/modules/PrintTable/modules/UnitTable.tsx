import { Thead } from "./Thead";
import { TableCell } from "./TableCell";
import type { AcfItem } from "@/features/acf/shared/schema";
import type { ColumnsProps, LayoutOrientation } from "../model";

export type UnitTableProps<TAcfItem extends AcfItem> = {
    data: Array<TAcfItem>;
    columns: Array<ColumnsProps<TAcfItem>>;
    layoutOrientation: LayoutOrientation;
};

export const UnitTable = <TAcfItem extends AcfItem>({
    data,
    columns,
    layoutOrientation,
}: UnitTableProps<TAcfItem>): React.ReactNode => {
    return (
        <div
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
                    textTransform: "uppercase",
                    width: "fit-content",
                    marginBottom: "10px",
                }}
            >
                <Thead
                    columns={columns}
                    layoutOrientation={layoutOrientation}
                />
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            data-testid="LinhaTabelaUnitaria"
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

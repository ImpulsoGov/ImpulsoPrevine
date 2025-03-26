import type { DataItem } from "@/utils/FilterData";
import type { GridColDef } from "@mui/x-data-grid";
import { Thead } from "./Thead";
import { TableCell } from "./TableCell";
import { simpleHash } from "@helpers/lista-nominal/impressao/simpleHash";

import type { CSSProperties } from "react";

export type ExtendedGridColDef = GridColDef & {
    headerComplement?: string;
    visibleHeaderComplement?: boolean;
    wordBreak?: CSSProperties["wordBreak"];
};

export type UnitTableProps = {
    data: DataItem[];
    columns: ExtendedGridColDef[];
    fontFamily?: string;
    verticalDivider: number[];
    columnsWidth: Record<string, string>;
    layoutOrientation: "landscape" | "portrait";
    auxiliaryLists?: Record<string, Record<string, string>>;
};

export const UnitTable = ({
    data,
    columns,
    fontFamily = "sans-serif",
    verticalDivider,
    columnsWidth,
    layoutOrientation,
    auxiliaryLists,
}: UnitTableProps) => {
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
                    fontFamily: `${fontFamily}, sans-serif`,
                    letterSpacing: "-0.12px",
                    textTransform: "uppercase",
                    width: "fit-content",
                    marginBottom: "10px",
                }}
            >
                <Thead
                    columns={columns}
                    columnsWidth={columnsWidth}
                    verticalDivider={verticalDivider}
                />
                <tbody>
                    {data.map((item) => (
                        <tr
                            data-testid="LinhaTabelaUnitaria"
                            key={simpleHash(JSON.stringify(item))}
                            style={{
                                borderBottom: "solid 1px #757574",
                            }}
                        >
                            <TableCell
                                item={item}
                                columns={columns}
                                columnsWidth={columnsWidth}
                                verticalDivider={verticalDivider}
                                layoutOrientation={layoutOrientation}
                                auxiliaryLists={auxiliaryLists}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

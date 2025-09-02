import { Thead } from "./Thead";
import { TableCell } from "./TableCell";
import type { AllPagesResponses } from "@/features/acf/shared/schema";
import type { ColumnsProps, LayoutOrientation } from "../model";

export type UnitTableProps<TResponse extends AllPagesResponses> = {
    data: TResponse;
    columns: Array<ColumnsProps>;
    layoutOrientation: LayoutOrientation;
};

export const UnitTable = <TResponse extends AllPagesResponses>({
    data,
    columns,
    layoutOrientation,
}: UnitTableProps<TResponse>): React.ReactNode => {
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

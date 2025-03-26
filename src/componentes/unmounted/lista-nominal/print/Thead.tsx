import type { ExtendedGridColDef } from "./UnitTable";

export type TheadProps = {
    columns: ExtendedGridColDef[];
    verticalDivider: number[];
    columnsWidth: Record<string, string>;
};

const paddingCalc = (verticalDivider: number[], index: number) =>
    [...verticalDivider.map((item) => item + 1), 0].includes(index)
        ? "5px 5px 5px 12px"
        : "5px";

export const Thead = ({
    columns,
    columnsWidth,
    verticalDivider,
}: TheadProps) => (
    <thead>
        <tr
            className="largura"
            style={{
                backgroundColor: "#E7E7E7",
                marginTop: "82px",
                borderBottom: "solid 1px #757574",
            }}
        >
            {columns.map((column, index) => {
                return (
                    <th
                        style={{
                            padding: paddingCalc(verticalDivider, index),
                            width: columnsWidth[column.field],
                            borderTopLeftRadius: index !== 0 ? "0" : "8px",
                            borderTopRightRadius:
                                index !== columns.length - 1 ? "0" : "8px",
                            borderBottomLeftRadius: index !== 0 ? "0" : "8px",
                            borderBottomRightRadius:
                                index !== columns.length - 1 ? "0" : "8px",
                            borderRight: verticalDivider.includes(index)
                                ? "solid 1px #757574"
                                : "",
                            textAlign: "left",
                            boxSizing: "border-box",
                        }}
                        key={`${column.headerName ?? "defaultHeaderName"}${index}`}
                    >
                        {column.headerComplement && (
                            <div
                                style={{
                                    marginBottom: "6px",
                                    visibility: column.visibleHeaderComplement
                                        ? "visible"
                                        : "hidden",
                                }}
                            >
                                {column.headerComplement}
                            </div>
                        )}

                        <div>{column.headerName}</div>
                    </th>
                );
            })}
        </tr>
    </thead>
);

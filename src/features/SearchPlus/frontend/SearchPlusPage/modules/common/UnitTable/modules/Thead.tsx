import type { ColumnsProps } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import type { LayoutOrientation } from "../model";
import React from "react";

export type TheadProps = {
    columns: Array<ColumnsProps>;
    layoutOrientation: LayoutOrientation;
};

const DefaultHeader = ({
    headerName,
}: {
    headerName: string;
}): React.JSX.Element => {
    return <div style={{ whiteSpace: "pre-line" }}>{headerName}</div>;
};

export const Thead = ({
    columns,
    layoutOrientation,
}: TheadProps): React.ReactNode => (
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
                            padding: column.verticalDivider
                                ? "5px 5px 5px 12px"
                                : "5px",
                            width: column.width[layoutOrientation],
                            borderTopLeftRadius: index !== 0 ? "0" : "8px",
                            borderTopRightRadius:
                                index !== columns.length - 1 ? "0" : "8px",
                            borderBottomLeftRadius: index !== 0 ? "0" : "8px",
                            borderBottomRightRadius:
                                index !== columns.length - 1 ? "0" : "8px",
                            borderRight: column.verticalDivider
                                ? "solid 1px #757574"
                                : "",
                            textAlign: "left",
                            boxSizing: "border-box",
                        }}
                        key={`Thead-${index.toString()}`}
                    >
                        {column.renderHeader ? (
                            column.renderHeader()
                        ) : (
                            <DefaultHeader
                                headerName={column.headerName ?? ""}
                            />
                        )}
                    </th>
                );
            })}
        </tr>
    </thead>
);

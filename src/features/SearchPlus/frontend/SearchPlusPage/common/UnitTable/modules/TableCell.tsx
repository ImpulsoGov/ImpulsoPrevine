import type { ColumnsProps, SearchPlusItem } from "../../ResultContent";
import type { LayoutOrientation } from "../model";
import React from "react";

export type TableCellProps<TSearchPlusItem extends SearchPlusItem> = {
    item: TSearchPlusItem;
    columns: Array<ColumnsProps<TSearchPlusItem>>;
    layoutOrientation: LayoutOrientation;
};

export const TableCell = <TSearchPlusItem extends SearchPlusItem>({
    item,
    columns,
    layoutOrientation,
}: TableCellProps<TSearchPlusItem>): React.ReactNode => {
    return columns.map((column, index) => {
        return (
            <td
                key={index}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "left",
                    width: column.width[layoutOrientation],
                    padding: column.verticalDivider
                        ? "4px 4px 4px 12px"
                        : "4px",
                    borderRight: column.verticalDivider
                        ? "solid 1px #757574"
                        : "",
                    boxSizing: "border-box",
                    lineHeight: "140%",
                    minHeight: "24px",
                    wordBreak: "break-word",
                    breakInside: "avoid",
                }}
            >
                <>
                    {column.renderCell
                        ? column.renderCell(
                              column.fields.map(
                                  (field: keyof typeof item) => item[field]
                              )
                          )
                        : column.fields.map((field, index) => (
                              <div key={index}>
                                  <>{item[field]}</>
                              </div>
                          ))}
                </>
            </td>
        );
    });
};

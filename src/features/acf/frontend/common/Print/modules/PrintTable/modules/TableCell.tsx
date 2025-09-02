import type { AcfItem } from "@/features/acf/shared/schema";
import type { ColumnsProps, LayoutOrientation } from "../model";
import React from "react";

export type TableCellProps<TAcfItem extends AcfItem> = {
    item: TAcfItem;
    columns: Array<ColumnsProps<TAcfItem>>;
    layoutOrientation: LayoutOrientation;
};

export const TableCell = <TAcfItem extends AcfItem>({
    item,
    columns,
    layoutOrientation,
}: TableCellProps<TAcfItem>): React.ReactNode => {
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

import type { ColumnsProps } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import type { LayoutOrientation } from "../model";
import React from "react";
import type { BreastAndUterusCareItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/BreastAndUterusCare";
import type { PregnancyAndPuerperiumCareItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare";

export type TableRowProps = {
    item: BreastAndUterusCareItem | PregnancyAndPuerperiumCareItem;
    columns: Array<ColumnsProps>;
    layoutOrientation: LayoutOrientation;
};

export const TableRow = ({
    item,
    columns,
    layoutOrientation,
}: TableRowProps): React.ReactNode => {
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
                                  (field) =>
                                      item[
                                          field as keyof (
                                              | BreastAndUterusCareItem
                                              | PregnancyAndPuerperiumCareItem
                                          )
                                      ]
                              )
                          )
                        : column.fields.map((field, index) => (
                              <div key={index}>
                                  <>
                                      {
                                          item[
                                              field as keyof (
                                                  | BreastAndUterusCareItem
                                                  | PregnancyAndPuerperiumCareItem
                                              )
                                          ]
                                      }
                                  </>
                              </div>
                          ))}
                </>
            </td>
        );
    });
};

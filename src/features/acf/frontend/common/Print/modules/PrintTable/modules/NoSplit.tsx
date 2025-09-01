// import { UnitTable } from "./UnitTable";
import type { DataResponses } from "@/features/acf/shared/schema";
// import type { ExtendedGridColDef } from "./UnitTable";
import type { AxiosResponse, AxiosError } from "axios";
import type { PropsWithChildren } from "react";
import React from "react";

export type NoSplitProps = PropsWithChildren<{
    data?: AxiosResponse<DataResponses> | AxiosError | null;
    table?: {
        // columns: Array<ExtendedGridColDef>;
        verticalDivider: Array<number>;
        printColumnsWidth: {
            landscape: Record<string, string>;
            portrait: Record<string, string>;
        };
    };
}>;

export const NoSplit: React.FC<NoSplitProps> = ({
    // data,
    // header,
    // table,
    // fontFamily = "sans-serif",
    // printLegend,
    children,
}) => {
    return (
        <div
            style={{
                marginBottom: "30px",
                pageBreakAfter: "always",
                pageBreakInside: "avoid",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            {children}
            {/* <UnitTable
                data={data}
                columns={table.columns}
                auxiliaryLists={table.auxiliaryLists}
                verticalDivider={table.verticalDivider}
                fontFamily={fontFamily}
                columnsWidth={table.printColumnsWidth.landscape}
                layoutOrientation="landscape"
            />
            <UnitTable
                data={data}
                columns={table.columns}
                auxiliaryLists={table.auxiliaryLists}
                verticalDivider={table.verticalDivider}
                fontFamily={fontFamily}
                columnsWidth={table.printColumnsWidth.portrait}
                layoutOrientation="portrait"
            /> */}
        </div>
    );
};

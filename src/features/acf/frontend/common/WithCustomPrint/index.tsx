"use client";
import type { ReactNode } from "react";
import React, { useState } from "react";
import { CustomPrintContext, type CustomPrintState } from "./context";
import type { SortCallback } from "../Print/modules/PrintTable/model";

type WithCustomPrintProps<TItem> = React.PropsWithChildren<{
    orderGroup: SortCallback<TItem>;
}>;
export { CustomPrintContext };

export const WithCustomPrint = <TItem,>({
    orderGroup,
    children,
}: WithCustomPrintProps<TItem>): ReactNode => {
    const [customization, setCustomization] = useState<CustomPrintState<TItem>>(
        {
            grouping: true,
            splitGroupPerPage: false,
            order: false,
            orderGroup,
        }
    );

    return (
        <CustomPrintContext.Provider
            value={{ customization, setCustomization }}
        >
            {children}
        </CustomPrintContext.Provider>
    );
};

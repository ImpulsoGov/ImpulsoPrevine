"use client";
import type { ReactNode } from "react";
import React, { useState } from "react";
import { CustomPrintContext, type CustomPrintState } from "./context";
import type { SortCallback } from "../Print/modules/PrintTable/model";

type WithCustomPrintProps = React.PropsWithChildren<{
    orderGroup: SortCallback<string>;
}>;
export { CustomPrintContext };

export const WithCustomPrint = ({
    orderGroup,
    children,
}: WithCustomPrintProps): ReactNode => {
    const [customization, setCustomization] = useState<CustomPrintState>({
        grouping: true,
        splitGroupPerPage: false,
        order: false,
        orderGroup,
    });

    return (
        <CustomPrintContext.Provider
            value={{ customization, setCustomization }}
        >
            {children}
        </CustomPrintContext.Provider>
    );
};

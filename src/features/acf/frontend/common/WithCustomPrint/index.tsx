"use client";
import React, { useState } from "react";
import { CustomPrintContext, type CustomPrintState } from "./context";

type WithCustomPrintProps = React.PropsWithChildren;
export { CustomPrintContext };
export const WithCustomPrint: React.FC<WithCustomPrintProps> = ({
    children,
}) => {
    const [customization, setCustomization] = useState<CustomPrintState>({
        grouping: true,
        splitGroupPerPage: false,
        order: false,
    });

    return (
        <CustomPrintContext.Provider
            value={{ customization, setCustomization }}
        >
            {children}
        </CustomPrintContext.Provider>
    );
};

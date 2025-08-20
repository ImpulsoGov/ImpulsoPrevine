"use client";
import React, { useState } from "react";
import { CustomPrintContext, type CustomPrintState } from "./context";
import { groupedValues, type GroupedValuesType } from "../PrintModal/consts";

type WithCustomPrintProps = React.PropsWithChildren<GroupedValuesType>;

export const WithCustomPrint: React.FC<WithCustomPrintProps> = ({
    children,
}) => {
    const [customization, setCustomization] = useState<CustomPrintState>({
        grouping: groupedValues.yes,
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

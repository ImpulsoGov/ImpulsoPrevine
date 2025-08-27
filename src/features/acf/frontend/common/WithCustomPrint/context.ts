"use client";
import { createContext, type Dispatch, type SetStateAction } from "react";

export type CustomPrintState = {
    grouping: boolean;
    splitGroupPerPage: boolean;
    order: boolean;
};

export type CustomPrintContextType = {
    customization: CustomPrintState;
    setCustomization: Dispatch<SetStateAction<CustomPrintState>>;
};

export const CustomPrintContext = createContext<CustomPrintContextType>({
    customization: {
        grouping: true,
        splitGroupPerPage: false,
        order: false,
    },
    setCustomization: () => {},
});

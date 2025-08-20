"use client";
import { createContext } from "react";

export type CustomPrintState = {
    grouping: string;
    splitGroupPerPage: boolean;
    order: boolean;
};

export type CustomPrintContextType = {
    customization: CustomPrintState;
    setCustomization: React.Dispatch<React.SetStateAction<CustomPrintState>>;
};

export const CustomPrintContext = createContext<
    CustomPrintContextType | undefined
>(undefined);

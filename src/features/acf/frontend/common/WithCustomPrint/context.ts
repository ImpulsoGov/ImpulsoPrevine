"use client";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { SortCallback } from "../Print/modules/PrintTable/model";

export type CustomPrintState = {
    grouping: boolean;
    splitGroupPerPage: boolean;
    order: boolean;
    orderGroup: SortCallback<string>;
};

export type CustomPrintContextType = {
    customization: CustomPrintState;
    setCustomization: Dispatch<SetStateAction<CustomPrintState>>;
};

export const defaultCustomization = {
    grouping: true,
    splitGroupPerPage: false,
    order: false,
    orderGroup: (): number => 0,
};
export const CustomPrintContext = createContext<CustomPrintContextType>({
    customization: {
        grouping: true,
        splitGroupPerPage: false,
        order: false,
        orderGroup: () => 0,
    },
    setCustomization: () => {},
});

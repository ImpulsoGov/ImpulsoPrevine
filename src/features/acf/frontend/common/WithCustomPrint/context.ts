"use client";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { SortCallback } from "../Print/modules/PrintTable/model";

export type CustomPrintState<TItem> = {
    grouping: boolean;
    splitGroupPerPage: boolean;
    order: boolean;
    orderGroup: SortCallback<TItem>;
};

export type CustomPrintContextType<TItem> = {
    customization: CustomPrintState<TItem>;
    setCustomization: Dispatch<SetStateAction<CustomPrintState<TItem>>>;
};

export const CustomPrintContext = createContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CustomPrintContextType<any>
>({
    customization: {
        grouping: true,
        splitGroupPerPage: false,
        order: false,
        orderGroup: () => 0,
    },
    setCustomization: () => {},
});

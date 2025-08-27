"use client";
import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export type WithPrintModalContextType = {
    isPrintModalVisible: boolean;
    setIsPrintModalVisible: Dispatch<SetStateAction<boolean>>;
};

export const WithPrintModalContext = createContext<WithPrintModalContextType>({
    isPrintModalVisible: false,
    setIsPrintModalVisible: () => {},
});

"use client";
import type React from "react";
import { useState } from "react";
import { WithPrintModalContext } from "./context";

export { WithPrintModalContext };

type WithPrintModalProps = React.PropsWithChildren;

export const WithPrintModal: React.FC<WithPrintModalProps> = ({ children }) => {
    const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
    return (
        <>
            <WithPrintModalContext.Provider
                value={{
                    isPrintModalVisible: isPrintModalVisible,
                    setIsPrintModalVisible: setIsPrintModalVisible,
                }}
            >
                {children}
            </WithPrintModalContext.Provider>
        </>
    );
};

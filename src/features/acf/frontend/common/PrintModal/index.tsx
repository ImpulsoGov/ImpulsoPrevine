"use client";
import { ModalAlertControlled } from "@impulsogov/design-system";
import type { ModalLabels } from "./model";
import { type PropsWithChildren, useContext } from "react";
import { CustomPrint } from "./modules/CustomPrint";
import { WithPrintModalContext } from "../WithPrintModal";

export { ModalLabels };

type PrintModalProps = PropsWithChildren<{
    modalLabels: ModalLabels;
    ref: React.RefObject<HTMLDivElement | null>;
}>;

export const PrintModal = ({
    modalLabels,
    ref,
    children,
}: PrintModalProps): React.ReactNode => {
    const { isPrintModalVisible, setIsPrintModalVisible } = useContext(
        WithPrintModalContext
    );
    const closePrintModal = (): void => {
        setIsPrintModalVisible(false);
    };

    if (isPrintModalVisible)
        return (
            <div
                style={{
                    position: "absolute",
                    left: 0,
                }}
            >
                <ModalAlertControlled display={true} close={closePrintModal}>
                    <CustomPrint
                        labels={modalLabels}
                        handleClose={closePrintModal}
                        ref={ref}
                    >
                        {children}
                    </CustomPrint>
                </ModalAlertControlled>
            </div>
        );
};

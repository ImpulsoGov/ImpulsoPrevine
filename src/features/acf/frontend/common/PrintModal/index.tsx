"use client";
import { ModalAlertControlled } from "@impulsogov/design-system";
import type { ModalLabels } from "./model";
import { type PropsWithChildren, useContext } from "react";
import { CustomPrint } from "./modules/CustomPrint";
import { WithPrintModalContext } from "../WithPrintModal";

type PrintModalProps = PropsWithChildren<{
    modalLabels: ModalLabels;
}>;

export const PrintModal = ({
    modalLabels,
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
                <ModalAlertControlled
                    display={isPrintModalVisible}
                    close={closePrintModal}
                >
                    <CustomPrint
                        labels={modalLabels}
                        handleClose={closePrintModal}
                    >
                        {children}
                    </CustomPrint>
                </ModalAlertControlled>
            </div>
        );
};

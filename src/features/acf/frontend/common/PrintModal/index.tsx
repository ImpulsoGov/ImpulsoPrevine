"use client";
import { ModalAlertControlled } from "@impulsogov/design-system";
import type { ModalLabels } from "./model";
import { useContext } from "react";
import { CustomPrint } from "./modules/CustomPrint";
import { WithPrintModalContext } from "../WithPrintModal";

type PrintModalProps = {
    modalLabels: ModalLabels;
};

export const PrintModal: React.FC<PrintModalProps> = ({ modalLabels }) => {
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
                    />
                </ModalAlertControlled>
            </div>
        );
};

"use client";
import { ModalAlertControlled } from "@impulsogov/design-system";
import type { ModalLabels } from "./model";
import { useState } from "react";
import { CustomPrint } from "./modules/CustomPrint";

type PrintModalProps = {
    modalLabels: ModalLabels;
};

export const PrintModal: React.FC<PrintModalProps> = ({ modalLabels }) => {
    const [isPrintModalVisible, setIsPrintModalVisible] = useState(true);
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

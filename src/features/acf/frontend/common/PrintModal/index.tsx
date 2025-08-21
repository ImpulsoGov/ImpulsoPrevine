"use client";
import { ModalAlertControlled } from "@impulsogov/design-system";
// import type { ModalLabels } from "./model";
// import { groupedValues } from "./consts";
import { Print } from "../Print";
// import type { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { CustomPrint } from "./modules/CustomPrint";

type PrintModalProps = {
    // modalLabels: ModalLabels;
    stringComponent: string;
    // columns: Array<GridColDef>,
    // service: any
};

export const PrintModal: React.FC<PrintModalProps> = ({
    // modalLabels,
    stringComponent,
    // columns,
    // service
}) => {
    const [isPrintModalVisible, setIsPrintModalVisible] = useState(true);
    const closePrintModal = (): void => {
        setIsPrintModalVisible(false);
    };
    // const onPrintClick = (): void => {Print(columns, service)};
    const onPrintClick = (): void => {
        Print(stringComponent);
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
                        // labels={modalLabels}
                        onPrintClick={onPrintClick}
                        // handleClose={closePrintModal}
                        // groupedValues={groupedValues}
                    />
                </ModalAlertControlled>
            </div>
        );
};

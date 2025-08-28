"use client";
import { ModalAlertControlled } from "@impulsogov/design-system";
import type { ModalLabels } from "./model";
import { useContext } from "react";
import { CustomPrint } from "./modules/CustomPrint";
import { WithPrintModalContext } from "../WithPrintModal";
import type { GridColDef } from "@mui/x-data-grid";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters/model";
import type { PageResponses } from "@/features/acf/shared/schema";
import type { ServiceGetPage } from "../DataTable";

type PrintModalProps<
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponses,
> = {
    modalLabels: ModalLabels;
    columns: Array<GridColDef>;
    serviceGetPage: ServiceGetPage<TAppliedFilters, TResponse>;
};

export const PrintModal = <
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponses,
>({
    modalLabels,
    columns,
    serviceGetPage,
}: PrintModalProps<TAppliedFilters, TResponse>): React.ReactNode => {
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
                        columns={columns}
                        serviceGetPage={serviceGetPage}
                    />
                </ModalAlertControlled>
            </div>
        );
};

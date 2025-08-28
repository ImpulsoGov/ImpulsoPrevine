import React, { useContext, useRef } from "react";
import { ButtonColorSubmitIcon } from "@impulsogov/design-system";
import style from "./CustomPrint.module.css";
//TODO: Ajustar imports relativos
import type { ModalLabels } from "../../model";
import { CustomPrintContext } from "../../../WithCustomPrint/context";
import { Print } from "../../../Print/RenderPrint";
import { PrintModalContent } from "./modules/PrintModalContent";
import { PrintTable } from "../../../Print/modules/PrintTable";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import type { PageResponses } from "@/features/acf/shared/schema";
import type { GridColDef } from "@mui/x-data-grid";
import type { ServiceGetPage } from "../../../DataTable";

const DEFAULT_LABELS: ModalLabels = {
    title: "",
    primaryCustomOption: {
        title: "",
        description: "",
        splitTeam: "",
        noSplit: "",
    },
    secondaryCustomOption: {
        title: "",
        recommendation: "",
        splitGroupPerPage: "", //folha vira page, nao confundir com page de pagination
        ordering: "",
    },
    button: "IMPRIMIR",
};

type Props<
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponses,
> = {
    labels?: ModalLabels;
    handleClose: () => void;
    columns: Array<GridColDef>;
    serviceGetPage: ServiceGetPage<TAppliedFilters, TResponse>;
};

export function CustomPrint<
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponses,
>({
    labels = DEFAULT_LABELS,
    handleClose,
    columns,
    serviceGetPage,
}: Props<TAppliedFilters, TResponse>): React.ReactNode {
    const { customization, setCustomization } = useContext(CustomPrintContext);
    const ref = useRef<HTMLDivElement>(null);

    const onPrintClick = (): void => {
        const htmlString = ref.current?.innerHTML || "";
        Print(htmlString);
    };

    return (
        <>
            <div className={style.Container}>
                <CloseModal handleClose={handleClose} />
                <PrintModalContent
                    labels={labels}
                    customization={customization}
                    setCustomization={setCustomization}
                />
                <PrintButton
                    label={labels.button}
                    onPrintClick={onPrintClick}
                />
            </div>
            <PrintTable
                columns={columns}
                serviceGetPage={serviceGetPage}
                // customization={customization}

                // {...customization} ref={ref}
            />
        </>
    );
}

type PrintButtonProps = {
    label: string;
    onPrintClick: () => void;
};

const PrintButton: React.FC<PrintButtonProps> = ({ label, onPrintClick }) => {
    return (
        <div className={style.ContainerButton}>
            <ButtonColorSubmitIcon label={label} submit={onPrintClick} />
        </div>
    );
};

const CloseModal: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
    return (
        <div className={style.Close}>
            <a className={style.ModalExit} onClick={handleClose} />
        </div>
    );
};

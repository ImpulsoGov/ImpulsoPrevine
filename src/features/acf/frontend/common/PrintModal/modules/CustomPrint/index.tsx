import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import style from "./CustomPrint.module.css";
//TODO: Ajustar imports relativos
import type { ModalLabels } from "../../model";
import { CustomPrintContext } from "../../../WithCustomPrint/context";
import { PrintModalContent } from "./modules/PrintModalContent";
import { Button } from "@impulsogov/design-system";

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

type Props = PropsWithChildren<{
    labels?: ModalLabels;
    handleClose: () => void;
    setShouldRenderPrintTable: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export const CustomPrint: React.FC<Props> = ({
    labels = DEFAULT_LABELS,
    handleClose,
    children,
    setShouldRenderPrintTable,
}) => {
    const { customization, setCustomization } = useContext(CustomPrintContext);

    const onPrintClick = (): void => {
        setShouldRenderPrintTable(true);
    };
    return (
        <>
            <div className={style.Container}>
                <PrintModalContent
                    labels={labels}
                    customization={customization}
                    setCustomization={setCustomization}
                    handleClose={handleClose}
                />
                <PrintButton
                    label={labels.button}
                    onPrintClick={onPrintClick}
                />
            </div>
            {children}
        </>
    );
};

type PrintButtonProps = {
    label: string;
    onPrintClick: () => void;
};

const PrintButton: React.FC<PrintButtonProps> = ({ label, onPrintClick }) => {
    return (
        <div className={style.ContainerButton}>
            <Button onClick={onPrintClick}>{label}</Button>
        </div>
    );
};

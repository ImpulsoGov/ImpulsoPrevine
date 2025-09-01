import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ButtonColorSubmitIcon } from "@impulsogov/design-system";
import style from "./CustomPrint.module.css";
//TODO: Ajustar imports relativos
import type { ModalLabels } from "../../model";
import { CustomPrintContext } from "../../../WithCustomPrint/context";
import { Print } from "../../../Print/RenderPrint";
import { PrintModalContent } from "./modules/PrintModalContent";

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
    ref: React.RefObject<HTMLDivElement | null>;
}>;

export const CustomPrint: React.FC<Props> = ({
    labels = DEFAULT_LABELS,
    handleClose,
    ref,
    children,
}) => {
    const { customization, setCustomization } = useContext(CustomPrintContext);

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

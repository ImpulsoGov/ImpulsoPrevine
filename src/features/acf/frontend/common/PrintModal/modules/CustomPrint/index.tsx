import React, { useContext, useRef } from "react";
import { ButtonColorSubmitIcon } from "@impulsogov/design-system";
import style from "./CustomPrint.module.css";
import type { ModalLabels } from "../../model";
import { CustomPrintContext } from "../../../WithCustomPrint/context";
import { ComponentTest } from "../../../Print/modules/ComponentTest";
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

type Props = {
    labels?: ModalLabels;
    handleClose: () => void;
};

export const CustomPrint: React.FC<Props> = ({
    labels = DEFAULT_LABELS,
    handleClose,
}) => {
    const { customization, setCustomization } = useContext(CustomPrintContext);
    const ref = useRef<HTMLDivElement>(null);

    const onPrintClick = (): void => {
        const htmlString = ref.current?.innerHTML || "";
        Print(htmlString);
    };

    return (
        <>
            <div
                className={style.Container}
                data-testid="PersonalizacaoImpressao"
            >
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
            <ComponentTest {...customization} ref={ref} />
        </>
    );
};

type PrintButtonProps = {
    label: string;
    onPrintClick: () => void;
};

const PrintButton: React.FC<PrintButtonProps> = ({ label, onPrintClick }) => {
    return (
        <div className={style.ContainerBotao}>
            <ButtonColorSubmitIcon label={label} submit={onPrintClick} />
        </div>
    );
};

const CloseModal: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
    return (
        <div className={style.Close}>
            <a
                className={style.ModalExit}
                onClick={handleClose}
                data-testid="FecharPersonalizacaoImpressao"
            />
        </div>
    );
};

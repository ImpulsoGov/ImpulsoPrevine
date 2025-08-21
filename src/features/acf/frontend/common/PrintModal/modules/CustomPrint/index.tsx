import React, { useContext, useState } from "react";
import { ButtonColorSubmitIcon } from "@impulsogov/design-system";
import style from "./CustomPrint.module.css";
// import cx from "classnames";
import type { ModalLabels } from "../../model";
// import { CustomPrintContext } from "../../../WithCustomPrint/context";

const DEFAULT_LABELS = {
    title: "",
    primaryCustomOption: {
        title: "",
        description: "",
        splitTeam: "",
        noSplit: "",
    },
    secondaryCustomOption: {
        title: "",
        recomendation: "",
        splitGroupPerPage: "", //folha vira page, nao confundir com page de pagination
        order: "",
    },
    button: "",
};

type Props = {
    labels?: ModalLabels;
    // handleClose: () => void;
    onPrintClick: () => void;
    // groupedValues: { yes: string; no: string };
};

// TODO: dividir em componentes menores?
export const CustomPrint: React.FC<Props> = ({
    labels = DEFAULT_LABELS,
    // handleClose,
    onPrintClick,
    // groupedValues,
}) => {
    return (
        <div className={style.Container} data-testid="PersonalizacaoImpressao">
            <div className={style.ContainerBotao}>
                <ButtonColorSubmitIcon
                    label={labels.button}
                    submit={onPrintClick}
                />
            </div>
        </div>
    );
};

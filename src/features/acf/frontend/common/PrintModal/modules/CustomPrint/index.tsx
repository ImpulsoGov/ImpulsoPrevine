import type { PropsWithChildren } from "react";
import React, { useContext, useEffect } from "react";
import style from "./CustomPrint.module.css";
//TODO: Ajustar imports relativos
import type { ModalLabels } from "../../model";
import { CustomPrintContext } from "../../../WithCustomPrint/context";
import { Print } from "../../../Print/RenderPrint";
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
    ref: React.RefObject<HTMLDivElement | null>;
    shouldRenderPrintTable: boolean;
    setShouldRenderPrintTable: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export const CustomPrint: React.FC<Props> = ({
    labels = DEFAULT_LABELS,
    handleClose,
    ref,
    children,
    shouldRenderPrintTable,
    setShouldRenderPrintTable,
}) => {
    const { customization, setCustomization } = useContext(CustomPrintContext);

    const onPrintClick = (): void => {
        setShouldRenderPrintTable(true);
        // console.log("ref", ref);
        // const htmlString = ref.current?.innerHTML || "";
        // Print(htmlString);
        // setShouldRenderPrintTable(false);
    };

    // useEffect(() => {
    //     if (shouldRenderPrintTable && ref.current?.innerHTML) {
    //         const htmlString = ref.current.innerHTML;
    //         if (htmlString.length > 0) {
    //             Print(htmlString);
    //             // setShouldRenderPrintTable(false);
    //         }
    //     }
    // }, [shouldRenderPrintTable, ref.current?.innerHTML]);

    // useEffect(() => {
    //     if (shouldRenderPrintTable && ref.current) {
    //         const htmlString = ref.current.innerHTML;
    //
    //          Print(htmlString);
    //        / setShouldRenderPrintTable(false);
    //
    //     }
    // }, [shouldRenderPrintTable]);

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

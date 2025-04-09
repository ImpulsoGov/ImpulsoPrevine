import type { PrintTableProps } from "@/componentes/unmounted/lista-nominal/print/PrintTable";
import type { PrintOptions } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/List";
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import type { DataItem } from "@/utils/FilterData";
import type { Dispatch, SetStateAction } from "react";
import { print } from "./print";

export const NUMERO_DE_FILTROS_PARA_IMPRESSAO_SEM_PERSONALIZACAO = 1;
export const VALORES_AGRUPAMENTO_IMPRESSAO = { sim: "sim", nao: "não" };

//funcao que imprime a lista sem a necessidade de abrir o modal, ou seja, impressao sem personalizacao
export const printWithoutModalWindow = (props: PrintTableProps) => print(props);

export const sortByString = (data: DataItem[], filtro: string) =>
    [...data].sort((a, b) =>
        (a[filtro]?.toString() ?? "").localeCompare(
            b[filtro]?.toString() ?? "",
        ),
    );

//funcao executada quando o usuário clica no botão de impressão na barra de ferramentas
export const handlePrint = (
    chavesFiltros: FilterItem,
    propImpressaoSemPersonalizacao: string,
    setShowModalImpressao: Dispatch<SetStateAction<boolean>>,
    props: PrintTableProps,
) => {
    const filtros = Array.isArray(chavesFiltros[propImpressaoSemPersonalizacao])
        ? chavesFiltros[propImpressaoSemPersonalizacao]
        : [];
    const abrirModal =
        filtros.length === NUMERO_DE_FILTROS_PARA_IMPRESSAO_SEM_PERSONALIZACAO;
    abrirModal ? printWithoutModalWindow(props) : setShowModalImpressao(true);
};
export type ExtendedPrintTableProps = PrintTableProps & {
    orderByProp: boolean;
};
//funcao executada quando o usuário clica no botão de impressão no modal
export const customizePrint = (
    options: PrintOptions,
    closePrintModal: () => void,
    props: ExtendedPrintTableProps,
) => {
    const printData =
        options.ordenacao &&
        options.agrupamento !== VALORES_AGRUPAMENTO_IMPRESSAO.nao
            ? sortByString(props.data, "acs_nome_cadastro") //TODO tornar propriedade dinâmica
            : props.data;
    print({ ...props, data: printData });

    closePrintModal();
};

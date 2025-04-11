import type { CardDetailsMap } from '@helpers/cardsList'; // Adjust the path to where CardDetailsMap is defined
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import type { ExtendedPanelSelectorWithCardsProps } from "./PanelSelector.presentation";
import type { AcfDashboardType } from '../../types';
export const externalCardsDetails: CardDetailsMap = {
    COM_CONSULTA_AFERICAO_PRESSAO: {
        title: "Total de pessoas com consulta e aferição de PA em dia",
        titlePosition: "top",
        customStyles: {
            width: "180px",
            backgroundColor: "#FFF",
        },
    },
    DIAGNOSTICO_AUTORREFERIDO: {
        title: "Total de pessoas com diagnóstico autorreferido",
        titlePosition: "top",
        customStyles: {
            width: "180px",
            backgroundColor: "#FFF",
        },
    },
    DIAGNOSTICO_CLINICO: {
        title: "Total de pessoas com diagnóstico clínico",
        titlePosition: "top",
        customStyles: {
            width: "180px",
            backgroundColor: "#FFF",
        },
    },
};

export const breadcrumb = {
    breadcrumb: [
        {
            label: "Inicio",
            link: "/inicio",
        },
        {
            label: "Diabetes",
            link: "/lista=diabetes",
        },
    ],
};

export const tabDefinitions = {
    tabs: {
        charts: {
            title: "Gráficos",
            tabID: "chart",
            subTabs: [
                {
                    icon: {
                        active: "https://media.graphassets.com/dVxSjSUyROm9A2YkiEMj",
                        inactive:
                            "https://media.graphassets.com/jPDKYUhTXaEkGHFpjpfr",
                        inactiveHover:
                            "https://media.graphassets.com/QyT9jkJRkiq73uwGHPBg",
                    },
                    text: "Sub-Aba 1",
                    subTabID: "ChartSubTabID1",
                    child: <div>Sub-Aba</div>,
                    title: "Gráfico 1",
                },
                {
                    icon: {
                        active: "https://media.graphassets.com/Tx39n37HTGWapXUq8UBv",
                        inactive:
                            "https://media.graphassets.com/veVDjWw1ROmaXsuOY7LX",
                        inactiveHover:
                            "https://media.graphassets.com/nFtUIgG3TDSIBD0Mzsq4",
                    },
                    text: "Sub-Aba 2",
                    subTabID: "ChartSubTabID2",
                    child: <div>Sub-Aba</div>,
                    title: "Gráfico 2",
                },
            ],
        },
        lists: {
            title: "Listas",
            tabID: "list",
            subTabs: [
                {
                    icon: {
                        active: "https://media.graphassets.com/dVxSjSUyROm9A2YkiEMj",
                        inactive:
                            "https://media.graphassets.com/jPDKYUhTXaEkGHFpjpfr",
                        inactiveHover:
                            "https://media.graphassets.com/QyT9jkJRkiq73uwGHPBg",
                    },
                    text: "Lista 1",
                    subTabID: "subTabID1",
                    child: <div>Sub-Aba</div>,
                    title: "Lista 1",
                },
                {
                    icon: {
                        active: "https://media.graphassets.com/Tx39n37HTGWapXUq8UBv",
                        inactive:
                            "https://media.graphassets.com/veVDjWw1ROmaXsuOY7LX",
                        inactiveHover:
                            "https://media.graphassets.com/nFtUIgG3TDSIBD0Mzsq4",
                    },
                    text: "Lista 2",
                    subTabID: "subTabID2",
                    child: <div>Sub-Aba</div>,
                    title: "Lista 2",
                },
                {
                    icon: {
                        active: "https://media.graphassets.com/EQSROnFQRm20pX1CVbT2",
                        inactive:
                            "https://media.graphassets.com/8sikQD27QLO3IkoxkQ9D",
                        inactiveHover:
                            "https://media.graphassets.com/M0tdvdQLaVoWOcCjjWGQ",
                    },
                    text: "Lista 3",
                    subTabID: "subTabID3",
                    child: <div>Sub-Aba</div>,
                    title: "Lista 3",
                },
            ],
        },
    },
};

export const header = {
    title: "Diabetes",
    tooltip:
        "Legenda\n\nTipo de diagnóstico:\n\nAutorreferido - a condição foi identificada como \"autorreferida\" quando é relatada pelo usuário na realização do Cadastro Individual.\n\nDiagnóstico Clínico - a condição foi identificada como \"diagnóstico clínico\" por haver atendimento individual confirmando o diagnóstico.",
    text: "A lista nominal de diabetes reúne os cidadãos que possuem a condição, seja por diagnóstico clínico ou autorreferido, e traz a situação da consulta e da solicitação de hemoblogina, que devem ser realizadas a cada seis meses para acompanhamento. Além disso, você encontrará também o nome profissional responsável pelo cidadão, para facilitar a organização da busca ativa. Utilize os filtros para segmentar a lista como preferir.",
}

export const acfNominalListProps = (
    externalCardsProps: CardProps[],
    listName: AcfDashboardType,
    tabID: string,
    subTabID: string,
    municipalityIdSus: string,
): ExtendedPanelSelectorWithCardsProps =>
({
    ...breadcrumb,
    ...tabDefinitions,
    ...header,
    municipality: municipalityIdSus,
    cards: externalCardsProps,
    listaNominalID: listName,

    inicialContent: {
        tabID: tabID,
        subTabID: subTabID,
    },
})

"use client";
import { PanelSelectorWithCards } from "@impulsogov/design-system";
import type {
    PanelSelectorWithCardsProps,
    subTabsWithChildrenProps,
} from "@impulsogov/design-system/dist/organisms/PanelSelectorWithCards/PanelSelectorWithCards";
import { acfNominalListProps, breadcrumb, header, tabDefinitions } from "./PanelSelector.consts";
import { ChartsContainer } from "./modules/Charts";
import { ListContainer } from "./modules/List";


export type ExtendedsubTabsWithChildrenAndChildrenDataProps =
    subTabsWithChildrenProps & {
        child?: React.ReactNode; // Tornando child opcional
        title: string;
    };

type Tabs = Record<
        string,
        {
            title: string;
            tabID: string;
            subTabs: ExtendedsubTabsWithChildrenAndChildrenDataProps[];
        }
    >;

type ListaNominalID = string;


export type ExtendedPanelSelectorWithCardsProps = Omit<
    PanelSelectorWithCardsProps,
    "tabs"
> & {
    tabs: Tabs;
    listaNominalID: ListaNominalID;
};

export type AcfNameListProps = {
    props: ExtendedPanelSelectorWithCardsProps;
};

const SubTabChildrenID: Record<
    string,
    React.ComponentType<{ subTabID: string; title: string; list: string }>
> = {
    ChartChildID1: ChartsContainer,
    ListChildID1: ListContainer,
};

//Essa informação vai vir do CMS
const SubTabChildren: Record<string, string> = {
    ChartSubTabID1: "ChartChildID1",
    ChartSubTabID2: "ChartChildID1",
    subTabID1: "ListChildID1",
    subTabID2: "ListChildID1",
    subTabID3: "ListChildID1",
};

/**
 * Seleciona e cria componentes filhos para sub-tabs.
 *
 * Esta função recebe as propriedades do seletor de painel, um mapeamento de IDs para componentes React,
 * e um mapeamento de IDs de sub-tabs para IDs de componentes. Ela percorre todas as sub-tabs definidas nas propriedades do seletor
 * e cria os componentes React correspondentes, retornando um mapeamento de IDs de sub-tabs para nós React.
 *
 * @param {ExtendedPanelSelectorWithCardsProps} selectorProps - Propriedades do seletor de painel, incluindo informações sobre tabs e sub-tabs.
 * @param {Record<string, React.ComponentType<{ subTabID: string, title: string, list: string }>>} subTabChildrenID - Mapeamento de IDs para componentes React.
 * @param {Record<string, string>} subTabChildren - Mapeamento de IDs de sub-tabs para IDs que representam os componentes React.
 * @returns {Record<string, React.ReactNode>} - Mapeamento de IDs de sub-tabs para nós React, onde cada nó é um componente React criado com as propriedades apropriadas.
 */
export const subTabChildrenSelector = (
    tabs: Tabs,
    listaNominalID: ListaNominalID,
    subTabChildrenID: Record<
        string,
        React.ComponentType<{ subTabID: string; title: string; list: string }>
    >,
    subTabChildren: Record<string, string>,
) => {
    return Object.values(tabs)
        .flatMap((tab) => tab.subTabs)
        .reduce(
            (
                result,
                subTab: ExtendedsubTabsWithChildrenAndChildrenDataProps,
            ) => {
                const Component =
                    subTabChildrenID[subTabChildren[subTab.subTabID]];
                result[subTab.subTabID] = Component
                    ? React.createElement(Component, {
                          subTabID: subTab.subTabID,
                          title: subTab.title,
                          list: listaNominalID,
                      })
                    : null;
                return result;
            },
            {} as Record<string, React.ReactNode>,
        );
};


export const PanelSelector = ({ listName, tabID, subTabID}) => {
    const props = acfNominalListProps(
        externalCardsProps,
        listName,
        tabID,
        subTabID,
    );

    const initialContent = {
        tabID: tabID,
        subTabID: subTabID,
    }

    const childrenComponents = subTabChildrenSelector(
        tabDefinitions,
        listNameID,
        SubTabChildrenID,
        SubTabChildren,
    );

    const tabs = Object.fromEntries(
        Object.entries(props.tabs).map(([key, tab]) => [
            key,
            {
                ...tab,
                subTabs: tab.subTabs.map((subTab) => ({
                    ...subTab,
                    child: childrenComponents[subTab.subTabID],
                })),
            },
        ]),
    );


    return (
        <PanelSelectorWithCards
            {...header}
            breadcrumb={breadcrumb}
            cards={cards}
            listaNominalID={listName}
            inicialContent = {initialContent}
            tabs={tabs}
        />
    );
};

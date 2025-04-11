import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";
import React from "react";
import type {
    ExtendedPanelSelectorWithCardsProps,
    ExtendedsubTabsWithChildrenAndChildrenDataProps,
} from "../features/acf/modules/AcfDashboardPage/modules/PanelSelector/PanelSelector.presentation";

//TODO: Remover daqui
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
    selectorProps: ExtendedPanelSelectorWithCardsProps,
    subTabChildrenID: Record<
        string,
        React.ComponentType<{ title: string; list: AcfDashboardType }>
    >,
    subTabChildren: Record<string, string>,
) => {
    return Object.values(selectorProps.tabs)
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
                          title: subTab.title,
                          list: selectorProps.listaNominalID,
                      })
                    : null;
                return result;
            },
            {} as Record<string, React.ReactNode>,
        );
};

import React from 'react';
import type { ExtendedsubTabsWithChildrenAndChildrenDataProps, ExtendedPanelSelectorWithCardsProps } from '../app/lista-nominal/ListaNominal';

/**
 * Seleciona e cria componentes filhos para sub-tabs.
 * 
 * Esta função recebe as propriedades do seletor de painel, um mapeamento de IDs para componentes React,
 * e um mapeamento de IDs de sub-tabs para IDs de componentes. Ela percorre todas as sub-tabs definidas nas propriedades do seletor
 * e cria os componentes React correspondentes, retornando um mapeamento de IDs de sub-tabs para nós React.
 * 
 * @param {ExtendedPanelSelectorWithCardsProps} selectorProps - Propriedades do seletor de painel, incluindo informações sobre tabs e sub-tabs.
 * @param {Record<string, React.ComponentType<{ subTabID: string, title: string, list: string }>>} SubTabChildrenID - Mapeamento de IDs para componentes React.
 * @param {Record<string, string>} SubTabChildren - Mapeamento de IDs de sub-tabs para IDs que representam os componentes React.
 * @returns {Record<string, React.ReactNode>} - Mapeamento de IDs de sub-tabs para nós React, onde cada nó é um componente React criado com as propriedades apropriadas.
 */
export const subTabChildrenSelector = (
    selectorProps: ExtendedPanelSelectorWithCardsProps,
    SubTabChildrenID: Record<string, React.ComponentType<{ subTabID: string, title: string, list: string }>>,
    SubTabChildren: Record<string, string>
) => {
    const result: Record<string, React.ReactNode> = {};
    // tabs e subTabs sempre vão ter poucas unidades, logo não existe problema de performance no uso de forEach
    Object.values(selectorProps.tabs).forEach(tab => {
        tab.subTabs.forEach((subTab: ExtendedsubTabsWithChildrenAndChildrenDataProps) => {
            const Component = SubTabChildrenID[SubTabChildren[subTab.subTabID]];
            result[subTab.subTabID] = Component ? React.createElement(Component, { subTabID: subTab.subTabID, title: subTab.title, list: selectorProps.listaNominalID }) : null;
        });
    });
    return result;
}

import React from 'react';
import type { ExtendedsubTabsWithChildrenAndChildrenDataProps, ExtendedPanelSelectorWithCardsProps } from '../app/lista-nominal/ListaNominal';  
  
export const subTabChildrenSelector = (
    selectorProps: ExtendedPanelSelectorWithCardsProps,
    SubTabChildrenID: Record<string, React.ComponentType<{ subTabID: string, title: string }>>,
    SubTabChildren: Record<string, string>
) => {
    const result: Record<string, React.ReactNode> = {};
    //tabs e subTabs sempre vão ter poucas unidades logo não existe problema de performance no uso de forEach
    Object.values(selectorProps.tabs).forEach(tab => {
        tab.subTabs.forEach((subTab: ExtendedsubTabsWithChildrenAndChildrenDataProps) => {
            const Component = SubTabChildrenID[SubTabChildren[subTab.subTabID]];
            result[subTab.subTabID] = Component ? React.createElement(Component, { subTabID: subTab.subTabID, title : subTab.title }) : null;
        });
    });
    return result;
}

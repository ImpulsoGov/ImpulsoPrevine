import React from 'react';
import type { ExtendedsubTabsWithChildrenAndChildrenDataProps, ExtendedPanelSelectorWithCardsProps } from '../app/lista-nominal/ListaNominal';  
  
export const subTabChildrenSelector = (
    selectorProps: ExtendedPanelSelectorWithCardsProps,
    subTabChildrenID: Record<string, React.ComponentType<{ subTabID: string, title: string }>>,
    subTabChildren: Record<string, string>
) => {
    return Object.values(selectorProps.tabs).flatMap(tab => tab.subTabs).reduce((result, subTab: ExtendedsubTabsWithChildrenAndChildrenDataProps) => {
        const Component = subTabChildrenID[subTabChildren[subTab.subTabID]];
        result[subTab.subTabID] = Component ? React.createElement(Component, { subTabID: subTab.subTabID, title : subTab.title }) : null;
        return result;
    }, {} as Record<string, React.ReactNode>);
}

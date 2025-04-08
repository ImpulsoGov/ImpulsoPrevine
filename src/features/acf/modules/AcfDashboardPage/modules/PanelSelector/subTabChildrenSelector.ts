import React from "react";
import type { ExtendedsubTabsWithChildrenAndChildrenDataProps } from "./PanelSelector.presentation";
import type { Tabs, ListaNominalID } from "./PanelSelector.presentation";

export const subTabChildrenSelector = (
    tabs: Tabs,
    listaNominalID: ListaNominalID,
    subTabChildrenID: Record<
        string,
        React.ComponentType<{ subTabID: string; title: string; list: string }>
    >,
    subTabChildren: Record<string, string>,
):Record<string, React.ReactNode>  => {
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
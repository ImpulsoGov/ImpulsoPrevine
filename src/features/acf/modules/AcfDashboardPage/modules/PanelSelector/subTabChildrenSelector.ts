import React from "react";
import type { AcfDashboardType } from "../../types";
import type { ExtendedsubTabsWithChildrenAndChildrenDataProps, Tabs } from "./PanelSelector.presentation";

export const subTabChildrenSelector = (
    tabs: Tabs,
    listaNominalID: AcfDashboardType,
    subTabChildrenID: Record<
        string,
        React.ComponentType<{ title: string; list: AcfDashboardType }>
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
                          title: subTab.title,
                          list: listaNominalID,
                      })
                    : null;
                return result;
            },
            {} as Record<string, React.ReactNode>,
        );
};
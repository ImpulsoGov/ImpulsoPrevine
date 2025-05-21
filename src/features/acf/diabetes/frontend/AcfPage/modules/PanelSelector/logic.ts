import React from "react";
import type { AcfDashboardType } from "../../../../common/model";
import type { ExtendedPanelSelectorWithCardsProps, ExtendedsubTabsWithChildrenAndChildrenDataProps, Tabs } from "./presentation";
import type { PanelSelectorWithCardsProps } from "@impulsogov/design-system/dist/organisms/PanelSelectorWithCards/PanelSelectorWithCards";

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

export const tabsBuilder = (
    props: ExtendedPanelSelectorWithCardsProps,
    childrenComponents: Record<string, React.ReactNode>
): PanelSelectorWithCardsProps["tabs"] => {
    return Object.fromEntries(
        Object.entries(props.tabs as Tabs).map(([key, tab]) => [
            key,
            {
                ...tab,
                subTabs: (tab as Tabs[string]).subTabs.map((subTab) => ({
                    ...subTab,
                    child: childrenComponents[subTab.subTabID],
                })),
            },
        ])
    );
};

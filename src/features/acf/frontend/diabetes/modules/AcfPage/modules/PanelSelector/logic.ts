import type { PanelSelectorWithCardsProps } from "@impulsogov/design-system/dist/organisms/PanelSelectorWithCards/PanelSelectorWithCards";
import React from "react";
import type { AcfDashboardType } from "../../../../../../shared/diabetes/model";
import type {
    ExtendedPanelSelectorWithCardsProps,
    ExtendedsubTabsWithChildrenAndChildrenDataProps,
    Tabs,
} from "./presentation";

export const subTabChildrenSelector = (
    tabs: Tabs,
    listaNominalID: AcfDashboardType,
    subTabChildrenID: Record<
        string,
        React.ComponentType<{ title: string; list: AcfDashboardType }>
    >,
    subTabChildren: Record<string, string>
): Record<string, React.ReactNode> => {
    return Object.values(tabs)
        .flatMap((tab) => tab.subTabs)
        .reduce<Record<string, React.ReactNode>>(
            (
                result,
                subTab: ExtendedsubTabsWithChildrenAndChildrenDataProps
            ) => {
                const Component =
                    subTabChildrenID[subTabChildren[subTab.subTabID]];

                result[subTab.subTabID] = React.createElement(Component, {
                    title: subTab.title,
                    list: listaNominalID,
                });
                return result;
            },
            {}
        );
};

export const tabsBuilder = (
    props: ExtendedPanelSelectorWithCardsProps,
    childrenComponents: Record<string, React.ReactNode>
): PanelSelectorWithCardsProps["tabs"] => {
    return Object.fromEntries(
        Object.entries(props.tabs).map(([key, tab]) => [
            key,
            {
                ...tab,
                subTabs: tab.subTabs.map((subTab) => ({
                    ...subTab,
                    child: childrenComponents[subTab.subTabID],
                })),
            },
        ])
    );
};
//Todo: Mover essa função para dentro de List/modules/common
export const nameFormatter = (value: string): string => {
    const commonPrepositions = ["da", "de", "do", "dos", "das", "e"];
    const namePieces = value.toLowerCase().split(" ");
    const formattedNames = namePieces.map((piece) => {
        if (!commonPrepositions.includes(piece)) {
            return piece.charAt(0).toUpperCase() + piece.slice(1);
        }
        return piece;
    });
    return formattedNames.join(" ");
};

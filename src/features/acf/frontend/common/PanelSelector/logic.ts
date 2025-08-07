// ! Esse trecho será habilitado novamente quando a lógica de tabs for reimplementada

// import type {
//     PanelSelectorWithCardsProps,
//     subTabsWithChildrenProps,
// } from "@impulsogov/design-system/dist/organisms/PanelSelectorWithCards/PanelSelectorWithCards";
// import React from "react";
// import type { AcfDashboardType } from "../../../../../../shared/diabetes/model";
// import type {
//     ExtendedPanelSelectorWithCardsProps,
//     ExtendedsubTabsWithChildrenAndChildrenDataProps,
//     Tabs,
// } from "./presentation";

// export type ExtendedsubTabsWithChildrenAndChildrenDataProps =
//     subTabsWithChildrenProps & {
//         child?: React.ReactNode; // Tornando child opcional
//         title: string;
//     };

// export type Tabs = Record<
//     string,
//     {
//         title: string;
//         tabID: string;
//         subTabs: Array<ExtendedsubTabsWithChildrenAndChildrenDataProps>;
//     }
// >;

// export type ExtendedPanelSelectorWithCardsProps = Omit<
//     PanelSelectorWithCardsProps,
//     "tabs"
// > & {
//     tabs: Tabs;
//     listaNominalID: AcfDashboardType;
// };

// export const subTabChildrenSelector = (
//     tabs: Tabs,
//     listaNominalID: AcfDashboardType,
//     subTabChildrenID: Record<
//         string,
//         React.ComponentType<{ title: string; list: AcfDashboardType }>
//     >,
//     subTabChildren: Record<string, string>
// ): Record<string, React.ReactNode> => {
//     return Object.values(tabs)
//         .flatMap((tab) => tab.subTabs)
//         .reduce<Record<string, React.ReactNode>>(
//             (
//                 result,
//                 subTab: ExtendedsubTabsWithChildrenAndChildrenDataProps
//             ) => {
//                 const Component =
//                     subTabChildrenID[subTabChildren[subTab.subTabID]];

//                 result[subTab.subTabID] = React.createElement(Component, {
//                     title: subTab.title,
//                     list: listaNominalID,
//                 });
//                 return result;
//             },
//             {}
//         );
// };

// export const tabsBuilder = (
//     props: ExtendedPanelSelectorWithCardsProps,
//     childrenComponents: Record<string, React.ReactNode>
// ): PanelSelectorWithCardsProps["tabs"] => {
//     return Object.fromEntries(
//         Object.entries(props.tabs).map(([key, tab]) => [
//             key,
//             {
//                 ...tab,
//                 subTabs: tab.subTabs.map((subTab) => ({
//                     ...subTab,
//                     child: childrenComponents[subTab.subTabID],
//                 })),
//             },
//         ])
//     );
// };

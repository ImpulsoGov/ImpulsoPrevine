import type { ExtendedPanelSelectorWithCardsProps } from './PanelSelector.presentation'; // Adjust the path as needed
import type { Tabs } from './PanelSelector.presentation';
import type { PanelSelectorWithCardsProps } from "@impulsogov/design-system/dist/organisms/PanelSelectorWithCards/PanelSelectorWithCards";

export const tabsBuilder = (
    props:  ExtendedPanelSelectorWithCardsProps,
    childrenComponents: Record<string, React.ReactNode>
): PanelSelectorWithCardsProps["tabs"]=> {
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
    ]),
)}
"use client";
import { PanelSelectorWithCards } from "@impulsogov/design-system";
import type {
    PanelSelectorWithCardsProps,
    subTabsWithChildrenProps,
} from "@impulsogov/design-system/dist/organisms/PanelSelectorWithCards/PanelSelectorWithCards";
import { subTabChildrenSelector } from "@utils/subTabChildrenSelector";
import { acfNominalListProps } from "./PanelSelector.consts";
import { ChartsContainer } from "./modules/Charts";
import { ListContainer } from "./modules/List";

export type ExtendedsubTabsWithChildrenAndChildrenDataProps =
    subTabsWithChildrenProps & {
        child?: React.ReactNode; // Tornando child opcional
        title: string;
    };

export type ExtendedPanelSelectorWithCardsProps = Omit<
    PanelSelectorWithCardsProps,
    "tabs"
> & {
    tabs: Record<
        string,
        {
            title: string;
            tabID: string;
            subTabs: ExtendedsubTabsWithChildrenAndChildrenDataProps[];
        }
    >;
    listaNominalID: string;
};

export type AcfNameListProps = {
    props: ExtendedPanelSelectorWithCardsProps;
};

const SubTabChildrenID: Record<
    string,
    React.ComponentType<{ subTabID: string; title: string; list: string }>
> = {
    ChartChildID1: ChartsContainer,
    ListChildID1: ListContainer,
};

//Essa informação vai vir do CMS
const SubTabChildren: Record<string, string> = {
    ChartSubTabID1: "ChartChildID1",
    ChartSubTabID2: "ChartChildID1",
    subTabID1: "ListChildID1",
    subTabID2: "ListChildID1",
    subTabID3: "ListChildID1",
};

export const PanelSelector = ({ props }: AcfNameListProps) => {
    const childrenComponents = subTabChildrenSelector(
        props,
        SubTabChildrenID,
        SubTabChildren,
    );

const props = acfNominalListProps(
    externalCardsProps,
    listName,
    tabID,
    subTabID,
)
    return (
        <PanelSelectorWithCards
            {...props}
            tabs={Object.fromEntries(
                Object.entries(props.tabs).map(([key, tab]) => [
                    key,
                    {
                        ...tab,
                        subTabs: tab.subTabs.map((subTab) => ({
                            ...subTab,
                            child: childrenComponents[subTab.subTabID],
                        })),
                    },
                ]),
            )}
        />
    );
};

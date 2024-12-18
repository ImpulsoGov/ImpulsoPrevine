'use client'
import { ListConteiner } from "./ListContainer";
import { ChartsContainer } from "./ChartsContainer";
import { PanelSelectorWithCards } from '@impulsogov/design-system';
import type { PanelSelectorWithCardsProps, subTabsWithChildrenProps } from '@impulsogov/design-system/dist/organisms/PanelSelectorWithCards/PanelSelectorWithCards';
import { subTabChildrenSelector } from '@utils/subTabChildrenSelector';

export type ExtendedsubTabsWithChildrenAndChildrenDataProps = subTabsWithChildrenProps & {
  child?: React.ReactNode; // Tornando child opcional
  title: string;
}

export type ExtendedPanelSelectorWithCardsProps = Omit<PanelSelectorWithCardsProps, 'tabs'> & {
  tabs: Record<string, {
    title: string;
    tabID: string;
    subTabs: ExtendedsubTabsWithChildrenAndChildrenDataProps[];
  }>;
};

export type ListaNominalProps = {
  selectorProps: ExtendedPanelSelectorWithCardsProps;
}

const SubTabChildrenID: Record<string, React.ComponentType<{ subTabID: string, title: string }>> = {
  'ChartChildID1': ChartsContainer,
  'ListChildID1': ListConteiner,
};

//Essa informação vai vir do CMS
const SubTabChildren: Record<string, string> = {
  'ChartSubTabID1': 'ChartChildID1',
  'ChartSubTabID2': 'ChartChildID1',
  'subTabID1': 'ListChildID1',
  'subTabID2': 'ListChildID1',
  'subTabID3': 'ListChildID1',
};

export const ListaNominal = ({ 
  selectorProps,
}: ListaNominalProps) => {
  const childrenComponents = subTabChildrenSelector(selectorProps, SubTabChildrenID, SubTabChildren);
  console.log(childrenComponents)
  return (
    <PanelSelectorWithCards 
      {...selectorProps} 
      tabs={Object.fromEntries(
        Object.entries(selectorProps.tabs).map(([key, tab]) => [
          key,
          {
            ...tab,
            subTabs: tab.subTabs.map(subTab => ({
              ...subTab,
              child: childrenComponents[subTab.subTabID]
            }))
          }
        ])
      )}
    />
  )
}
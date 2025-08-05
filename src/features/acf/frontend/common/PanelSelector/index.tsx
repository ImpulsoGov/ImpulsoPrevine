"use client";
import type { AcfDashboardType } from "../DashboardType";
import type {
    // CoordinatorProfile,
    ProfileIdValue,
} from "@/types/profile";
// import { PROFILE_ID } from "@/types/profile";
import { PanelSelectorWithCards } from "@impulsogov/design-system";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import type {
    PanelSelectorWithCardsProps,
    subTabsWithChildrenProps,
} from "@impulsogov/design-system/dist/organisms/PanelSelectorWithCards/PanelSelectorWithCards";

// import { ChartsContainer } from "./modules/dashboards/Charts";
// import { subTabChildrenSelector } from "./subTabChildrenSelector";
// import { tabsBuilder } from "./tabsBuilder";

//TODO!: não remover codigos comentados, serão utilizados na implementação das proximas entregas

export type ExtendedsubTabsWithChildrenAndChildrenDataProps =
    subTabsWithChildrenProps & {
        child?: React.ReactNode; // Tornando child opcional
        title: string;
    };

export type Tabs = Record<
    string,
    {
        title: string;
        tabID: string;
        subTabs: Array<ExtendedsubTabsWithChildrenAndChildrenDataProps>;
    }
>;

export type ExtendedPanelSelectorWithCardsProps = Omit<
    PanelSelectorWithCardsProps,
    "tabs"
> & {
    tabs: Tabs;
    listaNominalID: AcfDashboardType;
};

// const ErrorMessage = () => (
//     <p>Você não possui as permissões necessárias para acessar este conteúdo.</p>
// );

export type AcfNameListProps = {
    props: ExtendedPanelSelectorWithCardsProps;
};
// const SubTabChildrenID = (
//     userProfiles: ProfileIdValue[],
// ): Record<
//     string,
//     React.ComponentType<{ title: string; list: AcfDashboardType }>
// > => {
//     const listChildren: Record<CoordinatorProfile, React.ComponentType<{ title: string; list: AcfDashboardType }>> = {
//         [PROFILE_ID.COAPS]: ListContainer,
//         [PROFILE_ID.COEQ]: ListContainer
//     };
//     const userProfile: CoordinatorProfile | undefined = userProfiles.find(
//         (profile) =>
//             profile === PROFILE_ID.COAPS || profile === PROFILE_ID.COEQ,
//     );
//     if (!userProfile) {
//         return {
//             ChartChildID1: ErrorMessage,
//             ListChildID1: ErrorMessage,
//         };
//     }

//     return {
//         ChartChildID1: ChartsContainer,
//         ListChildID1: listChildren[userProfile]
//     };
// };
//Essa informação vai vir do CMS
// const SubTabChildren: Record<string, string> = {
//     ChartSubTabID1: "ChartChildID1",
//     ChartSubTabID2: "ChartChildID1",
//     subTabID1: "ListChildID1",
//     subTabID2: "ListChildID1",
//     subTabID3: "ListChildID1",
// };

type BreadcrumbItem = {
    label: string;
    link: string;
};

type PanelSelectorProps = {
    acfDashboardType: AcfDashboardType;
    tabID: string;
    subTabID: string;
    externalCardsProps: Array<CardProps>;
    userProfiles: Array<ProfileIdValue>;
    municipalityName: string;
    contentWithoutTabs: React.ReactNode;
    breadcrumb: Array<BreadcrumbItem>;
    header: {
        title: string;
        tooltip: React.ReactNode;
        text: string;
    };
};

export const PanelSelector: React.FC<PanelSelectorProps> = ({
    acfDashboardType,
    // tabID,
    // subTabID,
    // externalCardsProps,
    // userProfiles,
    municipalityName,
    contentWithoutTabs,
    breadcrumb,
    header,
}) => {
    // const props = acfNominalListProps(
    //     externalCardsProps,
    //     listName,
    //     tabID,
    //     subTabID,
    //     municipalityIdSus,
    // );

    // const initialContent = {
    //     tabID: tabID,
    //     subTabID: subTabID,
    // };

    // const childrenComponents = subTabChildrenSelector(
    //     tabDefinitions.tabs,
    //     listName,
    //     SubTabChildrenID(userProfiles),
    //     SubTabChildren,
    // );
    // const tabs = tabsBuilder(props, childrenComponents);

    return (
        <PanelSelectorWithCards
            {...header}
            municipality={municipalityName}
            breadcrumb={breadcrumb}
            listaNominalID={acfDashboardType}
            inicialContent={contentWithoutTabs}
            tabs={null}
            contentWithoutTabs={contentWithoutTabs}
        />
    );
};

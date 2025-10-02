"use client";
import type { AcfDashboardType } from "@/features/acf/frontend/common/AcfDashboard";
import { PanelSelectorWithCards } from "@impulsogov/design-system";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import type {
    PanelSelectorWithCardsProps,
    subTabsWithChildrenProps,
} from "@impulsogov/design-system/dist/organisms/PanelSelectorWithCards/PanelSelectorWithCards";
import type { JSX } from "react";

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

export type AcfNameListProps = {
    props: ExtendedPanelSelectorWithCardsProps;
};

type BreadcrumbItem = {
    label: string;
    link: string;
};

type PanelSelectorProps = {
    externalCardsProps?: Array<CardProps>;
    municipalityName: string;
    contentWithoutTabs: React.ReactNode;
    breadcrumb: Array<BreadcrumbItem>;
    header: {
        title: string;
        tooltip?: React.ReactNode;
        text: string | JSX.Element;
    };
};

//TODO: Trazer o componente para o frontend e remover recursos não utilizados para simplificar consumo, e refatorar
export const PanelSelector: React.FC<PanelSelectorProps> = ({
    municipalityName,
    contentWithoutTabs,
    breadcrumb,
    header,
}) => {
    return (
        <PanelSelectorWithCards
            {...header}
            municipality={municipalityName}
            breadcrumb={breadcrumb}
            listaNominalID={undefined}
            inicialContent={contentWithoutTabs}
            tabs={null}
            contentWithoutTabs={contentWithoutTabs}
        />
    );
};

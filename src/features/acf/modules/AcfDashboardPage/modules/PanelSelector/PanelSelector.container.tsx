import { getCardsProps } from "@/helpers/cardsList";
import type { ProfileIdValue } from "@/types/profile";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { captureException } from "@sentry/nextjs";
import type { AcfDashboardType } from "../../types";
import {
    externalCardsDetails,
} from "./PanelSelector.consts";
import { PanelSelector } from "./PanelSelector.presentation";
import { externalCardsAcfDashboardDataController } from "./modules/externalCards/externalCards.controller";

type PanelSelectorContainerProps = {
    municipalitySusId: string;
    teamIne: string;
    userProfiles: ProfileIdValue[];
    initialTabId: string;
    initialSubTabId: string;
    acfDashboardType: AcfDashboardType
}

// Container aqui se refere ao padrão Container/Presentation, descrito em: https://www.patterns.dev/react/presentational-container-pattern/
export const PanelSelectorContainer = async ({
    municipalitySusId,
    teamIne,
    userProfiles,
    initialTabId,
    initialSubTabId,
    acfDashboardType,
}: PanelSelectorContainerProps) => {
    let externalCardsProps: CardProps[] = [];
    
    try {
        const data = await externalCardsAcfDashboardDataController(
            acfDashboardType,
            municipalitySusId,
            teamIne,
            userProfiles,
        );
        externalCardsProps = getCardsProps(externalCardsDetails, data);
    } catch (error) {
        captureException(error);
        return <p>Erro ao buscar dados cards</p>;
    }
    return externalCardsProps && 
        <PanelSelector
                externalCardsProps={externalCardsProps}
                listName={acfDashboardType}
                tabID = {initialTabId}
                subTabID = {initialSubTabId}
        />
};

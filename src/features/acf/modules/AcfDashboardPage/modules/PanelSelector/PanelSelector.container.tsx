import { getCardsProps } from "@/helpers/cardsList";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { captureException } from "@sentry/nextjs";
import {
    externalCardsDetails,
} from "./PanelSelector.consts";
import { PanelSelector } from "./PanelSelector.presentation";
import { externalCardsAcfDashboardDataController } from "./modules/externalCards/externalCards.controller";

type PanelSelectorContainerProps = {
    municipalitySusId: string;
    teamIne: string;
    userProfiles: ProfileIdValue[];
    initialTabId: string | undefined;
    initialSubTabId: string | undefined;
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
    // biome-ignore lint/suspicious/noConsoleLog:please biome heppp
        console.log("antes externalCardsAcfDashboardDataController");
        const data = await externalCardsAcfDashboardDataController(
            acfDashboardType,
            municipalitySusId,
            teamIne,
            userProfiles,
        );

    // biome-ignore lint/suspicious/noConsoleLog:please biome heppp
        console.log("antes de getCardsProps");
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

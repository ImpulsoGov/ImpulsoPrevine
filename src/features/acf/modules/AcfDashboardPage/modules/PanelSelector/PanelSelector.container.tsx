import { getCardsProps } from "@/helpers/cardsList";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { captureException } from "@sentry/nextjs";
import type { ProfileIdValue } from "@types/profile";
import type { AcfDashboardType } from "../DashboardSelector/ExternalCardItem.model";
import { externalCardsAcfDashboardDataController } from "../DashboardSelector/externalCardsAcfDashboardData.controller";
import {
    externalCardsDetails,
} from "./PanelSelector.consts";
import { PanelSelector } from "./PanelSelector.presentation";

// Container aqui se refere ao padrão Container/Presentation, descrito em: https://www.patterns.dev/react/presentational-container-pattern/
export const PanelSelectorContainer = async ({
    searchParams,
    municipalitySusId,
    teamIne,
    profileId,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
    municipalitySusId: string;
    teamIne: string;
    profileId: ProfileIdValue[];
}) => {
    const resolvedSearchParams = await searchParams;
    const tabID = resolvedSearchParams?.tabID || "charts";
    const subTabID = resolvedSearchParams?.subTabID || "ChartSubTabID1";
    const listName = resolvedSearchParams.list || "DIABETES";

    let externalCardsProps: CardProps[] = [];

    try {
        const data = await externalCardsAcfDashboardDataController(
            (resolvedSearchParams.list || "DIABETES") as AcfDashboardType,
            municipalitySusId,
            teamIne,
            profileId,
        );
        externalCardsProps = getCardsProps(externalCardsDetails, data);
    } catch (error) {
        captureException(error);
        return <p>Erro ao buscar dados cards</p>;
    }
    return (
        AcfNominalListProps && (
            <PanelSelector
                    externalCardsProps={externalCardsProps}
                    listName={listName}
                    tabID = {tabID}
                    subTabID = {subTabID}
            />
        )
    );
};

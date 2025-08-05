import { externalCardsAcfDashboardDataControllerForTeam } from "@/features/acf/backend/diabetes/modules/externalCards/controller";
import { municipalityName } from "@/features/acf/frontend/common/MunicipalityName";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import { getExternalCardsProps } from "@/helpers/cardsList";
import { PROFILE_ID, type ProfileIdValue } from "@/types/profile";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { captureException } from "@sentry/nextjs";
import { externalCardsDetails } from "./consts";
import { PanelSelector } from "./presentation";

export type PanelSelectorContainerProps = {
    municipalitySusId: string;
    userProfiles: Array<ProfileIdValue>;
    initialTabId: string;
    initialSubTabId: string;
    acfDashboardType: AcfDashboardType;
    contentWithoutTabs?: React.ReactNode;
};

// Container aqui se refere ao padrão Container/Presentation, descrito em: https://www.patterns.dev/react/presentational-container-pattern/
export const PanelSelectorContainer: React.FC<PanelSelectorContainerProps> = ({
    municipalitySusId,
    userProfiles,
    initialTabId,
    initialSubTabId,
    acfDashboardType,
    contentWithoutTabs,
}) => {
    // let externalCardsProps: Array<CardProps> = [];
    // try {
    //     //TODO: Isso aqui é uma chamada inútil, os valores estão mockados e não são mostrados.
    //     const data = externalCardsAcfDashboardDataControllerForTeam(
    //         acfDashboardType,
    //         municipalitySusId,
    //         teamIne
    //     );
    //     externalCardsProps = getExternalCardsProps(externalCardsDetails, data);
    // } catch (error) {
    //     captureException(error);
    // }

    return (
        <PanelSelector
            municipalitySusId={municipalityName(municipalitySusId)}
            externalCardsProps={[]}
            listName={acfDashboardType}
            tabID={initialTabId}
            subTabID={initialSubTabId}
            userProfiles={userProfiles}
            contentWithoutTabs={contentWithoutTabs}
        />
    );
};

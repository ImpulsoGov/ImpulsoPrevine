import { municipalityName } from "@/features/acf/frontend/common/MunicipalityName";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import { type ProfileIdValue } from "@/types/profile";
import { PanelSelector } from "./presentation";

export type PanelSelectorContainerProps = {
    municipalitySusId: string;
    userProfiles: Array<ProfileIdValue>;
    initialTabId: string;
    initialSubTabId: string;
    acfDashboardType: AcfDashboardType;
    contentWithoutTabs?: React.ReactNode;
};

export const PanelSelectorContainer: React.FC<PanelSelectorContainerProps> = ({
    municipalitySusId,
    userProfiles,
    initialTabId,
    initialSubTabId,
    acfDashboardType,
    contentWithoutTabs,
}) => {
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

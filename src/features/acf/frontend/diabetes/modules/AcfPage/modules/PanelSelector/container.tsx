import { MUNICIPIOS } from "@/constants/municipios";
import { externalCardsAcfDashboardDataControllerForTeam } from "@/features/acf/backend/diabetes/modules/externalCards/controller";
import type { AcfDashboardType } from "@/features/acf/shared/diabetes/model";
import { getExternalCardsProps } from "@/helpers/cardsList";
import type { ProfileIdValue } from "@/types/profile";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { captureException } from "@sentry/nextjs";
import { externalCardsDetails } from "./consts";
import { List } from "./modules/List";
import { PanelSelector } from "./presentation";

export type PanelSelectorContainerProps = {
    municipalitySusId: string;
    teamIne: string;
    userProfiles: Array<ProfileIdValue>;
    initialTabId: string;
    initialSubTabId: string;
    acfDashboardType: AcfDashboardType;
};

//TODO: Mover esta função para algum lugar que seja reutilizável
export const municipalityName = (municipalityIdSus: string): string => {
    //TODO: Criar um mapa associativo municipioId->municipio e usar aqui
    const municipalityData = MUNICIPIOS.find(
        (municipality) => municipality.municipioIdSus === municipalityIdSus
    );

    //TODO: Tentar encontrar uma forma de tipar as coisas pra esse caso ser impossível.
    if (!municipalityData) {
        return "Município - UF";
    }

    return `${municipalityData.nome} - ${municipalityData.uf}`;
};

// Container aqui se refere ao padrão Container/Presentation, descrito em: https://www.patterns.dev/react/presentational-container-pattern/
export const PanelSelectorContainer: React.FC<PanelSelectorContainerProps> = ({
    municipalitySusId,
    teamIne,
    userProfiles,
    initialTabId,
    initialSubTabId,
    acfDashboardType,
}) => {
    let externalCardsProps: Array<CardProps> = [];
    try {
        //TODO: Isso aqui é uma chamada inútil, os valores estão mockados e não são mostrados.
        const data = externalCardsAcfDashboardDataControllerForTeam(
            acfDashboardType,
            municipalitySusId,
            teamIne
        );
        externalCardsProps = getExternalCardsProps(externalCardsDetails, data);
    } catch (error) {
        captureException(error);
    }

    return (
        <PanelSelector
            municipalityIdSus={municipalityName(municipalitySusId)}
            externalCardsProps={externalCardsProps}
            listName={acfDashboardType}
            tabID={initialTabId}
            subTabID={initialSubTabId}
            userProfiles={userProfiles}
            contentWithoutTabs={
                <List
                    list={acfDashboardType}
                    municipalitySusId={municipalitySusId}
                    teamIne={teamIne}
                />
            }
        />
    );
};

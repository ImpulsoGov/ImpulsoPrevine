import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";
import { getInternalCardsProps } from "@/helpers/cardsList";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { captureException } from "@sentry/nextjs";
import type { Dispatch, SetStateAction } from "react";
import { internalCardsDetails } from "../../../../../PanelSelector.consts";
import { internalCardsAcfDashboardDataControllerForTeam } from "./internalCards.controller";

export const internalCardsDataHook = async (
    listName: AcfDashboardType,
    municipalityIdSus: string,
    teamIne: string,
    setCards: Dispatch<SetStateAction<CardProps[]>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
) => {
    try {
        const internalCardsData = await internalCardsAcfDashboardDataControllerForTeam(
            listName,
            municipalityIdSus,
            teamIne,
        );
        const internalCardsProps = getInternalCardsProps(internalCardsDetails, internalCardsData);
        setCards(internalCardsProps);
        setErrorMessage("");
    } catch (error) {
        captureException(error);
        setErrorMessage(
            "Erro ao buscar dados dos cards internos, entre em contato com o suporte.",
        );
    }
}

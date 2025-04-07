import { getCardsData } from "@/services/lista-nominal/cards";
import type { Session } from "next-auth";
import { captureException } from "@sentry/nextjs";
import { getCardsProps } from "@/helpers/cardsList";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { cardsDetails } from "./cardsDetails";

export const getCardsDataResponse = async (
    user: Session["user"],
    list: string,
    setCards: React.Dispatch<React.SetStateAction<CardProps[]>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const currentURL = new URL(window.location.href).origin;
        const res = await getCardsData({
            token: user.access_token,
            listName: list,
            cardType: "internal",
            baseUrl: currentURL,
        });

        setCards([...getCardsProps(cardsDetails, res.data)]);
        setErrorMessage("");
    } catch (error) {
        captureException(error);
        setErrorMessage(
            "Erro ao buscar dados, entre em contato com o suporte.",
        );
    }
};
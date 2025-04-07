import type { CardType } from "@/app/api/card/utils/cardType";
import type { ExternalCardDataItem } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/externalCards/ExternalCardItem.model";
import axios from "axios";
import type { AxiosResponse } from "axios";

/**
 * Builds URL with given parameters
 * @param baseUrl - Base URL to add parameters to
 * @param params - Object containing listName, ine, cardType and municipio_id_sus
 * @returns URL with added query parameters
 */
export const buildUrlWithParams = (
    baseUrl: string,
    params?: {
        listName: string;
        cardType: CardType;
    },
): string => {
    let url = baseUrl;
    const { listName, cardType } = params || {};
    if (cardType) {
        url += `/${encodeURIComponent(cardType)}`;
    }
    if (listName) {
        url += `/${encodeURIComponent(listName)}`;
    }
    return url;
};

export type GetCardsDataProps = {
    token: string;
    listName: string;
    cardType: CardType;
    baseUrl: string;
    ine?: string;
};


export const getCardsData = async ({
    token,
    listName,
    cardType,
    baseUrl,
}: GetCardsDataProps): Promise<AxiosResponse<ExternalCardDataItem[]>> => {
    if (!token) throw new Error("Token de autenticação é obrigatório");
    if (!listName) throw new Error("Tipo de lista é obrigatório");
    if (!cardType) throw new Error("Tipo de card é obrigatório");
    if (!baseUrl) throw new Error("URL base é obrigatória");

    const url = `${baseUrl}/api/card`;
    const urlWithParams = buildUrlWithParams(url, { listName, cardType });

    return axios.request({
        method: "get",
        url: urlWithParams,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

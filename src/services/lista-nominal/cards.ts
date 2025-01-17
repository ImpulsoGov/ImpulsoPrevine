import { CardType } from "@/app/api/card/utils/cardType";
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
    listName: string,
    ine?: string,
    municipio_id_sus: string;
    cardType: CardType;
  }
): string => {
  let url = baseUrl;
  const { listName, ine, municipio_id_sus, cardType } = params || {};
  if (cardType) {
    url += `/${cardType}`;
  }
  if (listName) {
    url += `/${listName}`;
  }
  if (municipio_id_sus) {
    url += `/${municipio_id_sus}`;
  }
  if (ine) {
    url += `/${ine}`;
  }
  return url;
};

export type getCardsDataProps = {
  municipio_id_sus: string;
  token: string;
  listName: string;
  cardType: CardType;
  baseUrl: string;
  ine?: string;
};

export type CardsDataResponse = {
  municipio_id_sus: string;
  lista: string;
  descricao: string;
  valor: number;
  equipe_ine?: string;
}

export const getCardsData = async ({
  municipio_id_sus,
  token,
  listName,
  cardType,
  ine,
  baseUrl,
}: getCardsDataProps): Promise<AxiosResponse<CardsDataResponse[]>> => {
  if (!token) throw new Error('Token de autenticação é obrigatório');
  if (!municipio_id_sus) throw new Error('ID do município é obrigatório');
  if (!listName) throw new Error('Tipo de lista é obrigatório');
  if (!cardType) throw new Error('Tipo de card é obrigatório');
  if (!baseUrl) throw new Error('URL base é obrigatória');

  const url = `${baseUrl}/api/card`;
  const urlWithParams = buildUrlWithParams(url, { listName, ine, municipio_id_sus, cardType });

  return axios.request({
    method: 'get',
    maxBodyLength: Number.POSITIVE_INFINITY,
    url: urlWithParams,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

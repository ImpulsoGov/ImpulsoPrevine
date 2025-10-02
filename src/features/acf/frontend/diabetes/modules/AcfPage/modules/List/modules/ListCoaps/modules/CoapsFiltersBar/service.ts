"use client";
import type * as schema from "@/features/acf/shared/hypertension/schema";
import type { AxiosResponse } from "axios";
import axios from "axios";

export const getFiltersCoaps = async (
    access_token: string
): Promise<AxiosResponse<schema.CoapsFiltersResponse>> => {
    const currentURL = new URL(window.location.href);
    const url = `${currentURL.origin}/api/cofin25/indicadores/cuidado_da_pessoa_com_hipertensao/coaps/filtros`;
    //TODO: Criar uma camada de abstração fina entre nosso código e o axios, colocar os headers e maxBodyLength lá ao invés de duplicar
    return axios.request({
        method: "GET",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url,
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
};

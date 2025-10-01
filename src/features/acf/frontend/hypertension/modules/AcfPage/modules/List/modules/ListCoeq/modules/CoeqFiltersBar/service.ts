"use client";
import type * as schema from "@/features/acf/shared/hypertension/schema";
import type { AxiosResponse } from "axios";
import axios from "axios";
//TODO: Generalizar essa função para ele receber um <TSchema> e uma url
//TODO: Introduzir um type alias pro access_token ao invés de string
export const getFiltersCoeq = async (
    access_token: string
): Promise<AxiosResponse<schema.CoeqFiltersResponse>> => {
    const currentURL = new URL(window.location.href);
    const url = `${currentURL.origin}/api/cofin25/indicadores/cuidado_da_pessoa_com_hipertensao/coeq/filtros`;
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

"use client";
import type * as schema from "@/features/acf/shared/schema";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { AcfDashboardType } from "@/features/acf/shared/AcfDashboard";
import { acfDashboardMap } from "@/features/acf/shared/AcfDashboard";
import type { ServiceGetFilters } from "./container";
import type { CoordinatorProfile } from "@/features/acf/shared/model";

export const getFiltersBuilder = <
    TResponse extends { filters: schema.FilterResponses },
>(
    acfDashboardType: AcfDashboardType,
    coordinatorProfile: CoordinatorProfile
): ServiceGetFilters<TResponse> => {
    return async (access_token: string): Promise<AxiosResponse<TResponse>> => {
        if (!access_token)
            throw new Error("Token de autenticação é obrigatório");
        const currentURL = new URL(window.location.href);
        const url = `${currentURL.origin}/api/cofin25/indicadores/${acfDashboardMap[acfDashboardType]}/${coordinatorProfile}/filtros`;

        return axios.request({
            method: "GET",
            maxBodyLength: Number.POSITIVE_INFINITY,
            url,
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        });
    };
};

"use client";
import type * as schema from "@/features/acf/shared/diabetes/schema";
import { AxiosError, type AxiosResponse } from "axios";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, {
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";
import type { SelectConfig } from "../SelectConfig";
import type { AppliedFilters } from "../WithFilters";
import * as Presentation from "./presentation";

type ServiceGetFilters<TResponse> = (
    access_token: string
) => Promise<AxiosResponse<TResponse>>;

type FiltersBarProps<
    TAppliedFilters extends AppliedFilters,
    TFiltersResponse extends schema.FilterResponses,
    TResponse,
> = React.PropsWithChildren<{
    selectedValues: TAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
    filtersToSelectConfigs: (filters: TFiltersResponse) => Array<SelectConfig>;
    serviceGetFilters: ServiceGetFilters<TResponse>;
}>;

const fetchFilters = <TResponse,>(
    session: Session | null,
    setResponse: Dispatch<
        SetStateAction<AxiosResponse<TResponse> | AxiosError | null>
    >,
    serviceGetFilters: ServiceGetFilters<TResponse>
): void => {
    if (!session?.user) {
        return;
    }

    serviceGetFilters(session.user.access_token)
        .then((response) => {
            setResponse(response);
        })
        .catch((error: unknown) => {
            //TODO: generalizar esse error handling e reutilizar
            if (error instanceof AxiosError) {
                setResponse(error);
            }
            if (error instanceof Error) {
                console.error(
                    `Erro ao buscar os valores possíveis de filtro. Razão: ${error}`
                );
            }
        });
};

export const FiltersBar = <
    TAppliedFilters extends AppliedFilters,
    TFiltersResponses extends schema.FilterResponses,
    TResponse extends { filters: TFiltersResponses },
>({
    selectedValues,
    setSelectedValues,
    filtersToSelectConfigs,
    serviceGetFilters,
}: FiltersBarProps<
    TAppliedFilters,
    TFiltersResponses,
    TResponse
>): React.ReactNode => {
    const { data: session } = useSession();
    //TODO: Criar type alias pra AxiosResponse | AxiosError | null
    const [response, setResponse] = useState<
        AxiosResponse<TResponse> | AxiosError | null
    >(null);

    useEffect(() => {
        fetchFilters(session, setResponse, serviceGetFilters);
    }, []);

    //Na teoria, isso não deve ser mostrado nunca, por conta do SessionGuard
    if (!session?.user) {
        return <span>Usuário não está logado.</span>;
    }

    //TODO: Generalizar esse loading + error handling num componente
    if (!response) {
        //TODO: Desenhar um shim bonitinho pros campos
        return <span>Carregando os filtros...</span>;
    }

    if (response instanceof AxiosError) {
        return (
            <span style={{ color: "red" }}>
                Não foi possível carregar os campos de filtro!
            </span>
        );
    }

    const selectConfigs = filtersToSelectConfigs(response.data.filters);

    return (
        <Presentation.FiltersBar
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            selectConfigs={selectConfigs}
        ></Presentation.FiltersBar>
    );
};

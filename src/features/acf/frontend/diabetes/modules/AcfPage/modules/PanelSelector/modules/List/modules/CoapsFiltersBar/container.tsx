"use client";
import type * as schema from "@/features/acf/shared/diabetes/schema";
import { AxiosError, type AxiosResponse } from "axios";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
//TODO: Mover este tipo para um lugar em comum entre DataTable e FilterBar
import { toSelectConfigsCoaps } from "./logic";
import * as Presentation from "./presentation";
import * as service from "./service";
import type { AppliedFiltersCoaps } from "../DataTable/model";

type CoapsFiltersBarProps = React.PropsWithChildren<{
    selectedValues: AppliedFiltersCoaps;
    setSelectedValues: Dispatch<SetStateAction<AppliedFiltersCoaps>>;
    // searchParams: URLSearchParams;
}>;

const fetchCoapsFilters = (
    session: Session | null,
    setResponse: Dispatch<
        SetStateAction<
            AxiosResponse<schema.CoapsFiltersResponse> | AxiosError | null
        >
    >
): void => {
    if (!session?.user) {
        return;
    }

    service
        .getFiltersCoaps(session.user.access_token)
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

export const CoapsFiltersBar: React.FC<CoapsFiltersBarProps> = ({
    selectedValues,
    setSelectedValues,
}) => {
    const { data: session } = useSession();
    //TODO: Criar type alias pra AxiosResponse | AxiosError | null
    const [response, setResponse] = useState<
        AxiosResponse<schema.CoapsFiltersResponse> | AxiosError | null
    >(null);

    useEffect(() => {
        fetchCoapsFilters(session, setResponse);
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

    const selectConfigs = toSelectConfigsCoaps(response.data.filters);
    console.log("selectConfigs", selectConfigs);
    return (
        <Presentation.FiltersBar
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            selectConfigs={selectConfigs}
        ></Presentation.FiltersBar>
    );
};

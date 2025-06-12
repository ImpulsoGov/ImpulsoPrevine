"use client";
import type { PossibleSelectedFilterValues } from "@features/acf/common/frontend/WithFilters";
import type * as schema from "@features/acf/diabetes/common/schema";
import { AxiosError, type AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { toSelectConfigsCoeqs } from "./logic";
import * as Presentation from "./presentation";
import { getFiltersCoeq } from "./service";

type FiltersBarCoeqProps = React.PropsWithChildren<{
    selectedValues: PossibleSelectedFilterValues;
    setSelectedValues: Dispatch<SetStateAction<PossibleSelectedFilterValues>>;
    // searchParams: URLSearchParams;
}>;

export const FiltersBarCoeq: React.FC<FiltersBarCoeqProps> = ({
    selectedValues,
    setSelectedValues,
    // searchParams,
}) => {
    const { data: session } = useSession();
    //TODO: Criar type alias pra AxiosResponse | AxiosError | null
    const [response, setResponse] = useState<
        AxiosResponse<schema.CoeqFiltersResponse> | AxiosError | null
    >(null);

    useEffect(() => {
        if (!session?.user) {
            return;
        }

        getFiltersCoeq(session.user.access_token)
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

    const selectConfigs = toSelectConfigsCoeqs(response.data.filters);

    return (
        <Presentation.FiltersBar
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            selectConfigs={selectConfigs}
        ></Presentation.FiltersBar>
    );
};

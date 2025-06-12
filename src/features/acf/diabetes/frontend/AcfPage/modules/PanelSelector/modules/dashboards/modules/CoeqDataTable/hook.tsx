import type * as schema from "@/features/acf/diabetes/common/schema";
import type { GridSortItem } from "@mui/x-data-grid";
import type { AxiosResponse } from "axios";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { SelectedFilterValuesCoeq } from "./model";
import * as service from "./service";

export const useTableData = (
    page: number,
    filters: SelectedFilterValuesCoeq | null,
    sorting: GridSortItem,
    search: string,
    resetPagination: () => void
): {
    data: schema.CoeqPageResponse | undefined;
    status: number | undefined;
    isLoading: boolean;
} => {
    const { data: session } = useSession();
    const [response, setResponse] =
        useState<AxiosResponse<schema.CoeqPageResponse> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<Session["user"]>();

    useEffect(() => {
        resetPagination();
    }, [filters, sorting, search]);

    useEffect(() => {
        setUser(session?.user);
    }, [session?.user]);

    useEffect(() => {
        const getResponse = async (): Promise<void> => {
            if (!user) {
                return;
            }
            setIsLoading(true);
            const res = await service.getCoeqPage(
                Object.assign(
                    {
                        token: user.access_token,
                        sorting: {
                            field: sorting.field,
                            sort: sorting.sort,
                        },
                        page: page,
                        search: search,
                    },
                    !filters ? {} : { filters: filters }
                )
            );
            setResponse(res);
            setIsLoading(false);
        };

        void getResponse();
    }, [user, page, filters, sorting, search]);
    return { data: response?.data, status: response?.status, isLoading };
};

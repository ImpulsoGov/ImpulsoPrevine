import type * as schema from "@/features/acf/diabetes/common/schema";
import type { SelectedFilterValues } from "@/features/acf/diabetes/frontend/model";
import * as service from "@/features/acf/diabetes/frontend/service";
import type { GridSortItem } from "@mui/x-data-grid";
import type { AxiosResponse } from "axios";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useTableData = (
    page: number,
    filters: SelectedFilterValues,
    sorting: GridSortItem,
    search: string,
    resetPagination: () => void
): {
    data: schema.Response | undefined;
    status: number | undefined;
    isLoading: boolean;
} => {
    const { data: session } = useSession();
    const [response, setResponse] =
        useState<AxiosResponse<schema.Response> | null>(null);
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
            const res = await service.getPage({
                token: user.access_token,
                sorting: {
                    field: sorting.field,
                    sort: sorting.sort,
                },
                filters: filters,
                page: page,
                search: search,
            });
            setResponse(res);
            setIsLoading(false);
        };

        void getResponse();
    }, [user, page, filters, sorting, search]);
    return { data: response?.data, status: response?.status, isLoading };
};

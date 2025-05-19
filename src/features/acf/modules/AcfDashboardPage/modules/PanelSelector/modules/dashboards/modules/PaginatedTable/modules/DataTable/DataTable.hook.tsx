import type { AcfDashboardType } from '@/features/acf/modules/AcfDashboardPage/types';
import { type FilterItem, getListData, type ListDataResponse } from '@/services/lista-nominal/ListaNominal';
import type { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import type { Session } from "next-auth";
import type { GridPaginationModel } from '@mui/x-data-grid';

export const tableDataHook = (
    acfDashboardType: AcfDashboardType,
    paginationModel: GridPaginationModel,
    filters: FilterItem
) => {
    const { data: session } = useSession();
    const [response, setResponse] = useState<AxiosResponse<ListDataResponse> | null >(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [user, setUser] = useState<Session["user"]>();
    useEffect(() => setUser(session?.user), [session?.user]);

    useEffect(() => {
        const getResponse = async () => {
            if (!user) { return; }
            setIsLoading(true);
            const res = await getListData({
                token: user.access_token,
                listName: acfDashboardType,
                // sorting: [
                //     {
                //         sortField: sorting[0].field,
                //         sortOrder: sorting[0].sort,
                //     },
                // ],
                filters: filters,
                pagination: paginationModel,
                // search: search,
            });
            setResponse(res);
            setIsLoading(false);
        }

        getResponse();
    }, [user, acfDashboardType, paginationModel, filters]);
    return { data : response?.data, status : response?.status, isLoading };
}
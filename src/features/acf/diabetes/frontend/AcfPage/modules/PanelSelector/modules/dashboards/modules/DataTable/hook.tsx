import type { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import type { Session } from "next-auth";
import * as service from '@/features/acf/diabetes/frontend/service';
import type * as schema from "@/features/acf/diabetes/common/schema";
import type { SelectedValues } from "@/features/acf/diabetes/frontend/model";

export const useTableData = (
    page: number,
    filters: SelectedValues
) => {
    const { data: session } = useSession();
    const [response, setResponse] = useState<AxiosResponse<schema.Response> | null >(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [user, setUser] = useState<Session["user"]>();
    useEffect(() => { setUser(session?.user); }, [session?.user]);

    useEffect(() => {
        const getResponse = async () => {
            if (!user) { return; }
            setIsLoading(true);
            const res = await service.getPage({
                token: user.access_token,
                // sorting: [
                //     {
                //         sortField: sorting[0].field,
                //         sortOrder: sorting[0].sort,
                //     },
                // ],
                filters: filters,
                page: page,
                // search: search,
            });
            setResponse(res);
            setIsLoading(false);
        }

        getResponse();
    }, [user, page, filters]);
    return { data : response?.data, status : response?.status, isLoading };
}
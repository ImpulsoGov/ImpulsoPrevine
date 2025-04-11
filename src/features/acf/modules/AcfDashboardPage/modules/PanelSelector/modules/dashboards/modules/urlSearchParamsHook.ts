import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import type { GridSortModel } from "@mui/x-data-grid";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const urlSearchParamsHook = (
    searchParams: URLSearchParams,
    sorting: GridSortModel,
    router: AppRouterInstance,
    value: FilterItem,
    list: AcfDashboardType
) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, valueString] of Object.entries(value)) {
        params.set(key, valueString as string);
    }
    params.set("sort", sorting[0].field as string);
    params.set("order", sorting[0].sort as string);
    params.set("list", list);
    router.push(`?${params.toString()}`);
}
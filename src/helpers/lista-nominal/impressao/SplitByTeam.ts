import type { DataItem } from "@/utils/FilterData";

export const SplitByTeam = (data: DataItem[], propPrintGrouping: string) =>
    data.reduce<Record<string, DataItem[]>>((acc, currentObject) => {
        const aggregationKey: string = String(currentObject[propPrintGrouping]);
        if (!acc[aggregationKey]) {
            acc[aggregationKey] = [];
        }
        acc[aggregationKey].push(currentObject);
        return acc;
    }, {});

import type { AllPagesResponse } from "@/features/acf/shared/schema";

export const SplitByProp = <TResponse extends AllPagesResponse>(
    data: Array<TResponse>,
    propPrintGrouping: keyof TResponse
): Record<string, Array<TResponse>> =>
    data.reduce<Record<string, Array<TResponse>>>((acc, currentObject) => {
        const aggregationKey: string = String(currentObject[propPrintGrouping]);
        if (!(aggregationKey in acc)) {
            acc[aggregationKey] = [];
        }
        acc[aggregationKey].push(currentObject);
        return acc;
    }, {});

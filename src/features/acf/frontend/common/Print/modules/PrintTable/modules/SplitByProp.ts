import type { AcfItem } from "@/features/acf/shared/schema";

export const SplitByProp = <TAcfItem extends AcfItem>(
    data: Array<TAcfItem>,
    propPrintGrouping: keyof TAcfItem
): Record<string, Array<TAcfItem>> =>
    data.reduce<Record<string, Array<TAcfItem>>>((acc, currentObject) => {
        const aggregationKey: string = String(currentObject[propPrintGrouping]);
        if (!(aggregationKey in acc)) {
            acc[aggregationKey] = [];
        }
        acc[aggregationKey].push(currentObject);
        return acc;
    }, {});

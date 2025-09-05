import type { AcfItem } from "@/features/acf/shared/schema";
import type { ColumnsProps } from "../model";

export type SplitedByProp<TAcfItem extends AcfItem> = {
    [key: string]: {
        data: Array<TAcfItem>;
        title: string;
    };
};

export const SplitByProp = <TAcfItem extends AcfItem>(
    data: Array<TAcfItem>,
    propPrintGrouping: keyof TAcfItem,
    columns: Array<ColumnsProps<TAcfItem>>
): SplitedByProp<TAcfItem> => {
    const column = columns.find((col) =>
        col.fields.includes(propPrintGrouping)
    );
    const titleFormatter = column?.titleFormatter;
    return data.reduce<SplitedByProp<TAcfItem>>((acc, currentObject) => {
        const aggregationKey: string = String(currentObject[propPrintGrouping]);
        if (!(aggregationKey in acc)) {
            acc[aggregationKey] = {
                data: [],
                title: titleFormatter
                    ? titleFormatter(aggregationKey)
                    : aggregationKey,
            };
        }
        acc[aggregationKey]["data"].push(currentObject);
        return acc;
    }, {});
};

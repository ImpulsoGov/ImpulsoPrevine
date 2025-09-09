import type { AcfItem } from "@/features/acf/shared/schema";
import type { ColumnsProps } from "../../model";
import { SortByKey } from "../SortByKey";
import type { GridSortItem } from "@mui/x-data-grid";

export type SplitedByProp<TAcfItem extends AcfItem> = {
    [key: string]: {
        data: Array<TAcfItem>;
        title: string;
    };
};

export type OrderedSplitedByProp<TAcfItem extends AcfItem> = {
    [key: string]: {
        data: Array<TAcfItem>;
        title: string;
    };
};

export const SplitByProp = <TAcfItem extends AcfItem>(
    data: Array<TAcfItem>,
    propPrintGrouping: keyof TAcfItem,
    titleFormatter?: ColumnsProps<TAcfItem>["titleFormatter"]
): SplitedByProp<TAcfItem> => {
    const splitByProp = data.reduce<SplitedByProp<TAcfItem>>(
        (acc, currentObject) => {
            const aggregationKey: string = String(
                currentObject[propPrintGrouping]
            );
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
        },
        {}
    );

    return splitByProp;
};

export const getTitle = <TAcfItem extends AcfItem>(
    columns: Array<ColumnsProps<TAcfItem>>,
    propPrintGrouping: keyof TAcfItem
): ColumnsProps<TAcfItem>["titleFormatter"] | undefined => {
    const column = columns.find((col) =>
        col.fields.includes(propPrintGrouping)
    );
    return column?.titleFormatter;
};

export const orderSplitData = <TAcfItem extends AcfItem>(
    splitByProp: SplitedByProp<TAcfItem>,
    propPrintGrouping: keyof TAcfItem,
    order: GridSortItem
): SplitedByProp<TAcfItem> => {
    const data = structuredClone(splitByProp);
    for (const group of Object.values(data)) {
        group.data
            .sort((a, b) =>
                SortByKey({
                    a,
                    b,
                    key: propPrintGrouping,
                    order: "asc",
                })
            )
            .sort((a, b) =>
                SortByKey({
                    a,
                    b,
                    key: order.field as keyof TAcfItem,
                    order: order.sort ?? "asc",
                })
            );
    }
    return data;
};

export const OrderedSplitByProp = <TAcfItem extends AcfItem>(
    data: Array<TAcfItem>,
    propPrintGrouping: keyof TAcfItem,
    columns: Array<ColumnsProps<TAcfItem>>,
    orderByKey: boolean,
    order: GridSortItem
): OrderedSplitedByProp<TAcfItem> => {
    const splitByProp = SplitByProp(
        data,
        propPrintGrouping,
        getTitle(columns, propPrintGrouping)
    );

    return orderByKey
        ? splitByProp
        : orderSplitData(splitByProp, propPrintGrouping, order);
};

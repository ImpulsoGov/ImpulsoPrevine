import type { AcfItem } from "@/features/acf/shared/schema";
import type { ReactElement } from "react";
import type { AppliedFilters } from "@features/acf/frontend/common/WithFilters";

export type PrintListProps<
    TAcfItem extends AcfItem,
    TFilters extends AppliedFilters,
> = {
    listTitle: string;
    propPrintGrouping: keyof TAcfItem;
    printCaption?: Array<ReactElement>;
    filtersLabels: Record<keyof TFilters, string>;
};

type RenderCell = (param: unknown) => React.ReactNode;

export type ColumnsProps<TAcfItem extends AcfItem> = {
    fields: Array<keyof TAcfItem>;
    headerName: string;
    width: {
        portrait: number;
        landscape: number;
    };
    verticalDivider?: boolean;
    renderCell?: RenderCell;
};

export type LayoutOrientation = "landscape" | "portrait";

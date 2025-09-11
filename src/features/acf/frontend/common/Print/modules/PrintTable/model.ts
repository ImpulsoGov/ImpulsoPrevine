import type { AcfItem } from "@/features/acf/shared/schema";
import type { PropsWithChildren, ReactElement } from "react";
import type { AppliedFilters } from "@features/acf/frontend/common/WithFilters";
import type { SplitByProp } from "./modules/SplitByProp";

export type PropTriggerPrintWithoutModal = "careTeamName" | "microAreaName";

export type PrintListProps<
    TAcfItem extends AcfItem,
    TFilters extends AppliedFilters,
> = {
    listTitle: string;
    splitBy: keyof TAcfItem;
    orderBy?: keyof TAcfItem;
    printCaption?: Array<ReactElement>;
    filtersLabels: Record<keyof TFilters, string>;
    propTriggerPrintWithoutModal: PropTriggerPrintWithoutModal;
};

export type SortCallback<TItem> = (a: TItem, b: TItem) => number;

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
    titleFormatter?: (value: unknown) => string;
};

export type LayoutOrientation = "landscape" | "portrait";

export type SplitGroupPerBlockProps<TAcfItem extends AcfItem> =
    PropsWithChildren<{
        data: SplitByProp<TAcfItem>;
        columns: Array<ColumnsProps<TAcfItem>>;
        sortedKeys: Array<keyof TAcfItem>;
    }>;

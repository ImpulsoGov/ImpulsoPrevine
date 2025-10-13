import type { BreastAndUterusCareItem } from "../../breastAndUterusCare";

type RenderCell = (param: unknown) => React.ReactNode;

export type ColumnsProps<TSearchPlusItem extends SearchPlusItem> = {
    fields: Array<keyof TSearchPlusItem>;
    headerName?: string;
    width: {
        portrait: number;
        landscape: number;
    };
    verticalDivider?: boolean;
    renderCell?: RenderCell;
    titleFormatter?: (value: unknown) => string;
    renderHeader?: () => React.ReactNode;
};

//TODO: tornar polimórfico
export type SearchPlusItem = BreastAndUterusCareItem;

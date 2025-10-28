import type { BreastAndUterusCareItem } from "./modules/breastAndUterusCare";
import {
    breastAndUterusCareColumns,
    csvRowToBreastAndUterusCareItem,
} from "./modules/breastAndUterusCare";

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

export const THEMATIC_LISTS = ["Saúde da mulher"] as const;

export type ThematicList = (typeof THEMATIC_LISTS)[number];

export const ListTitles = {
    "Saúde da mulher":
        "LISTA NOMINAL CUIDADO DA MULHER E DO HOMEM TRANSGENERO NA PREVENÇÃO DO CÂNCER",
};

export type Lists = "breastAndUterusCare";

export const adaptersMap = {
    breastAndUterusCare: csvRowToBreastAndUterusCareItem,
};

export const columns: Record<
    ThematicList,
    Array<ColumnsProps<SearchPlusItem>>
> = {
    "Saúde da mulher": breastAndUterusCareColumns,
};

export const csvListTitleToListKey: Record<ThematicList, Lists> = {
    "Saúde da mulher": "breastAndUterusCare",
};

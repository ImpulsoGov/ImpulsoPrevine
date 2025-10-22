import {
    breastAndUterusCareColumns,
    csvRowToBreastAndUterusCareItem,
} from "./modules/breastAndUterusCare";
import type { ColumnsProps, SearchPlusItem } from "./model";

export { breastAndUterusCareColumns };
export type { ColumnsProps, SearchPlusItem } from "./model";

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

export type { Status } from "./modules/breastAndUterusCare/modules/goodPractices";

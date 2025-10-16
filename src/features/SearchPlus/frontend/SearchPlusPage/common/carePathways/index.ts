//TODO: o nome businessRules não é final, e sabemos que ele não é bom.
//  Estamos usando ele por enquanto para destravar e ver se encontramos um nome novo melhor
//  depois.

import {
    breastAndUterusCareColumns,
    csvRowToBreastAndUterusCareItem,
} from "./modules/breastAndUterusCare";
import type { ColumnsProps, SearchPlusItem } from "./model";

export { breastAndUterusCareColumns };
export type { ColumnsProps, SearchPlusItem } from "./model";

export type ListTitles = "Saúde da mulher";

export type Lists = "breastAndUterusCare";

export const adaptersMap = {
    breastAndUterusCare: csvRowToBreastAndUterusCareItem,
};

export const columns: Record<Lists, Array<ColumnsProps<SearchPlusItem>>> = {
    breastAndUterusCare: breastAndUterusCareColumns,
};

export const csvListTitleToListKey: Record<ListTitles, Lists> = {
    "Saúde da mulher": "breastAndUterusCare",
};

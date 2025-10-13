import { csvRowToBreastAndUterusCareItem } from "../breastAndUterusCare";

export type ListTitles = "Saúde da mulher";

export type ListKeys = "breastAndUterusCare";

export const csvListTitleToListKey: Record<ListTitles, ListKeys> = {
    "Saúde da mulher": "breastAndUterusCare",
};

export const adaptersMap = {
    breastAndUterusCare: csvRowToBreastAndUterusCareItem,
};

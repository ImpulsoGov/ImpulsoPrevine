import type { BreastAndUterusCareItem } from "./modules/breastAndUterusCare";
import {
    breastAndUterusCareColumns,
    csvRowToBreastAndUterusCareItem,
} from "./modules/breastAndUterusCare";
import {
    type PregnancyAndPuerperiumCareItem,
    csvRowToPregnancyAndPuerperiumCareItem,
    pregnancyAndPuerperiumCareColumns,
} from "./modules/pregnancyAndPuerperiumCare";

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
export type SearchPlusItem =
    | BreastAndUterusCareItem
    | PregnancyAndPuerperiumCareItem;

export const THEMATIC_LISTS = [
    "Saúde da mulher",
    "Gestantes e puérperas",
] as const;

export type ThematicList = (typeof THEMATIC_LISTS)[number];

export const ListTitles = {
    "Saúde da mulher":
        "CUIDADO DA MULHER E DO HOMEM TRANSGÊNERO NA PREVENÇÃO DO CÂNCER",
    "Gestantes e puérperas": "CUIDADO DA GESTANTE E PUÉRPERA",
};

export type Lists = "breastAndUterusCare" | "pregnancyAndPuerperiumCare";

export const adaptersMap = {
    breastAndUterusCare: csvRowToBreastAndUterusCareItem,
    pregnancyAndPuerperiumCare: csvRowToPregnancyAndPuerperiumCareItem,
};

type ColumnsByThematicList = {
    "Saúde da mulher": Array<ColumnsProps<BreastAndUterusCareItem>>;
    "Gestantes e puérperas": Array<
        ColumnsProps<PregnancyAndPuerperiumCareItem>
    >;
};

export const columns: ColumnsByThematicList = {
    "Saúde da mulher": breastAndUterusCareColumns,
    "Gestantes e puérperas": pregnancyAndPuerperiumCareColumns,
};

export const csvListTitleToListKey: Record<ThematicList, Lists> = {
    "Saúde da mulher": "breastAndUterusCare",
    "Gestantes e puérperas": "pregnancyAndPuerperiumCare",
};

import type { BreastAndUterusCareItem } from "./modules/BreastAndUterusCare";
import {
    breastAndUterusCareColumns,
    csvRowToBreastAndUterusCareItem,
} from "./modules/BreastAndUterusCare";
import {
    type PregnancyAndPuerperiumCareItem,
    csvRowToPregnancyAndPuerperiumCareItem,
    pregnancyAndPuerperiumCareColumns,
} from "./modules/PregnancyAndPuerperiumCare";

type RenderCell = (param: unknown) => React.ReactNode;

export type ColumnsProps = {
    fields: Array<
        keyof BreastAndUterusCareItem | keyof PregnancyAndPuerperiumCareItem
    >;
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

export const THEMATIC_LISTS = [
    "Saúde da mulher",
    "Gestação e puerpério",
] as const;

export type ThematicList = (typeof THEMATIC_LISTS)[number];

export const ListTitles = {
    "Saúde da mulher":
        "CUIDADO DA MULHER E DO HOMEM TRANSGÊNERO NA PREVENÇÃO DO CÂNCER",
    "Gestação e puerpério": "CUIDADO DA GESTANTE E PUÉRPERA",
};

export type Lists = "breastAndUterusCare" | "pregnancyAndPuerperiumCare";

type AdaptersByList = {
    breastAndUterusCare: typeof csvRowToBreastAndUterusCareItem;
    pregnancyAndPuerperiumCare: typeof csvRowToPregnancyAndPuerperiumCareItem;
};

export const adaptersMap: AdaptersByList = {
    breastAndUterusCare: csvRowToBreastAndUterusCareItem,
    pregnancyAndPuerperiumCare: csvRowToPregnancyAndPuerperiumCareItem,
};

type ColumnsByThematicList = {
    "Saúde da mulher": Array<ColumnsProps>;
    "Gestação e puerpério": Array<ColumnsProps>;
};

export const columns: ColumnsByThematicList = {
    "Saúde da mulher": breastAndUterusCareColumns,
    "Gestação e puerpério": pregnancyAndPuerperiumCareColumns,
};

export const csvListTitleToListKey: Record<ThematicList, Lists> = {
    "Saúde da mulher": "breastAndUterusCare",
    "Gestação e puerpério": "pregnancyAndPuerperiumCare",
};

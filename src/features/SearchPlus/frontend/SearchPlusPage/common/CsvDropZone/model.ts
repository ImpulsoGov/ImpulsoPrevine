import type {
    BreastAndUterusCareCsvRow,
    PatientData,
} from "../../breastAndUterusCare";

export type CsvRow = BreastAndUterusCareCsvRow;

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

export type LayoutOrientation = "landscape" | "portrait";

type RenderCell = (param: unknown) => React.ReactNode;

export type SearchPlusItem = PatientData;

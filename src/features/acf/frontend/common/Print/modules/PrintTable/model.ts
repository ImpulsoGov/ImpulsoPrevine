import type { AllPagesResponse } from "@/features/acf/shared/schema";
import type { ReactElement } from "react";

// TODO: adicionar generics nos tipos que usam AllPagesResponse
export type PrintListProps = {
    listTitle: string;
    propPrintGrouping: keyof AllPagesResponse;
    printCaption?: Array<ReactElement>;
    filtersLabels: Record<string, string>;
};

type RenderCell = (param: unknown) => React.ReactNode;

export type ColumnsProps = {
    fields: Array<keyof AllPagesResponse>;
    headerName: string;
    width: {
        portrait: number;
        landscape: number;
    };
    verticalDivider?: boolean;
    renderCell?: RenderCell;
};

export type LayoutOrientation = "landscape" | "portrait";

import type { AllPagesResponse } from "@/features/acf/shared/schema";
import type { ReactElement } from "react";

export type ModalLabels = {
    title: string;
    primaryCustomOption: {
        title: string;
        description: string;
        splitTeam: string;
        noSplit: string;
    };
    secondaryCustomOption: {
        title: string;
        recommendation: string;
        splitGroupPerPage: string;
        ordering?: string;
    };
    button: string;
};

//TODO: Rever esse tipo
export type PrintColumnsWidthProps = {
    portrait: Record<keyof AllPagesResponse, string>;
    landscape: Record<keyof AllPagesResponse, string>;
};

export type PrintListProps = {
    listTitle: string;
    propPrintGrouping: string;
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

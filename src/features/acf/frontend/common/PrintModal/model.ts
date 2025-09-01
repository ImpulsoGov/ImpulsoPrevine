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
type PrintColumnsWidthProps = {
    [key: string]: string;
};

export type PrintListProps = {
    listTitle: string;
    printColumnsWidth: PrintColumnsWidthProps;
    verticalDivider: Array<number>;
    propPrintGrouping: string;
    printCaption?: Array<ReactElement>;
    filtersLabels: Record<string, string>;
};

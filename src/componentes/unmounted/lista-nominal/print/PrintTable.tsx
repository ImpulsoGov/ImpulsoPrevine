import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import type { DiabetesAcfPrintItem } from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/List/modules/print/diabetes/print.model";
import { SplitByTeam } from "@helpers/lista-nominal/impressao/SplitByTeam";
import type { GridColDef } from "@mui/x-data-grid";
import { MultipleTeamsPerPage } from "./MultipleTeamsPerPage";
import { NoSplit } from "./NoSplit";
import { SingleTeamPerPage } from "./SingleTeamPerPage";

export type PrintColumnsWidthProps = {
    portrait: Record<string, string>;
    landscape: Record<string, string>;
};

export type PrintTableProps = {
    data: DiabetesAcfPrintItem[];
    columns: GridColDef[];
    list: string;
    appliedFilters: FilterItem;
    dataSplit: boolean;
    pageSplit: boolean;
    latestProductionDate: string;
    auxiliaryLists?: Record<string, Record<string, string>>;
    printColumnsWidth: PrintColumnsWidthProps;
    verticalDivider: number[];
    fontFamily: string;
    propPrintGrouping: string;
    printLegend?: string[];
    filtersLabels: Record<string, string>;
};

export const PrintTable = ({
    data,
    columns,
    list,
    appliedFilters,
    dataSplit,
    pageSplit,
    latestProductionDate,
    auxiliaryLists,
    printColumnsWidth,
    verticalDivider,
    fontFamily = "sans-serif",
    propPrintGrouping,
    printLegend,
    filtersLabels,
}: PrintTableProps) => {
    const teamSplit = SplitByTeam(data, propPrintGrouping);
    return (
        <div
            key="print-table"
            className="largura"
            style={{
                fontFamily: `${fontFamily}, sans-serif`,
            }}
        >
            {dataSplit && !pageSplit && (
                <MultipleTeamsPerPage
                    teamSplit={teamSplit}
                    header={{
                        appliedFilters: appliedFilters,
                        filtersLabels: filtersLabels,
                        latestProductionDate: latestProductionDate,
                        list: list,
                    }}
                    printLegend={printLegend}
                    tables={{
                        columns: columns,
                        auxiliaryLists: auxiliaryLists,
                        printColumnsWidth: printColumnsWidth,
                        verticalDivider: verticalDivider,
                    }}
                    fontFamily={fontFamily}
                />
            )}
            {pageSplit && dataSplit && (
                <SingleTeamPerPage
                    teamSplit={teamSplit}
                    header={{
                        appliedFilters: appliedFilters,
                        filtersLabels: filtersLabels,
                        latestProductionDate: latestProductionDate,
                        list: list,
                    }}
                    printLegend={printLegend}
                    tables={{
                        columns: columns,
                        auxiliaryLists: auxiliaryLists,
                        printColumnsWidth: printColumnsWidth,
                        verticalDivider: verticalDivider,
                    }}
                    fontFamily={fontFamily}
                />
            )}
            {!(dataSplit || pageSplit) && (
                <NoSplit
                    data={data}
                    header={{
                        appliedFilters: appliedFilters,
                        filtersLabels: filtersLabels,
                        latestProductionDate: latestProductionDate,
                        list: list,
                    }}
                    printLegend={printLegend}
                    table={{
                        columns: columns,
                        auxiliaryLists: auxiliaryLists,
                        printColumnsWidth: printColumnsWidth,
                        verticalDivider: verticalDivider,
                    }}
                    fontFamily={fontFamily}
                />
            )}
        </div>
    );
};

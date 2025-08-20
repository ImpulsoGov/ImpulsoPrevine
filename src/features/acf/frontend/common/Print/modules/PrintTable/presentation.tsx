import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import type { DiabetesAcfPrintItem } from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/List/modules/print/diabetes/print.model";
import { SplitByTeam } from "@helpers/lista-nominal/impressao/SplitByTeam";
import type { GridColDef } from "@mui/x-data-grid";
import { MultipleTeamsPerPage } from "./modules/MultipleTeamsPerPage";
import { NoSplit } from "./modules/NoSplit";
import { SingleTeamPerPage } from "./modules/SingleTeamPerPage";

export type PrintColumnsWidthProps = {
    portrait: Record<string, string>;
    landscape: Record<string, string>;
};

export type PrintTableProps = {
    data: Array<DiabetesAcfPrintItem>;
    columns: Array<GridColDef>;
    list: string;
    appliedFilters: FilterItem;
    dataSplit: boolean;
    pageSplit: boolean;
    latestProductionDate: string;
    auxiliaryLists?: Record<string, Record<string, string>>;
    printColumnsWidth: PrintColumnsWidthProps;
    verticalDivider: Array<number>;
    fontFamily: string;
    propPrintGrouping: string;
    printCaption?: Array<string>;
    filtersLabels: Record<string, string>;
};
const fontFamily = "sans-serif"; //rever se isso ainda é necessario

export const PrintTable: React.FC<PrintTableProps> = ({
    data,
    columns,
    list,
    printColumnsWidth,
    verticalDivider,
    printCaption,
    filtersLabels,
    propPrintGrouping,
    appliedFilters, //pode consumido via context withFilters
    dataSplit, //pode consumido via context withCustomPrint
    pageSplit, //pode consumido via context withCustomPrint
    latestProductionDate, //vai ser definido ainda
    auxiliaryLists, //podemos rever o uso
}) => {
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
                    printLegend={printCaption}
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
                    printLegend={printCaption}
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
                    printLegend={printCaption}
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

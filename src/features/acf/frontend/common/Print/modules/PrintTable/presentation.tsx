import type { PageResponses } from "@/features/acf/shared/schema";
// import { SplitByTeam } from "@helpers/lista-nominal/impressao/SplitByTeam";
import type { GridColDef } from "@mui/x-data-grid";
import type { AxiosResponse, AxiosError } from "axios";
// import { MultipleTeamsPerPage } from "./modules/MultipleTeamsPerPage";
// import { NoSplit } from "./modules/NoSplit";
// import { SingleTeamPerPage } from "./modules/SingleTeamPerPage";

export type PrintColumnsWidthProps = {
    portrait: Record<string, string>;
    landscape: Record<string, string>;
};

export type PrintTableProps = {
    data: AxiosResponse<PageResponses> | AxiosError | null;
    columns: Array<GridColDef>;
    // list: string;
    // printColumnsWidth: PrintColumnsWidthProps;
    // verticalDivider: Array<number>;
    // propPrintGrouping: string;
    // printCaption?: Array<string>;
    // filtersLabels: Record<string, string>;
};
const fontFamily = "sans-serif"; //rever se isso ainda é necessario

export const PrintTable: React.FC<PrintTableProps> = ({
    data,
    columns,
    // listProps,
    // appliedFilters,
    // dataSplit, //pode consumido via context withCustomPrint
    // pageSplit, //pode consumido via context withCustomPrint
    // auxiliaryLists, //rever o uso
}) => {
    // const {
    //     list,
    //     printColumnsWidth,
    //     verticalDivider,
    //     printCaption,
    //     filtersLabels,
    //     propPrintGrouping,
    // } = listProps;
    // const teamSplit = SplitByTeam(data, propPrintGrouping);
    return <h1>Print Table</h1>;
    // return (
    //     <div
    //         key="print-table"
    //         className="largura"
    //         style={{
    //             fontFamily: `${fontFamily}, sans-serif`,
    //         }}
    //     >
    //         {dataSplit && !pageSplit && (
    //             <MultipleTeamsPerPage
    //                 teamSplit={teamSplit}
    //                 header={{
    //                     appliedFilters: appliedFilters,
    //                     filtersLabels: filtersLabels,
    //                     latestProductionDate: latestProductionDate,
    //                     list: list,
    //                 }}
    //                 printLegend={printCaption}
    //                 tables={{
    //                     columns: columns,
    //                     auxiliaryLists: auxiliaryLists,
    //                     printColumnsWidth: printColumnsWidth,
    //                     verticalDivider: verticalDivider,
    //                 }}
    //                 fontFamily={fontFamily}
    //             />
    //         )}
    //         {pageSplit && dataSplit && (
    //             <SingleTeamPerPage
    //                 teamSplit={teamSplit}
    //                 header={{
    //                     appliedFilters: appliedFilters,
    //                     filtersLabels: filtersLabels,
    //                     latestProductionDate: latestProductionDate,
    //                     list: list,
    //                 }}
    //                 printLegend={printCaption}
    //                 tables={{
    //                     columns: columns,
    //                     auxiliaryLists: auxiliaryLists,
    //                     printColumnsWidth: printColumnsWidth,
    //                     verticalDivider: verticalDivider,
    //                 }}
    //                 fontFamily={fontFamily}
    //             />
    //         )}
    //         {!(dataSplit || pageSplit) && (
    //             <NoSplit
    //                 data={data}
    //                 header={{
    //                     appliedFilters: appliedFilters,
    //                     filtersLabels: filtersLabels,
    //                     latestProductionDate: latestProductionDate,
    //                     list: list,
    //                 }}
    //                 printLegend={printCaption}
    //                 table={{
    //                     columns: columns,
    //                     auxiliaryLists: auxiliaryLists,
    //                     printColumnsWidth: printColumnsWidth,
    //                     verticalDivider: verticalDivider,
    //                 }}
    //                 fontFamily={fontFamily}
    //             />
    //         )}
    //     </div>
    // );
};

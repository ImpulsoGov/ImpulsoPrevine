import type { DataResponses } from "@/features/acf/shared/schema";
// import { SplitByTeam } from "@helpers/lista-nominal/impressao/SplitByTeam";
import type { GridColDef } from "@mui/x-data-grid";
import type { AxiosResponse, AxiosError } from "axios";
import { useContext } from "react";
import { CustomPrintContext } from "../../../WithCustomPrint/context";
import type { PrintListProps } from "../../../PrintModal/model";
import type { AppliedFilters } from "../../../WithFilters";
// import { MultipleTeamsPerPage } from "./modules/MultipleTeamsPerPage";
import { NoSplit } from "./modules/NoSplit";
import { PageHeader } from "./modules/PageHeader";
// import { SingleTeamPerPage } from "./modules/SingleTeamPerPage";

export type PrintColumnsWidthProps = {
    portrait: Record<string, string>;
    landscape: Record<string, string>;
};

export type PrintTableProps = {
    data: AxiosResponse<DataResponses> | AxiosError | null;
    columns: Array<GridColDef>;
    ref: React.RefObject<HTMLDivElement | null>;
    printListProps: PrintListProps;
    // filtersLabels: Record<string, string>;
};

export const PrintTable: React.FC<PrintTableProps> = ({
    data,
    columns,
    ref,
    printListProps,
    // dataSplit, //pode consumido via context withCustomPrint
    // pageSplit, //pode consumido via context withCustomPrint
    // auxiliaryLists, //rever o uso
}) => {
    const {
        listTitle,
        printColumnsWidth,
        verticalDivider,
        printCaption,
        filtersLabels,
        propPrintGrouping,
    } = printListProps;
    // const teamSplit = SplitByTeam(data, propPrintGrouping);
    console.log(data);
    console.log(columns);
    const { customization } = useContext(CustomPrintContext);
    const isDataSplit = customization.grouping;
    const isPageSplit = customization.splitGroupPerPage;
    const isSplitOrderedByProp = customization.order;
    // return (
    //     <div ref={ref} style={{ display: "none" }}>
    //         <h1>Aqui vai ter o conteudo da impressão </h1>
    //         <p>Agrupar por equipe ? {isDataSplit ? "Sim" : "Não"}</p>
    //         <p>Dividir por página ? {isPageSplit ? "Sim" : "Não"}</p>
    //         <p>Ordenar ? {isSplitOrderedByProp ? "Sim" : "Não"}</p>
    //     </div>
    // );
    return (
        <div
            key="print-table"
            className="largura"
            ref={ref}
            style={{
                display: "none",
                fontFamily: `Inter, sans-serif`,
            }}
        >
            {/* {dataSplit && !pageSplit && (
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
            )} */}
            {/* {pageSplit && dataSplit && (
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
            )} */}
            {!(isDataSplit || isPageSplit) && (
                <>
                    <NoSplit
                    // data={data}
                    // table={{
                    //     columns: columns,
                    //     auxiliaryLists: auxiliaryLists,
                    //     printColumnsWidth: printColumnsWidth,
                    //     verticalDivider: verticalDivider,
                    // }}
                    >
                        <PageHeader
                            filtersLabels={filtersLabels}
                            listTitle={listTitle}
                            printCaption={printCaption}
                        />
                    </NoSplit>
                </>
            )}
        </div>
    );
};

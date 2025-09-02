// import { SplitByTeam } from "@helpers/lista-nominal/impressao/SplitByTeam";
import { useContext } from "react";
import { CustomPrintContext } from "../../../WithCustomPrint/context";
import type { ColumnsProps, PrintListProps } from "../../../PrintModal/model";
// import type { AppliedFilters } from "../../../WithFilters";
// import { MultipleTeamsPerPage } from "./modules/MultipleTeamsPerPage";
import { NoSplit } from "./modules/NoSplit";
import { PageHeader } from "./modules/PageHeader";
import { UnitTable } from "./modules/UnitTable";
import type { AllPagesResponses } from "@/features/acf/shared/schema";
// import { SingleTeamPerPage } from "./modules/SingleTeamPerPage";

export type PrintTableProps<TResponse> = {
    data: TResponse;
    columns: Array<ColumnsProps>;
    ref: React.RefObject<HTMLDivElement | null>;
    printListProps: PrintListProps;
    // filtersLabels: Record<string, string>;
};

export const PrintTable = <TResponse extends AllPagesResponses>({
    data,
    columns,
    ref,
    printListProps,
    // dataSplit, //pode consumido via context withCustomPrint
    // pageSplit, //pode consumido via context withCustomPrint
    // auxiliaryLists, //rever o uso
}: PrintTableProps<TResponse>): React.ReactNode => {
    const { listTitle, printCaption, filtersLabels, propPrintGrouping } =
        printListProps;
    // const teamSplit = SplitByTeam(data, propPrintGrouping);
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
                    <NoSplit>
                        <PageHeader
                            filtersLabels={filtersLabels}
                            listTitle={listTitle}
                            printCaption={printCaption}
                        />
                        <UnitTable
                            data={data}
                            columns={columns}
                            layoutOrientation="landscape"
                        />
                        <UnitTable
                            data={data}
                            columns={columns}
                            layoutOrientation="portrait"
                        />
                    </NoSplit>
                </>
            )}
        </div>
    );
};

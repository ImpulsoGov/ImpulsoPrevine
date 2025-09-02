import { useContext } from "react";
import { CustomPrintContext } from "@/features/acf/frontend/common/WithCustomPrint";
import type { ColumnsProps, PrintListProps } from "./model";
import { MultipleTeamsPerPage } from "./modules/MultipleTeamsPerPage";
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
}: PrintTableProps<TResponse>): React.ReactNode => {
    const { listTitle, printCaption, filtersLabels, propPrintGrouping } =
        printListProps;
    const { customization } = useContext(CustomPrintContext);
    const isDataSplit = customization.grouping;
    const isPageSplit = customization.splitGroupPerPage;
    const isSplitOrderedByProp = customization.order;

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
            {isDataSplit && !isPageSplit && (
                <MultipleTeamsPerPage
                    data={data}
                    columns={columns}
                    propSplit={propPrintGrouping}
                >
                    <PageHeader
                        filtersLabels={filtersLabels}
                        listTitle={listTitle}
                        printCaption={printCaption}
                    />
                </MultipleTeamsPerPage>
            )}
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

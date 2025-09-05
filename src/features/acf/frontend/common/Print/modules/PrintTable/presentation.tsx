import { useContext } from "react";
import { CustomPrintContext } from "@/features/acf/frontend/common/WithCustomPrint";
import type { ColumnsProps, PrintListProps } from "./model";
import { MultipleGroupsPerPage } from "./modules/MultipleTeamsPerPage";
import { NoSplit } from "./modules/NoSplit";
import { PageHeader } from "./modules/PageHeader";
import { UnitTable } from "./modules/UnitTable";
import type { AcfItem } from "@/features/acf/shared/schema";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import { SingleGroupPerPage } from "./modules/SingleTeamPerPage";
import type { SplitedByProp } from "./modules/SplitByProp";

export type PrintTableProps<
    TAcfItem extends AcfItem,
    TFilters extends AppliedFilters,
> = {
    data: Array<TAcfItem>;
    SplitedData: SplitedByProp<TAcfItem>;
    columns: Array<ColumnsProps<TAcfItem>>;
    ref: React.RefObject<HTMLDivElement | null>;
    printListProps: PrintListProps<TAcfItem, TFilters>;
};

export const PrintTable = <
    TAcfItem extends AcfItem,
    TFilters extends AppliedFilters,
>({
    data,
    SplitedData,
    columns,
    ref,
    printListProps,
}: PrintTableProps<TAcfItem, TFilters>): React.ReactNode => {
    const { listTitle, printCaption, filtersLabels, splitBy } = printListProps;
    const { customization } = useContext(CustomPrintContext);
    const isDataSplitEnabled = customization.grouping;
    const isPageSplitEnabled = customization.splitGroupPerPage;
    // const isSplitOrderedByProp = customization.order;
    const orderPrintGroups = customization.orderGroup;

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
            {isDataSplitEnabled && !isPageSplitEnabled && (
                <MultipleGroupsPerPage<TAcfItem>
                    data={SplitedData}
                    columns={columns}
                    splitBy={splitBy}
                    orderGroup={orderPrintGroups}
                >
                    <PageHeader
                        filtersLabels={filtersLabels}
                        listTitle={listTitle}
                        printCaption={printCaption}
                    />
                </MultipleGroupsPerPage>
            )}
            {isPageSplitEnabled && isDataSplitEnabled && (
                <SingleGroupPerPage<TAcfItem>
                    data={SplitedData}
                    columns={columns}
                    orderGroup={orderPrintGroups}
                >
                    <PageHeader
                        filtersLabels={filtersLabels}
                        listTitle={listTitle}
                        printCaption={printCaption}
                    />
                </SingleGroupPerPage>
            )}
            {!(isDataSplitEnabled || isPageSplitEnabled) && (
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

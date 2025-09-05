import { useContext } from "react";
import { CustomPrintContext } from "@/features/acf/frontend/common/WithCustomPrint";
import type { ColumnsProps, PrintListProps } from "./model";
import { MultipleGroupsPerPage } from "./modules/MultipleGroupsPerPage";
import { NoSplit } from "./modules/NoSplit";
import { PageHeader } from "./modules/PageHeader";
import { UnitTable } from "./modules/UnitTable";
import type { AcfItem } from "@/features/acf/shared/schema";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import { SingleGroupPerPage } from "./modules/SingleGroupPerPage";
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
    sortedKeys: Array<keyof TAcfItem>;
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
    sortedKeys,
}: PrintTableProps<TAcfItem, TFilters>): React.ReactNode => {
    const { listTitle, printCaption, filtersLabels } = printListProps;
    const { customization } = useContext(CustomPrintContext);
    const isDataSplitEnabled = customization.grouping;
    const isPageSplitEnabled = customization.splitGroupPerPage;
    // const isSplitOrderedByProp = customization.order;

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
                    sortedKeys={sortedKeys}
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
                    sortedKeys={sortedKeys}
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

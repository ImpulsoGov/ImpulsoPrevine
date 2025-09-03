import { useContext } from "react";
import { CustomPrintContext } from "@/features/acf/frontend/common/WithCustomPrint";
import type { ColumnsProps, PrintListProps } from "./model";
import { MultipleTeamsPerPage } from "./modules/MultipleTeamsPerPage";
import { NoSplit } from "./modules/NoSplit";
import { PageHeader } from "./modules/PageHeader";
import { UnitTable } from "./modules/UnitTable";
import type { AcfItem } from "@/features/acf/shared/schema";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import { SingleTeamPerPage } from "./modules/SingleTeamPerPage";

export type PrintTableProps<
    TAcfItem extends AcfItem,
    TFilters extends AppliedFilters,
> = {
    data: Array<TAcfItem>;
    columns: Array<ColumnsProps<TAcfItem>>;
    ref: React.RefObject<HTMLDivElement | null>;
    printListProps: PrintListProps<TAcfItem, TFilters>;
};

export const PrintTable = <
    TAcfItem extends AcfItem,
    TFilters extends AppliedFilters,
>({
    data,
    columns,
    ref,
    printListProps,
}: PrintTableProps<TAcfItem, TFilters>): React.ReactNode => {
    const { listTitle, printCaption, filtersLabels, propPrintGrouping } =
        printListProps;
    const { customization } = useContext(CustomPrintContext);
    const shouldSplitData = customization.grouping;
    const shouldSplitPage = customization.splitGroupPerPage;
    // const isSplitOrderedByProp = customization.order;
    const PageHeaderMounted = (
        <PageHeader
            filtersLabels={filtersLabels}
            listTitle={listTitle}
            printCaption={printCaption}
        />
    );
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
            {shouldSplitData && !shouldSplitPage && (
                <MultipleTeamsPerPage
                    data={data}
                    columns={columns}
                    propSplit={propPrintGrouping}
                >
                    {PageHeaderMounted}
                </MultipleTeamsPerPage>
            )}
            {shouldSplitPage && shouldSplitData && (
                <SingleTeamPerPage
                    data={data}
                    columns={columns}
                    propSplit={propPrintGrouping}
                >
                    {PageHeaderMounted}
                </SingleTeamPerPage>
            )}
            {!(shouldSplitData || shouldSplitPage) && (
                <>
                    <NoSplit>
                        {PageHeaderMounted}
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

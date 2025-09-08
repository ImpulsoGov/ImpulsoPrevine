"use client";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import { PrintTable } from "./presentation";
import { isAxiosError } from "axios";
import type { AcfItem } from "@/features/acf/shared/schema";
import type { ColumnsProps, PrintListProps } from "./model";
import type { ServiceGetData } from "@features/acf/frontend/common/useAcfData";
import { useAcfData } from "@features/acf/frontend/common/useAcfData";
import { SplitByProp } from "./modules/SplitByProp";
import { useContext } from "react";
import { CustomPrintContext } from "@features/acf/frontend/common/WithCustomPrint";
import { MultipleGroupsPerBlock } from "./modules/MultipleGroupsPerBlock";
import { NoSplit } from "./modules/NoSplit";
import { PageHeader } from "./modules/PageHeader";
import { SingleGroupPerBlock } from "./modules/SingleGroupPerBlock";
import { UnitTable } from "./modules/UnitTable";

type Props<
    TAppliedFilters extends AppliedFilters,
    TResponse extends AcfItem,
> = {
    columns: Array<ColumnsProps<TResponse>>;
    serviceGetData: ServiceGetData<TAppliedFilters, TResponse>;
    ref: React.RefObject<HTMLDivElement | null>;
    printListProps: PrintListProps<TResponse, TAppliedFilters>;
};

export const Container = <
    TAppliedFilters extends AppliedFilters,
    TResponse extends AcfItem,
>({
    columns,
    serviceGetData,
    ref,
    printListProps,
}: Props<TAppliedFilters, TResponse>): React.ReactNode => {
    const { response } = useAcfData<TResponse, TAppliedFilters>({
        serviceGetData,
    });
    const { customization } = useContext(CustomPrintContext);
    const orderGroup = customization.orderGroup;
    const isDataSplitEnabled = customization.grouping;
    const isPageSplitEnabled = customization.splitGroupPerPage;
    // const isSplitOrderedByProp = customization.order;
    const { listTitle, printCaption, filtersLabels } = printListProps;

    if (isAxiosError(response)) {
        return (
            <p
                data-testid="error-message"
                style={{ textAlign: "center", padding: "20px" }}
            >
                Erro ao buscar dados, entre em contato com o suporte.
            </p>
        );
    }
    if (response !== null) {
        const data = response.data as Array<TResponse>;

        let splitedData: ReturnType<typeof SplitByProp> | undefined;
        if (isDataSplitEnabled) {
            splitedData = SplitByProp(data, printListProps.splitBy, columns);
        }

        const sortedKeys = splitedData
            ? (Object.keys(splitedData).sort(orderGroup) as Array<
                  keyof TResponse
              >)
            : [];

        return (
            <PrintTable ref={ref}>
                {isDataSplitEnabled && !isPageSplitEnabled && (
                    <MultipleGroupsPerBlock<TResponse>
                        data={SplitByProp(
                            data,
                            printListProps.splitBy,
                            columns
                        )}
                        columns={columns}
                        sortedKeys={sortedKeys}
                    >
                        <PageHeader
                            filtersLabels={filtersLabels}
                            listTitle={listTitle}
                            printCaption={printCaption}
                        />
                    </MultipleGroupsPerBlock>
                )}
                {isPageSplitEnabled && isDataSplitEnabled && (
                    <SingleGroupPerBlock<TResponse>
                        data={SplitByProp(
                            data,
                            printListProps.splitBy,
                            columns
                        )}
                        columns={columns}
                        sortedKeys={sortedKeys}
                    >
                        <PageHeader
                            filtersLabels={filtersLabels}
                            listTitle={listTitle}
                            printCaption={printCaption}
                        />
                    </SingleGroupPerBlock>
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
            </PrintTable>
        );
    }
};

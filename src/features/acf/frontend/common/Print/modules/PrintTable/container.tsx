"use client";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import { PrintTable } from "./presentation";
import { isAxiosError } from "axios";
import type { AcfItem } from "@/features/acf/shared/schema";
import type { ColumnsProps, PrintListProps } from "./model";
import type { ServiceGetData } from "@features/acf/frontend/common/useAcfData";
import { useAcfData } from "@features/acf/frontend/common/useAcfData";
import { OrderedSplitByProp } from "./modules/SplitByProp";
import { useContext } from "react";
import { CustomPrintContext } from "@features/acf/frontend/common/WithCustomPrint";
import { MultipleGroupsPerBlock } from "./modules/MultipleGroupsPerBlock";
import { NoSplit } from "./modules/NoSplit";
import { PageHeader } from "./modules/PageHeader";
import { SingleGroupPerBlock } from "./modules/SingleGroupPerBlock";
import { UnitTable } from "./modules/UnitTable";
import { SortingContext } from "@features/acf/frontend/common/WithSorting";

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
    const { response } = useAcfData({
        serviceGetData,
    });
    const { customization } = useContext(CustomPrintContext);
    const { gridSortingModel } = useContext(SortingContext);
    const orderGroup = customization.orderGroup;
    const isDataSplitEnabled = customization.grouping;
    const isPageSplitEnabled = customization.splitGroupPerPage;
    const isSplitOrderedByProp = customization.order;

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
        if (isDataSplitEnabled) {
            const splitData = OrderedSplitByProp(
                data,
                printListProps.splitBy,
                columns,
                isSplitOrderedByProp,
                gridSortingModel
            );
            const sortedKeys = Object.keys(splitData).sort(orderGroup) as Array<
                keyof TResponse
            >;

            const dataSplitProps = {
                data: splitData,
                columns,
                sortedKeys,
            };
            return (
                <PrintTable ref={ref}>
                    {isPageSplitEnabled ? (
                        <SingleGroupPerBlock {...dataSplitProps}>
                            <PageHeader {...printListProps} />
                        </SingleGroupPerBlock>
                    ) : (
                        <MultipleGroupsPerBlock {...dataSplitProps}>
                            <PageHeader {...printListProps} />
                        </MultipleGroupsPerBlock>
                    )}
                </PrintTable>
            );
        }

        return (
            <PrintTable ref={ref}>
                <NoSplit>
                    <PageHeader {...printListProps} />
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
            </PrintTable>
        );
    }
};

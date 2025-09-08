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
        const splitedData = SplitByProp(data, printListProps.splitBy, columns);
        const sortedKeys = Object.keys(splitedData).sort(orderGroup) as Array<
            keyof TResponse
        >;
        return (
            <PrintTable
                SplitedData={splitedData}
                data={response.data as Array<TResponse>} //TODO: revisar essa coercão, possivelmente adicionar um objeto da resposta ajudaria na inferencia de tipos como na data
                columns={columns}
                ref={ref}
                printListProps={printListProps}
                sortedKeys={sortedKeys}
            />
        );
    }
};

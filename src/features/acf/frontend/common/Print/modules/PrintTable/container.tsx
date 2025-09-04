"use client";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import { PrintTable } from "./presentation";
import { isAxiosError } from "axios";
import type { AcfItem } from "@/features/acf/shared/schema";
import type { ColumnsProps, PrintListProps } from "./model";
import type { ServiceGetData } from "@features/acf/frontend/common/useAcfData";
import { useAcfData } from "@features/acf/frontend/common/useAcfData";

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

    if (response !== null)
        return (
            <PrintTable
                data={response.data as Array<TResponse>}
                columns={columns}
                ref={ref}
                printListProps={printListProps}
            />
        );
};

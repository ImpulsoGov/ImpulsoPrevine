"use client";
import { CurrentQuadrimester } from "@/features/acf/frontend/common/CurrentQuadrimester";
import { FilterHint } from "@/features/acf/frontend/common/FilterHint";
import { List } from "@/features/acf/frontend/common/List";
import { Container as PrintTable } from "@/features/acf/frontend/common/Print/modules/PrintTable/container";
import { PrintModal } from "@/features/acf/frontend/common/PrintModal";
import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithCustomPrint } from "@/features/acf/frontend/common/WithCustomPrint";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithFiltersBar } from "@/features/acf/frontend/common/WithFiltersBar";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithPrintModal } from "@/features/acf/frontend/common/WithPrintModal";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import React, { useState } from "react";
import { orderPrintGroups } from "./logic";
import { CoapsDataTable } from "./modules/CoapsDataTable";
import { CoapsFiltersBar } from "./modules/CoapsFiltersBar";
import {
    printListProps,
    apsLabelsModal,
    columns,
} from "./modules/Print/consts";
import { getCoapsData } from "./modules/Print/service";
import { initialSelectedValuesCoaps } from "./consts";

type ContentCoapsProps = {
    isPrintEnabled: boolean;
};

//TODO: Escrever um componente que engloba o conteúdo compartilhado entre os perfis de coordenação.
export const ContentCoaps: React.FC<ContentCoapsProps> = ({
    isPrintEnabled,
}) => {
    const [shouldRenderPrintTable, setShouldRenderPrintTable] = useState(false);

    return (
        <>
            <List>
                <WithPrintModal>
                    <WithFilters
                        initialSelectedValues={initialSelectedValuesCoaps}
                    >
                        <WithCustomPrint orderGroup={orderPrintGroups}>
                            <CurrentQuadrimester />
                            <WithSearch
                                SearchComponent={SearchToolBar}
                                isPrintEnabled={isPrintEnabled}
                                propTriggerPrintWithoutModal={
                                    printListProps.propTriggerPrintWithoutModal
                                }
                                setShouldRenderPrintTable={
                                    setShouldRenderPrintTable
                                }
                            >
                                <hr style={{ width: "100%" }} />
                                <WithSorting>
                                    <FilterHint
                                        title="Filtrar lista"
                                        description="selecione filtros para refinar a busca de cidadãos"
                                    />
                                    <WithFiltersBar
                                        FiltersBar={CoapsFiltersBar}
                                    >
                                        <WithPagination>
                                            <CoapsDataTable />
                                            <PrintModal
                                                modalLabels={apsLabelsModal}
                                                setShouldRenderPrintTable={
                                                    setShouldRenderPrintTable
                                                }
                                            ></PrintModal>
                                            {shouldRenderPrintTable && (
                                                <PrintTable
                                                    columns={columns}
                                                    serviceGetData={
                                                        getCoapsData
                                                    }
                                                    setShouldRenderPrintTable={
                                                        setShouldRenderPrintTable
                                                    }
                                                    printListProps={
                                                        printListProps
                                                    }
                                                />
                                            )}
                                        </WithPagination>
                                    </WithFiltersBar>
                                </WithSorting>
                            </WithSearch>
                        </WithCustomPrint>
                    </WithFilters>
                </WithPrintModal>
            </List>
        </>
    );
};

export type { CoapsAppliedFilters } from "./modules/CoapsDataTable";

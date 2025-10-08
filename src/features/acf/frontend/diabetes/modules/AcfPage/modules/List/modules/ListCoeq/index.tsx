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
import { CoeqDataTable } from "./modules/CoeqDataTable";
import { CoeqFiltersBar } from "./modules/CoeqFiltersBar";
import {
    printListProps,
    coeqLabelsModal,
    coeqColumns,
} from "./modules/Print/consts";
import { getCoeqData } from "./modules/Print/service";
import { initialSelectedValuesCoeq } from "./consts";

type ContentCoeqProps = {
    isPrintEnabled: boolean;
};

export const ContentCoeq: React.FC<ContentCoeqProps> = ({ isPrintEnabled }) => {
    const [shouldRenderPrintTable, setShouldRenderPrintTable] = useState(false);
    return (
        <>
            <List>
                <WithPrintModal>
                    <WithCustomPrint orderGroup={orderPrintGroups}>
                        <CurrentQuadrimester />
                        <WithFilters
                            initialSelectedValues={initialSelectedValuesCoeq}
                        >
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
                                    <WithFiltersBar FiltersBar={CoeqFiltersBar}>
                                        <WithPagination>
                                            <CoeqDataTable />
                                            <PrintModal
                                                modalLabels={coeqLabelsModal}
                                                setShouldRenderPrintTable={
                                                    setShouldRenderPrintTable
                                                }
                                            />
                                            {shouldRenderPrintTable && (
                                                <PrintTable
                                                    columns={coeqColumns}
                                                    serviceGetData={getCoeqData}
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
                        </WithFilters>
                    </WithCustomPrint>
                </WithPrintModal>
            </List>
        </>
    );
};

export type { CoeqAppliedFilters } from "./modules/CoeqDataTable";

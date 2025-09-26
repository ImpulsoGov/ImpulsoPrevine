"use client";
import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import React, { useState } from "react";
import type { AcfDashboardType } from "@/features/acf/frontend/common/AcfDashboard";
import type { CoapsAppliedFilters } from "./modules/CoapsDataTable";
import { CoapsDataTable } from "./modules/CoapsDataTable";
import { CoapsFiltersBar } from "./modules/CoapsFiltersBar";
import { CurrentQuadrimester } from "../common/CurrentQuadrimester";
import { FilterHint } from "../common/FilterHint";
import { ListCoaps } from ".";
import { PrintTable } from "@/features/acf/frontend/common/Print";
import { PrintModal } from "@/features/acf/frontend/common/PrintModal";
import { WithCustomPrint } from "@/features/acf/frontend/common/WithCustomPrint";
import { WithPrintModal } from "@/features/acf/frontend/common/WithPrintModal";
import { apsLabelsModal, columns } from "./modules/Print/consts";
import { getCoapsData } from "./modules/Print/service";
import { printListProps } from "./modules/Print/consts";
import { orderPrintGroups } from "./logic";
import { WithFiltersBar } from "@/features/acf/frontend/common/WithFiltersBar";

type ContentCoapsProps = {
    list: AcfDashboardType;
    isPrintEnabled: boolean;
};

//TODO: Pensar se faz sentido que isso fique aqui mesmo
const initialSelectedValuesCoaps: CoapsAppliedFilters = {
    careTeamName: [],
    microAreaName: [],
    appointmentStatusByQuarter: [],
    latestExamRequestStatusByQuarter: [],
    patientAgeRange: "",
    goodPracticesStatusByQuarter: "",
    medicalRecordUpdated: "",
};
//TODO: Escrever um componente que engloba o conteúdo compartilhado entre os perfis de coordenação.
export const ContentCoaps: React.FC<ContentCoapsProps> = ({
    list,
    isPrintEnabled,
}) => {
    const [shouldRenderPrintTable, setShouldRenderPrintTable] = useState(false);

    return (
        <>
            <ListCoaps list={list}>
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
                                    <FilterHint />
                                    <WithFiltersBar
                                        FiltersBar={CoapsFiltersBar}
                                        isPrintEnabled={isPrintEnabled}
                                    >
                                        <WithPagination>
                                            <CoapsDataTable
                                                isPrintEnabled={isPrintEnabled}
                                            />
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
            </ListCoaps>
        </>
    );
};

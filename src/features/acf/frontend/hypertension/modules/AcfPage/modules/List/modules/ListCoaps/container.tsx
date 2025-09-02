"use client";
import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import React, { useRef } from "react";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
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
};
//TODO: Escrever um componente que engloba o conteúdo compartilhado entre os perfis de coordenação.
export const ContentCoaps: React.FC<ContentCoapsProps> = ({
    list,
    isPrintEnabled,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <>
            <ListCoaps list={list}>
                <WithPrintModal>
                    <WithCustomPrint>
                        <CurrentQuadrimester />
                        <WithSearch
                            SearchComponent={SearchToolBar}
                            isPrintEnabled={isPrintEnabled}
                        >
                            <hr style={{ width: "100%" }} />
                            <WithSorting>
                                <FilterHint />
                                <WithFilters
                                    initialSelectedValues={
                                        initialSelectedValuesCoaps
                                    }
                                    FiltersBar={CoapsFiltersBar}
                                >
                                    <WithPagination>
                                        <CoapsDataTable />
                                        <PrintModal
                                            modalLabels={apsLabelsModal}
                                            ref={ref}
                                        >
                                            <PrintTable
                                                columns={columns}
                                                serviceGetData={getCoapsData}
                                                ref={ref}
                                                printListProps={printListProps}
                                            />
                                        </PrintModal>
                                    </WithPagination>
                                </WithFilters>
                            </WithSorting>
                        </WithSearch>
                    </WithCustomPrint>
                </WithPrintModal>
            </ListCoaps>
        </>
    );
};

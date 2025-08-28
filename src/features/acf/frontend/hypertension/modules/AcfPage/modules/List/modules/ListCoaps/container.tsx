import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import React from "react";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import type { CoapsAppliedFilters } from "./modules/CoapsDataTable";
import { CoapsDataTable } from "./modules/CoapsDataTable";
import { CoapsFiltersBar } from "./modules/CoapsFiltersBar";

import { WithCustomPrint } from "@/features/acf/frontend/common/WithCustomPrint";
import { WithPrintModal } from "@/features/acf/frontend/common/WithPrintModal";
import { print } from "@/features/common/shared/flags";
import { CurrentQuadrimester } from "../common/CurrentQuadrimester";
import { FilterHint } from "../common/FilterHint";
import { ListCoaps } from ".";

type ContentCoapsProps = {
    list: AcfDashboardType;
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
export const ContentCoaps: React.FC<ContentCoapsProps> = async ({ list }) => {
    //TODO: Pegar municipalitySusId e teamIne dentro do InternalCardsCoeq e tirar da interface do Content e da ListContainer
    const isPrintEnabled = await print();
    return (
        <>
            <ListCoaps list={list}>
                <CurrentQuadrimester />
                <WithPrintModal>
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
                                    <WithCustomPrint></WithCustomPrint>
                                </WithPagination>
                            </WithFilters>
                        </WithSorting>
                    </WithSearch>
                </WithPrintModal>
            </ListCoaps>
        </>
    );
};

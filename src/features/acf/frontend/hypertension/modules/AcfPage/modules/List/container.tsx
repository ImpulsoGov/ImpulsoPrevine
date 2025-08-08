import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import React from "react";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import { CoapsDataTable } from "./modules/CoapsDataTable";
import { CoeqDataTable } from "./modules/CoeqDataTable";
import { List } from "@/features/acf/frontend/common/List";
import { CoapsFiltersBar } from "./modules/CoapsFiltersBar";
import { CoeqFiltersBar } from "./modules/CoeqFiltersBar";
import { CurrentQuadrimester } from "./modules/CurrentQuadrimester";
import { FilterHint } from "./modules/FilterHint";

type ContentCoeqProps = {
    list: AcfDashboardType;
};

type ContentCoapsProps = {
    list: AcfDashboardType;
};

//TODO: Pensar se faz sentido que isso fique aqui mesmo
const initialSelectedValuesCoeq = {
    microAreaName: [],
    appointmentStatusByQuarter: [],
    latestExamRequestStatusByQuarter: [],
    patientAgeRange: "",
};

const initialSelectedValuesCoaps = {
    careTeamName: [],
    microAreaName: [],
    appointmentStatusByQuarter: [],
    latestExamRequestStatusByQuarter: [],
    patientAgeRange: "",
};
//TODO: Escrever um componente que engloba o conteúdo compartilhado entre os perfis de coordenação.
export const ContentCoaps: React.FC<ContentCoapsProps> = ({ list }) => {
    //TODO: Pegar municipalitySusId e teamIne dentro do InternalCardsCoeq e tirar da interface do Content e da ListContainer
    return (
        <>
            <List list={list}>
                <CurrentQuadrimester />
                <WithSearch SearchComponent={SearchToolBar}>
                    <hr style={{ width: "100%" }} />
                    <WithSorting>
                        <FilterHint />
                        <WithFilters
                            initialSelectedValues={initialSelectedValuesCoaps}
                            FiltersBar={CoapsFiltersBar}
                        >
                            <WithPagination>
                                <CoapsDataTable />
                            </WithPagination>
                        </WithFilters>
                    </WithSorting>
                </WithSearch>
            </List>
        </>
    );
};

export const ContentCoeq: React.FC<ContentCoeqProps> = ({ list }) => {
    //TODO: Pegar municipalitySusId e teamIne dentro do InternalCardsCoeq e tirar da interface do Content e da ListContainer
    // TODO: criar card de COAPS e FilterBarCoaps
    return (
        <>
            <List list={list}>
                <CurrentQuadrimester />
                <WithSearch SearchComponent={SearchToolBar}>
                    <hr style={{ width: "100%" }} />
                    <WithSorting>
                        <FilterHint />
                        <WithFilters
                            initialSelectedValues={initialSelectedValuesCoeq}
                            FiltersBar={CoeqFiltersBar}
                        >
                            <WithPagination>
                                <CoeqDataTable />
                            </WithPagination>
                        </WithFilters>
                    </WithSorting>
                </WithSearch>
            </List>
        </>
    );
};

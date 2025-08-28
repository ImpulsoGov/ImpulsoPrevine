import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import React from "react";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import type { CoapsAppliedFilters } from "./modules/CoapsDataTable";
import {
    CoapsDataTable,
    service,
    coapsColumns,
} from "./modules/CoapsDataTable";
import type { CoeqAppliedFilters } from "./modules/CoeqDataTable";
import { CoeqDataTable } from "./modules/CoeqDataTable";
import { List } from "@/features/acf/frontend/common/List";
import { CoapsFiltersBar } from "./modules/CoapsFiltersBar";
import { CoeqFiltersBar } from "./modules/CoeqFiltersBar";
import { CurrentQuadrimester } from "./modules/CurrentQuadrimester";
import { FilterHint } from "./modules/FilterHint";
import { PrintModal } from "@/features/acf/frontend/common/PrintModal";
import { WithCustomPrint } from "@/features/acf/frontend/common/WithCustomPrint";
import {
    apsLabelsModal,
    coeqLabelsModal,
} from "@/features/acf/frontend/common/PrintModal/consts";
import { WithPrintModal } from "@/features/acf/frontend/common/WithPrintModal";
import { print } from "@/features/common/shared/flags";

type ContentCoeqProps = {
    list: AcfDashboardType;
};

type ContentCoapsProps = {
    list: AcfDashboardType;
};

//TODO: Pensar se faz sentido que isso fique aqui mesmo
const initialSelectedValuesCoeq: CoeqAppliedFilters = {
    microAreaName: [],
    appointmentStatusByQuarter: [],
    latestExamRequestStatusByQuarter: [],
    patientAgeRange: "",
};

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
            <List list={list}>
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
                                    <WithCustomPrint>
                                        <PrintModal
                                            modalLabels={apsLabelsModal}
                                            columns={coapsColumns}
                                            serviceGetPage={
                                                service.getCoapsPage
                                            }
                                        />
                                    </WithCustomPrint>
                                </WithPagination>
                            </WithFilters>
                        </WithSorting>
                    </WithSearch>
                </WithPrintModal>
            </List>
        </>
    );
};

export const ContentCoeq: React.FC<ContentCoeqProps> = async ({ list }) => {
    //TODO: Pegar municipalitySusId e teamIne dentro do InternalCardsCoeq e tirar da interface do Content e da ListContainer
    // TODO: criar card de COAPS e FilterBarCoaps
    const isPrintEnabled = await print();
    return (
        <>
            <List list={list}>
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
                                    initialSelectedValuesCoeq
                                }
                                FiltersBar={CoeqFiltersBar}
                            >
                                <WithPagination>
                                    <CoeqDataTable />
                                    <WithCustomPrint>
                                        <PrintModal
                                            modalLabels={coeqLabelsModal}
                                            columns={coapsColumns}
                                            serviceGetPage={
                                                service.getCoapsPage
                                            }
                                        />
                                    </WithCustomPrint>
                                </WithPagination>
                            </WithFilters>
                        </WithSorting>
                    </WithSearch>
                </WithPrintModal>
            </List>
        </>
    );
};

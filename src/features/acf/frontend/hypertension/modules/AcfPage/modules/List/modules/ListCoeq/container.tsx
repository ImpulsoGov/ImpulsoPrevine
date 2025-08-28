import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import React from "react";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import type { CoeqAppliedFilters } from "./modules/CoeqDataTable";
import { CoeqDataTable } from "./modules/CoeqDataTable";
import { CoeqFiltersBar } from "./modules/CoeqFiltersBar";
import { WithCustomPrint } from "@/features/acf/frontend/common/WithCustomPrint";
import { WithPrintModal } from "@/features/acf/frontend/common/WithPrintModal";
import { print } from "@/features/common/shared/flags";
import { CurrentQuadrimester } from "../common/CurrentQuadrimester";
import { FilterHint } from "../common/FilterHint";

import { ListCoeq } from ".";

type ContentCoeqProps = {
    list: AcfDashboardType;
};

//TODO: Pensar se faz sentido que isso fique aqui mesmo
const initialSelectedValuesCoeq: CoeqAppliedFilters = {
    microAreaName: [],
    appointmentStatusByQuarter: [],
    latestExamRequestStatusByQuarter: [],
    patientAgeRange: "",
};

export const ContentCoeq: React.FC<ContentCoeqProps> = async ({ list }) => {
    //TODO: Pegar municipalitySusId e teamIne dentro do InternalCardsCoeq e tirar da interface do Content e da ListContainer
    // TODO: criar card de COAPS e FilterBarCoaps
    const isPrintEnabled = await print();
    return (
        <>
            <ListCoeq list={list}>
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
                                    <WithCustomPrint></WithCustomPrint>
                                </WithPagination>
                            </WithFilters>
                        </WithSorting>
                    </WithSearch>
                </WithPrintModal>
            </ListCoeq>
        </>
    );
};

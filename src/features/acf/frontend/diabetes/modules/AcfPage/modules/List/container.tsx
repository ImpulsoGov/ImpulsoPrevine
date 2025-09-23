"use client";
import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import type { ProfileIdValue } from "@/types/profile";
import { PROFILE_ID } from "@/types/profile";
import React, { useState } from "react";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import {
    CoapsDataTable,
    type CoapsAppliedFilters,
} from "./modules/CoapsDataTable";
import {
    CoeqDataTable,
    type CoeqAppliedFilters,
} from "./modules/CoeqDataTable";
import { CoeqInternalCards } from "./modules/CoeqInternalcards";
import { List } from "@/features/acf/frontend/common/List";
import { CoapsFiltersBar } from "./modules/CoapsFiltersBar";
import { CoeqFiltersBar } from "./modules/CoeqFiltersBar";
import { printListProps } from "@/features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/ListCoaps/modules/Print/consts";
import { WithFiltersBar } from "@/features/acf/frontend/common/WithFiltersBar";

export type ListContainerProps = {
    list: AcfDashboardType;
    municipalitySusId: string;
    teamIne: string;
    userProfile: ProfileIdValue;
    isPrintEnabled: boolean;
};

type ContentCoeqProps = {
    municipalitySusId: string;
    teamIne: string;
    list: AcfDashboardType;
    isPrintEnabled: boolean;
};

//TODO: Pensar se faz sentido que isso fique aqui mesmo
const initialSelectedValuesCoeq: CoeqAppliedFilters = {
    patientStatus: [],
    conditionIdentifiedBy: "",
    communityHealthWorker: [],
    patientAgeRange: [],
};

const initialSelectedValuesCoaps: CoapsAppliedFilters = {
    patientStatus: [],
    conditionIdentifiedBy: "",
    communityHealthWorker: [],
    patientAgeRange: [],
    careTeamName: [],
};

const ContentCoaps: React.FC<ContentCoeqProps> = ({
    municipalitySusId,
    teamIne,
    list,
    isPrintEnabled,
}) => {
    //TODO: Pegar municipalitySusId e teamIne dentro do InternalCardsCoeq e tirar da interface do Content e da ListContainer
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [shouldRenderPrintTable, setShouldRenderPrintTable] = useState(false);
    return (
        <>
            <CoeqInternalCards
                municipalitySusId={municipalitySusId}
                teamIne={teamIne}
            />
            <List list={list}>
                <WithFilters initialSelectedValues={initialSelectedValuesCoaps}>
                    <WithSearch
                        SearchComponent={SearchToolBar}
                        isPrintEnabled={isPrintEnabled}
                        propTriggerPrintWithoutModal={
                            printListProps.propTriggerPrintWithoutModal
                        }
                        setShouldRenderPrintTable={setShouldRenderPrintTable}
                    >
                        {" "}
                        <hr style={{ width: "100%" }} />
                        <WithSorting>
                            <WithFiltersBar
                                FiltersBar={CoapsFiltersBar}
                                isPrintEnabled={isPrintEnabled}
                            >
                                <WithPagination>
                                    <CoapsDataTable />
                                </WithPagination>
                            </WithFiltersBar>
                        </WithSorting>
                    </WithSearch>
                </WithFilters>
            </List>
        </>
    );
};

const ContentCoeq: React.FC<ContentCoeqProps> = ({
    municipalitySusId,
    teamIne,
    list,
    isPrintEnabled,
}) => {
    //TODO: Pegar municipalitySusId e teamIne dentro do InternalCardsCoeq e tirar da interface do Content e da ListContainer
    // TODO: criar card de COAPS e FilterBarCoaps
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [shouldRenderPrintTable, setShouldRenderPrintTable] = useState(false);
    return (
        <>
            <CoeqInternalCards
                municipalitySusId={municipalitySusId}
                teamIne={teamIne}
            />
            <List list={list}>
                <WithFilters initialSelectedValues={initialSelectedValuesCoeq}>
                    <WithSearch
                        SearchComponent={SearchToolBar}
                        isPrintEnabled={isPrintEnabled}
                        propTriggerPrintWithoutModal={
                            printListProps.propTriggerPrintWithoutModal
                        }
                        setShouldRenderPrintTable={setShouldRenderPrintTable}
                    >
                        <hr style={{ width: "100%" }} />
                        <WithSorting>
                            <WithFiltersBar
                                FiltersBar={CoeqFiltersBar}
                                isPrintEnabled={isPrintEnabled}
                            >
                                <WithPagination>
                                    <CoeqDataTable />
                                </WithPagination>
                            </WithFiltersBar>
                        </WithSorting>
                    </WithSearch>
                </WithFilters>
            </List>
        </>
    );
};

export const ListContainer: React.FC<ListContainerProps> = ({
    list,
    municipalitySusId,
    teamIne,
    userProfile,
    isPrintEnabled,
}) => {
    return userProfile === PROFILE_ID.COEQ ? (
        <ContentCoeq
            municipalitySusId={municipalitySusId}
            teamIne={teamIne}
            list={list}
            isPrintEnabled={isPrintEnabled}
        />
    ) : (
        <ContentCoaps
            municipalitySusId={municipalitySusId}
            teamIne={teamIne}
            list={list}
            isPrintEnabled={isPrintEnabled}
        />
    );
};

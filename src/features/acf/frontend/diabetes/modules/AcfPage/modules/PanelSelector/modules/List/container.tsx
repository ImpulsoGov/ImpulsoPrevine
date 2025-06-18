import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import React from "react";
import type { AcfDashboardType } from "../../../../../../../../shared/diabetes/model";
import type { AppliedFiltersCoeq } from "./modules/CoeqDataTable";
import { CoeqDataTable } from "./modules/CoeqDataTable";
import { CoeqFiltersBar } from "./modules/CoeqFiltersBar";
import { CoeqInternalCards } from "./modules/CoeqInternalcards";
import { List } from "./presentation";
import type { ProfileIdValue } from "@/types/profile";
import { PROFILE_ID } from "@/types/profile";
import { CoapsDataTable } from "./modules/CoapsDataTable";

export type ListContainerProps = {
    list: AcfDashboardType;
    municipalitySusId: string;
    teamIne: string;
    userProfile: ProfileIdValue;
};

type ContentCoeqProps = {
    municipalitySusId: string;
    teamIne: string;
    list: AcfDashboardType;
};

//TODO: Pensar se faz sentido que isso fique aqui mesmo
const initialSelectedValues: AppliedFiltersCoeq = {
    patientStatus: [],
    conditionIdentifiedBy: "",
    communityHealthWorker: [],
    patientAgeRange: [],
};

const ContentCoaps: React.FC<ContentCoeqProps> = ({
    municipalitySusId,
    teamIne,
    list,
}) => {
    //TODO: Pegar municipalitySusId e teamIne dentro do InternalCardsCoeq e tirar da interface do Content e da ListContainer
    return (
        <>
            <CoeqInternalCards
                municipalitySusId={municipalitySusId}
                teamIne={teamIne}
            />
            <List list={list}>
                <WithSearch SearchComponent={SearchToolBar}>
                    <hr style={{ width: "100%" }} />
                    <WithSorting>
                        <WithFilters
                            initialSelectedValues={initialSelectedValues}
                            FiltersBar={CoeqFiltersBar}
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

const ContentCoeq: React.FC<ContentCoeqProps> = ({
    municipalitySusId,
    teamIne,
    list,
}) => {
    //TODO: Pegar municipalitySusId e teamIne dentro do InternalCardsCoeq e tirar da interface do Content e da ListContainer
    // TODO: criar card de COAPS e FilterBarCoaps
    return (
        <>
            <CoeqInternalCards
                municipalitySusId={municipalitySusId}
                teamIne={teamIne}
            />
            <List list={list}>
                <WithSearch SearchComponent={SearchToolBar}>
                    <hr style={{ width: "100%" }} />
                    <WithSorting>
                        <WithFilters
                            initialSelectedValues={initialSelectedValues}
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

export const ListContainer: React.FC<ListContainerProps> = ({
    list,
    municipalitySusId,
    teamIne,
    userProfile,
}) => {
    return userProfile === PROFILE_ID.COEQ ? (
        <ContentCoeq
            municipalitySusId={municipalitySusId}
            teamIne={teamIne}
            list={list}
        />
    ) : (
        <ContentCoaps
            municipalitySusId={municipalitySusId}
            teamIne={teamIne}
            list={list}
        />
    );
};

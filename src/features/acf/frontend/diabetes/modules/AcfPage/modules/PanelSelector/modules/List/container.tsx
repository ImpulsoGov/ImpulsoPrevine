import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import type { ProfileIdValue } from "@/types/profile";
import { PROFILE_ID } from "@/types/profile";
import React from "react";
import type { AcfDashboardType } from "../../../../../../../../shared/diabetes/model";
import {
    CoapsDataTable,
    type CoapsAppliedFilters,
} from "./modules/CoapsDataTable";
import {
    CoeqDataTable,
    type CoeqAppliedFilters,
} from "./modules/CoeqDataTable";
import { CoeqInternalCards } from "./modules/CoeqInternalcards";
import { List } from "./presentation";
import { CoapsFiltersBar } from "./modules/CoapsFiltersBar";
import { CoeqFiltersBar } from "./modules/CoeqFiltersBar";

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

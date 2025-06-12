import { WithPagination } from "@/features/acf/common/frontend/WithPagination";
import { WithSearch } from "@/features/acf/common/frontend/WithSearch";
import { WithFilters } from "@features/acf/common/frontend/WithFilters";
import { WithSorting } from "@features/acf/common/frontend/WithSorting";
import React from "react";
import type { AcfDashboardType } from "../../../../../../common/model";
import { List } from "./List";
import type { SelectedFilterValuesCoeq } from "./modules/CoeqDataTable";
import { CoeqDataTable } from "./modules/CoeqDataTable";
import { FiltersBarCoeq } from "./modules/FiltersBar";
import { InternalCardsCoeq } from "./modules/Internalcards";
import { ToolBar } from "./modules/ToolBar";

export type ListContainerProps = {
    list: AcfDashboardType;
    municipalitySusId: string;
    teamIne: string;
};

type ContentCoeqProps = {
    municipalitySusId: string;
    teamIne: string;
    list: AcfDashboardType;
};

//TODO: Pensar se faz sentido que isso fique aqui mesmo
const initialSelectedValues: SelectedFilterValuesCoeq = {
    patientStatus: [],
    conditionIdentifiedBy: "",
    visitantCommunityHealthWorker: [],
    patientAgeRange: [],
};

const ContentCoeq: React.FC<ContentCoeqProps> = ({
    municipalitySusId,
    teamIne,
    list,
}) => {
    //TODO: Pegar municipalitySusId e teamIne dentro do InternalCardsCoeq e tirar da interface do Content e da ListContainer
    return (
        <>
            <InternalCardsCoeq
                municipalitySusId={municipalitySusId}
                teamIne={teamIne}
            />
            <List list={list}>
                <WithSearch SearchComponent={ToolBar}>
                    <hr style={{ width: "100%" }} />
                    <WithSorting>
                        <WithFilters
                            initialSelectedValues={initialSelectedValues}
                            FiltersBar={FiltersBarCoeq}
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
}) => {
    return (
        <ContentCoeq
            municipalitySusId={municipalitySusId}
            teamIne={teamIne}
            list={list}
        />
    );
};

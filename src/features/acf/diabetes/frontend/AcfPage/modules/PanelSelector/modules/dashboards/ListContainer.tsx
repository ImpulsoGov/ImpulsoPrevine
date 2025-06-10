import React from "react";
import type { AcfDashboardType } from "../../../../../../common/model";
import { List } from "./List";
import { DataTable } from "./modules/DataTable";
import { FiltersBarCoeqs } from "./modules/FiltersBar";
import { InternalCardsCoeq } from "./modules/Internalcards";
import { ToolBar } from "./modules/ToolBar";
import { WithFilters } from "./modules/WithFilters";
import { WithPagination } from "./modules/WithPagination";
import { WithSearch } from "./modules/WithSearch";
import { WithSorting } from "./modules/WithSorting";

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
                        <WithFilters FiltersBar={FiltersBarCoeqs}>
                            <WithPagination>
                                <DataTable />
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

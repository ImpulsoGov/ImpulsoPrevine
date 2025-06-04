import React from "react";
import type { AcfDashboardType } from "../../../../../../common/model";
import { List } from "./List";
import { DataTable } from "./modules/DataTable";
import { InternalCards } from "./modules/Internalcards";
import { ToolBar } from "./modules/ToolBar";
import { WithFiltersCoaps, WithFiltersCoeq } from "./modules/WithFilters";
import { WithPagination } from "./modules/WithPagination";
import { WithSearch } from "./modules/WithSearch";
import { WithSorting } from "./modules/WithSorting";
import { FiltersBarCoaps, FiltersBarCoeqs } from "./modules/FiltersBar";

export type ListContainerProps = {
    list: AcfDashboardType;
    municipalitySusId: string;
    teamIne: string;
    visao: "coaps" | "coeq";
    // title: string;
};

type ContentCoapsProps = {
    municipalitySusId: string;
    list: AcfDashboardType;
};

const ContentCoaps: React.FC<ContentCoapsProps> = ({
    municipalitySusId,
    list,
}) => {
    return (
        <>
            <InternalCards municipalitySusId={municipalitySusId} />
            <List list={list}>
                <WithSearch SearchComponent={ToolBar}>
                    <hr style={{ width: "100%" }} />
                    <WithSorting>
                        <WithFiltersCoaps
                            municipalitySusID={municipalitySusId}
                            FiltersBar={FiltersBarCoaps}
                        >
                            <WithPagination>
                                <DataTable />
                            </WithPagination>
                        </WithFiltersCoaps>
                    </WithSorting>
                </WithSearch>
            </List>
        </>
    );
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
    return (
        <>
            <InternalCards
                municipalitySusId={municipalitySusId}
                teamIne={teamIne}
            />
            <List list={list}>
                <WithSearch SearchComponent={ToolBar}>
                    <hr style={{ width: "100%" }} />
                    <WithSorting>
                        <WithFiltersCoeq
                            FiltersBar={FiltersBarCoeqs}
                            municipalitySusID={municipalitySusId}
                            teamIne={teamIne}
                        >
                            <WithPagination>
                                <DataTable />
                            </WithPagination>
                        </WithFiltersCoeq>
                    </WithSorting>
                </WithSearch>
            </List>
        </>
    );
};

export const ListContainer: React.FC<ListContainerProps> = ({
    // title,
    list,
    municipalitySusId,
    teamIne,
    visao,
}) => {
    return visao == "coaps" ? (
        <ContentCoaps municipalitySusId={municipalitySusId} list={list} />
    ) : (
        <ContentCoeq
            municipalitySusId={municipalitySusId}
            teamIne={teamIne}
            list={list}
        />
    );
};

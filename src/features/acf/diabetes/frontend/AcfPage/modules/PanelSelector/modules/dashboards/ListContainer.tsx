import type { AcfDashboardType } from "../../../../../../common/model";
import { List } from "./List";
import { DataTable } from "./modules/DataTable";
import { InternalCards } from "./modules/Internalcards";
import { ToolBar } from "./modules/ToolBar";
import { WithFiltersCoaps, WithFiltersCoeq } from "./modules/WithFilters";
import { WithPagination } from "./modules/WithPagination";
import { WithSearch } from "./modules/WithSearch";
import { WithSorting } from "./modules/WithSorting";

export type ListContainerProps = {
    list: AcfDashboardType;
    municipalitySusId: string;
    teamIne: string;
    // title: string;
};

const ContentCoaps = ({ municipalitySusId }) => {
    return (
        <>
            <InternalCards municipalitySusId={municipalitySusId} />
            <List list={list}>
                <WithSearch SearchComponent={ToolBar}>
                    <hr style={{ width: "100%" }} />
                    <WithSorting>
                        <WithFiltersCoaps FiltersBar={WithFiltersCoaps}>
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

const ContentCoeq = ({ municipalitySusId, teamIne }) => {
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
                        <WithFiltersCoeq FiltersBar={CoeqFilterbar}>
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
    return visao == "Coaps" ? (
        <ContentCoaps municipalitySusId={municipalitySusId} />
    ) : (
        <ContentCoeq municipalitySusId={municipalitySusId} teamIne={teamIne} />
    );
};

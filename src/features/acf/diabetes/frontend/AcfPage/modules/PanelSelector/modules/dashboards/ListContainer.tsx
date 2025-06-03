import type { AcfDashboardType } from "../../../../../../common/model";
import { List } from "./List";
import { DataTable } from "./modules/DataTable";
import { InternalCards } from "./modules/Internalcards";
import { ToolBar } from "./modules/ToolBar";
import { WithFilters } from "./modules/WithFilters";
import { WithPagination } from "./modules/WithPagination";
import { WithSearch } from "./modules/WithSearch";
import { WithSorting } from "./modules/WithSorting";

export type ListContainerProps = {
    list: AcfDashboardType;
    municipalitySusId: string;
    teamIne: string;
    // title: string;
};

export const ListContainer: React.FC<ListContainerProps> = ({
    // title,
    list,
    municipalitySusId,
    teamIne,
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
                        <WithFilters
                            municipalitySusID={municipalitySusId}
                            teamIne={teamIne}
                        >
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

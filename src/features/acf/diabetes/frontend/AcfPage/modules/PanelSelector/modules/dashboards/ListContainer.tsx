import type { AcfDashboardType } from "../../../../../../common/model";
import { List } from "./List";
import { WithPagination } from "./modules/WithPagination";
import { WithFilters } from "./modules/WithFilters";
import { DataTable } from "./modules/DataTable";
import { InternalCards } from "./modules/Internalcards";
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
            </List>
        </>
    );
};

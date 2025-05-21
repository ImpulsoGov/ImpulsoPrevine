import type { AcfDashboardType } from "../../../../../../common/model";
import { List } from "./List";
import { WithPagination } from "./modules/WithPagination";
import { WithFilters } from "./modules/WithFilters";
import { DataTable } from "./modules/DataTable";
import { InternalCards } from "./modules/Internalcards";

export type ListContainerProps = {
    list: AcfDashboardType;
    municipalitySusId: string;
    teamIne: string;
    // title: string;
};

export const ListContainer = ({
    // title,
    list,
    municipalitySusId,
    teamIne,
}: ListContainerProps) => {
    return (
        <>
            <InternalCards
                municipalitySusId={municipalitySusId}
                teamIne={teamIne}
            />
            <List list={list}>
                <WithFilters
                    municipalitySusID={municipalitySusId}
                    teamIne={teamIne}
                >
                    <WithPagination >
                        <DataTable />
                    </WithPagination>
                </WithFilters>
            </List>
        </>
    );
};

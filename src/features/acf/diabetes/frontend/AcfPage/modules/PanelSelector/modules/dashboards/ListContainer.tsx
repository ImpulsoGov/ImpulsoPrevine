import type { AcfDashboardType } from "../../../../../../common/model";
import { List } from "./List";
import { InternalCards } from "./modules/cards/internalCards/InternalCards.container";
import { WithPagination } from "./modules/WithPagination";
import { FiltersContainer } from "./modules/WithFilters";
import { DataTable } from "./modules/DataTable";

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
                <FiltersContainer
                    municipalitySusID={municipalitySusId}
                    teamIne={teamIne}
                >
                    <WithPagination >
                        <DataTable />
                    </WithPagination>
                </FiltersContainer>
            </List>
        </>
    );
};

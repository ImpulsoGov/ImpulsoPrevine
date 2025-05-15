import type { AcfDashboardType } from "../../../../../../common/types";
import { List } from "./List";
import { InternalCards } from "./modules/cards/internalCards/InternalCards.container";
import { PaginatedTable } from "./modules/PaginatedTable";
import { FiltersContainer } from "./modules/TableWithFilters";

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
                    <PaginatedTable acfDashboardType={list} />
                </FiltersContainer>
            </List>
        </>
    );
};

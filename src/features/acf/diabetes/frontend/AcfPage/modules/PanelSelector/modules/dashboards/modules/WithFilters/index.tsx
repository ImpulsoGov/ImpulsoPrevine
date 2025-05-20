import type React from 'react';
import { filterOptions } from "../../../../../../../../backend/filters/controller"
import { WithFilters } from './presentation';

type FiltersContainerProps = React.PropsWithChildren<{
    municipalitySusID: string;
    teamIne: string;
}>

export const FiltersContainer = async ({
    municipalitySusID,
    teamIne,
    children,
}: FiltersContainerProps) => {
    // TODO rever nome do controller filterOptions
    const filtersValues = await filterOptions(
        municipalitySusID,
        teamIne,
    );

    return <WithFilters filtersValues={filtersValues}>{children}</WithFilters>
};
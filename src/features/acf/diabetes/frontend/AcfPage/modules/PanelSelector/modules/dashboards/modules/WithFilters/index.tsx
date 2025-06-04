import type React from "react";
import { filterOptions } from "../../../../../../../../backend/filters/controller";
import { Suspense } from "react";

type FiltersContainerProps = React.PropsWithChildren<{
    municipalitySusID: string;
    teamIne: string;
    FiltersBar: React.FC;
}>;

export const WithFiltersCoaps: React.FC<FiltersContainerProps> = async ({
    municipalitySusID,
    children,
    // FiltersBar,
}) => {
    // TODO rever nome do controller filterOptions
    const filtersValues = await filterOptionsCoaps(municipalitySusID);

    return (
        <Suspense>
            <FiltersBar filtersValues={filtersValues}>{children}</FiltersBar>
        </Suspense>
    );
};

export const WithFiltersCoeq: React.FC<FiltersContainerProps> = async ({
    municipalitySusID,
    teamIne,
    children,
    FiltersBar,
}) => {
    // TODO rever nome do controller filterOptions
    const filtersValues = await filterOptionsCoeq(municipalitySusID, teamIne);

    return (
        <Suspense>
            <FiltersBar filtersValues={filtersValues}>{children}</FiltersBar>
        </Suspense>
    );
};

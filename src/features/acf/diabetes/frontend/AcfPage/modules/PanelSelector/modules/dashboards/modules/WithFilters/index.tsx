import type React from "react";
import { filterOptions } from "../../../../../../../../backend/filters/controller";
import { Suspense } from "react";
import * as Presentation from "./presentation";

type FiltersContainerProps = React.PropsWithChildren<{
    municipalitySusID: string;
    teamIne: string;
}>;

export const WithFilters: React.FC<FiltersContainerProps> = async ({
    municipalitySusID,
    teamIne,
    children,
}) => {
    // TODO rever nome do controller filterOptions
    const filtersValues = await filterOptions(municipalitySusID, teamIne);

    return (
        <Suspense>
            <Presentation.WithFilters filtersValues={filtersValues}>
                {children}
            </Presentation.WithFilters>
        </Suspense>
    );
};

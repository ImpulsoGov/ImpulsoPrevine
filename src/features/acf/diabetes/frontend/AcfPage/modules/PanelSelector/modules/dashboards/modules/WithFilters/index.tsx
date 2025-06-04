import type React from "react";
import {
    filterOptionsCoaps,
    filterOptionsCoeq,
} from "../../../../../../../../backend/filters/controller";
import { Suspense } from "react";
import type { FiltersUi } from "@/features/acf/diabetes/frontend/model";

type WithFiltersCoapsProps = React.PropsWithChildren<{
    municipalitySusID: string;
    FiltersBar: React.FC<React.PropsWithChildren<{ filtersValues: FiltersUi }>>;
}>;

type WithFiltersCoeqsProps = React.PropsWithChildren<{
    municipalitySusID: string;
    teamIne: string;
    FiltersBar: React.FC<React.PropsWithChildren<{ filtersValues: FiltersUi }>>;
}>;

export const WithFiltersCoaps: React.FC<WithFiltersCoapsProps> = async ({
    municipalitySusID,
    children,
    FiltersBar,
}) => {
    // TODO rever nome do controller filterOptions
    const filtersValues = await filterOptionsCoaps(municipalitySusID);

    return (
        <Suspense>
            <FiltersBar filtersValues={filtersValues}>{children}</FiltersBar>
        </Suspense>
    );
};

export const WithFiltersCoeq: React.FC<WithFiltersCoeqsProps> = async ({
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

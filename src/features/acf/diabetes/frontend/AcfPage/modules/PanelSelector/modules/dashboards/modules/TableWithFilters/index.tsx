import type React from 'react';
import { filterOptions } from "../../../../../../../../backend/filters/controller"
import { modelToDB } from "../../../../../../../../backend/filters/adapter";
import { TableWithFilters } from './TableWithFilters.presentation';

type FiltersContainerProps = {
    municipalitySusID: string;
    teamIne: string;
    children: React.ReactNode;
}

export const FiltersContainer = async ({
    municipalitySusID,
    teamIne,
    children,
}: FiltersContainerProps) => {
    //TODO: Remover essa utilização de modelToDB daqui, usar essa função no controller.
    const filtersValues = await filterOptions(
        municipalitySusID,
        teamIne,
        modelToDB([
            "visitantCommunityHealthWorker",
            "patientStatus",
            "conditionIdentifiedBy",
            "patientAgeRange",
        ]),
    );

    return (
        <TableWithFilters filtersValues={filtersValues}>{children}</TableWithFilters>
    );
};
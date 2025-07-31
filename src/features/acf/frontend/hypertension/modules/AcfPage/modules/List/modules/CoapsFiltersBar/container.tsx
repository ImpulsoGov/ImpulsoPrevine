"use client";
import { type Dispatch, type SetStateAction } from "react";
//TODO: Mover este tipo para um lugar em comum entre DataTable e FilterBar
import { FiltersBar } from "@features/acf/frontend/common/FiltersBar";
import type { HypertensionCoapsAppliedFilters } from "@features/acf/frontend/hypertension";
import { toSelectConfigsCoaps } from "./logic";
import * as service from "./service";

type CoapsFiltersBarProps = React.PropsWithChildren<{
    selectedValues: HypertensionCoapsAppliedFilters;
    setSelectedValues: Dispatch<
        SetStateAction<HypertensionCoapsAppliedFilters>
    >;
}>;

export const CoapsFiltersBar: React.FC<CoapsFiltersBarProps> = ({
    selectedValues,
    setSelectedValues,
}) => {
    return (
        <FiltersBar
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            filtersToSelectConfigs={toSelectConfigsCoaps}
            serviceGetFilters={service.getFiltersCoaps}
        />
    );
};

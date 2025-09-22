"use client";
import { type Dispatch, type SetStateAction } from "react";
//TODO: Mover este tipo para um lugar em comum entre DataTable e FilterBar
import { FiltersBar } from "@features/acf/frontend/common/FiltersBar";
import type { CoapsAppliedFilters } from "@features/acf/frontend/hypertension";
import { toSelectConfigsCoapsAlpha, toSelectConfigsCoapsBeta } from "./logic";
import * as service from "./service";

type CoapsFiltersBarProps = React.PropsWithChildren<{
    selectedValues: CoapsAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<CoapsAppliedFilters>>;
    isPrintEnabled: boolean;
}>;

export const CoapsFiltersBar: React.FC<CoapsFiltersBarProps> = ({
    selectedValues,
    setSelectedValues,
    isPrintEnabled,
}) => {
    return (
        <FiltersBar
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            filtersToSelectConfigs={
                isPrintEnabled
                    ? toSelectConfigsCoapsBeta
                    : toSelectConfigsCoapsAlpha
            }
            serviceGetFilters={service.getFiltersCoaps}
        />
    );
};

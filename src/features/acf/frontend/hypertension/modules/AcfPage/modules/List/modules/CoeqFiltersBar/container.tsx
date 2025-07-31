"use client";
import type { HypertensionCoeqAppliedFilters } from "@/features/acf/frontend/hypertension";
import { FiltersBar } from "@features/acf/frontend/common/FiltersBar";
import { type Dispatch, type SetStateAction } from "react";
import { toSelectConfigsCoeq } from "./logic";
import * as service from "./service";

type CoeqFiltersBarProps = React.PropsWithChildren<{
    selectedValues: HypertensionCoeqAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<HypertensionCoeqAppliedFilters>>;
}>;

export const CoeqFiltersBar: React.FC<CoeqFiltersBarProps> = ({
    selectedValues,
    setSelectedValues,
}) => {
    return (
        <FiltersBar
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            filtersToSelectConfigs={toSelectConfigsCoeq}
            serviceGetFilters={service.getFiltersCoeq}
        />
    );
};

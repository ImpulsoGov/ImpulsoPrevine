"use client";
import type { CoeqAppliedFilters } from "@/features/acf/frontend/diabetes";
import { FiltersBar } from "@features/acf/frontend/common/FiltersBar";
import { type Dispatch, type SetStateAction } from "react";
import { toSelectConfigsCoeq } from "./logic";
import * as service from "./service";

type CoeqFiltersBarProps = React.PropsWithChildren<{
    selectedValues: CoeqAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<CoeqAppliedFilters>>;
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
        ></FiltersBar>
    );
};

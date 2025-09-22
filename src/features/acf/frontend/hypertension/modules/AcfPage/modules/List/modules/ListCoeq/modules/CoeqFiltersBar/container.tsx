"use client";
import type { CoeqAppliedFilters } from "@/features/acf/frontend/hypertension";
import { FiltersBar } from "@features/acf/frontend/common/FiltersBar";
import { type Dispatch, type SetStateAction } from "react";
import { toSelectConfigsCoeqAlpha, toSelectConfigsCoeqBeta } from "./logic";
import * as service from "./service";

type CoeqFiltersBarProps = React.PropsWithChildren<{
    selectedValues: CoeqAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<CoeqAppliedFilters>>;
    isPrintEnabled: boolean;
}>;

export const CoeqFiltersBar: React.FC<CoeqFiltersBarProps> = ({
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
                    ? toSelectConfigsCoeqBeta
                    : toSelectConfigsCoeqAlpha
            }
            serviceGetFilters={service.getFiltersCoeq}
        />
    );
};

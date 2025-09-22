import type * as schema from "@/features/acf/shared/hypertension/schema";
import type { SelectConfig } from "@/features/acf/frontend/common/SelectConfig";
import {
    toSelectConfigsSharedAlpha,
    toSelectConfigsSharedBeta,
} from "../../../common/SharedSelectConfigs";

export const toSelectConfigsCoeqAlpha = (
    filtersValues: schema.CoeqFilters
): Array<SelectConfig> => {
    return [...toSelectConfigsSharedAlpha(filtersValues)];
};

export const toSelectConfigsCoeqBeta = (
    filtersValues: schema.CoeqFilters
): Array<SelectConfig> => {
    return [...toSelectConfigsSharedBeta(filtersValues)];
};

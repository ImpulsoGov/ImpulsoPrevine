import type * as schema from "@/features/acf/shared/hypertension/schema";
import { toSelectConfigsShared } from "../common/toSelectConfigsShared";
import type { SelectConfig } from "@/features/acf/frontend/common/SelectConfig";

export const toSelectConfigsCoeq = (
    filtersValues: schema.CoeqFilters
): Array<SelectConfig> => {
    return [...toSelectConfigsShared(filtersValues)];
};

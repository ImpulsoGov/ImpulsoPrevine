import type * as schema from "@/features/acf/shared/hypertension/schema";
import type { SelectConfig } from "@/features/acf/frontend/common/SelectConfig";
import { toSelectConfigsShared } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/SharedSelectConfigs";

export const toSelectConfigsCoeq = (
    filtersValues: schema.CoeqFilters
): Array<SelectConfig> => {
    return [...toSelectConfigsShared(filtersValues)];
};

import type * as schema from "@/features/acf/shared/diabetes/schema";
import { toSelectConfigsShared } from "../../logic";
import type { SelectConfig } from "../common/SelectConfig";

export const toSelectConfigsCoeq = (
    filtersValues: schema.CoeqFilters
): Array<SelectConfig> => {
    return [...toSelectConfigsShared(filtersValues)];
};

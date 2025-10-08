import { sharedInitialSelectedValues } from "@/features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/SharedAppliedFilters";
import type { CoeqAppliedFilters } from "./modules/CoeqDataTable";

export const initialSelectedValuesCoeq: CoeqAppliedFilters = {
    ...sharedInitialSelectedValues,
};

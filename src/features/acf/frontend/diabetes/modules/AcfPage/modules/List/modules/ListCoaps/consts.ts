import { sharedInitialSelectedValues } from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/List/modules/common/SharedAppliedFilters";
import type { CoapsAppliedFilters } from "./modules/CoapsDataTable";

export const initialSelectedValuesCoaps: CoapsAppliedFilters = {
    ...sharedInitialSelectedValues,
    careTeamName: [],
};

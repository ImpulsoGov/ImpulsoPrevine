import type { DiabetesSharedAppliedFilters } from "@features/acf/frontend/diabetes/modules/AcfPage/modules/List/modules/common/SharedAppliedFilters";

export type CoapsAppliedFilters = DiabetesSharedAppliedFilters & {
    careTeamName: Array<string>;
};

import type { HypertensionSharedAppliedFilters } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/SharedAppliedFilters";

export type CoapsAppliedFilters = HypertensionSharedAppliedFilters & {
    careTeamName: Array<string>;
};

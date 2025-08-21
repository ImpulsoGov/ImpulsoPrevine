import type { HypertensionSharedAppliedFilters } from "../common/SharedAppliedFilters";

export type CoapsAppliedFilters = HypertensionSharedAppliedFilters & {
    careTeamName: Array<string>;
};

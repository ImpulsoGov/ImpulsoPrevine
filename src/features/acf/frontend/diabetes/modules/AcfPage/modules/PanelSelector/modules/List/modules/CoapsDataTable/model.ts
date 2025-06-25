//TODO: rever este import
import type { SharedAppliedFilters } from "../common/SharedAppliedFilters";

export type AppliedFiltersCoaps = SharedAppliedFilters & {
    careTeamName: Array<string>;
};

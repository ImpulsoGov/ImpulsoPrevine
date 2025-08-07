//TODO: rever este import
import type { SharedAppliedFilters } from "../common/SharedAppliedFilters";

export type CoapsAppliedFilters = SharedAppliedFilters & {
    careTeamName: Array<string>;
};

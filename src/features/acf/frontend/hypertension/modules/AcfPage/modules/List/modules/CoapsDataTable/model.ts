import type { HypertensionSharedAppliedFilters } from "../common/SharedAppliedFilters";

export type HypertensionCoapsAppliedFilters =
    HypertensionSharedAppliedFilters & {
        careTeamName: Array<string>;
    };

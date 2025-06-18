import type { AppliedFiltersCoeq } from "../CoeqDataTable/model";

export type AppliedFiltersCoaps = AppliedFiltersCoeq & {
    careTeamName: Array<string>;
};

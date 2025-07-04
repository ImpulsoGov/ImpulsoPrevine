import type * as schema from "@/features/acf/shared/diabetes/schema";
import {
    sortedOptions,
    toHtmlSelectOptions,
    toSelectConfigsShared,
} from "../../logic";
import type { SelectConfig } from "../common/SelectConfig";

//TODO: Existem funcoes duplicadas entre CoapsFiltersBar e CoeqFiltersBar, podemos criar uma camada de abstração para elas

// export type FilterOptions =
//     | Array<CommunityHealthWorker>
//     | Array<PatientStatus>
//     | Array<ConditionIdentifiedBy>
//     | Array<PatientAgeRange>;

export const toSelectConfigsCoaps = (
    filtersValues: schema.CoapsFilters
): Array<SelectConfig> => {
    return [
        ...toSelectConfigsShared(filtersValues),
        {
            options: toHtmlSelectOptions(filtersValues.careTeamName).sort(
                sortedOptions
            ),
            label: "Equipe",
            id: "careTeamName",
            isMultiSelect: true,
            width: "330px",
        },
    ];
};

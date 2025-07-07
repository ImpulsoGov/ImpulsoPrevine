import type * as schema from "@/features/acf/shared/diabetes/schema";
import {
    sortedOptions,
    toHtmlSelectOptions,
    toSelectConfigsShared,
} from "../../logic";
import type { SelectConfig } from "../common/SelectConfig";
import { nameFormatter } from "../../../../../../logic";

export const toSelectConfigsCoaps = (
    filtersValues: schema.CoapsFilters
): Array<SelectConfig> => {
    return [
        ...toSelectConfigsShared(filtersValues),
        {
            options: toHtmlSelectOptions(filtersValues.careTeamName)
                .map((item) => ({ ...item, label: nameFormatter(item.label) }))
                .sort(sortedOptions),
            label: "Equipe",
            id: "careTeamName",
            isMultiSelect: true,
            width: "330px",
        },
    ];
};

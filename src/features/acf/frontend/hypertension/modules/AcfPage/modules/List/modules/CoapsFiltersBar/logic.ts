import type * as schema from "@/features/acf/shared/hypertension/schema";
import {
    sortedOptions,
    toHtmlSelectOptions,
    toSelectConfigsShared,
} from "../common/toSelectConfigsShared";
import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import type { SelectConfig } from "@/features/acf/frontend/common/SelectConfig";

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

import type * as schema from "@/features/acf/shared/diabetes/schema";
import * as Formatters from "@/features/acf/frontend/common/Formatters/modules/NameFormatter";
import type { SelectConfig } from "@/features/acf/frontend/common/SelectConfig";
import { toHtmlSelectOptions } from "@/features/acf/frontend/common/HtmlSelectOptions";
import { toSelectConfigsShared } from "@features/acf/frontend/diabetes/modules/AcfPage/modules/List/modules/common/SharedSelectConfigs";

export const toSelectConfigsCoaps = (
    filtersValues: schema.CoapsFilters
): Array<SelectConfig> => {
    return [
        ...toSelectConfigsShared(filtersValues),
        {
            options: toHtmlSelectOptions(filtersValues.careTeamName).map(
                (item) => ({
                    ...item,
                    label: Formatters.teamNameFormatter(item.label),
                })
            ),
            label: "Equipe",
            id: "careTeamName",
            isMultiSelect: true,
            width: "330px",
        },
    ];
};

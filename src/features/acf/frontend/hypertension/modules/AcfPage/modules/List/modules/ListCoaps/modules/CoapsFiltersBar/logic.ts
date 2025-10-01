import type * as schema from "@/features/acf/shared/hypertension/schema";
import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import type { SelectConfig } from "@/features/acf/frontend/common/SelectConfig";
import { toHtmlSelectOptions } from "@/features/acf/frontend/common/HtmlSelectOptions";
import { toSelectConfigsShared } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/SharedSelectConfigs";

export const toSelectConfigsCoaps = (
    filtersValues: schema.CoapsFilters
): Array<SelectConfig> => {
    return [
        ...toSelectConfigsShared(filtersValues),
        {
            options: toHtmlSelectOptions(filtersValues.careTeamName).map(
                (item) => ({ ...item, label: nameFormatter(item.label) })
            ),
            label: "Equipe",
            id: "careTeamName",
            isMultiSelect: true,
            width: "330px",
        },
    ];
};

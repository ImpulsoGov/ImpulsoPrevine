import type * as schema from "@/features/acf/shared/hypertension/schema";
import type { SelectConfig } from "@/features/acf/frontend/common/SelectConfig";
import { toHtmlSelectOptions } from "@/features/acf/frontend/common/HtmlSelectOptions";
import { microAreaFormatter } from "@/features/acf/frontend/common/Formatters";

export const toSelectConfigsShared = (
    filtersValues: schema.SharedFilters
): Array<SelectConfig> => {
    return [
        {
            options: toHtmlSelectOptions(filtersValues.microAreaName).map(
                (item) => ({
                    ...item,
                    label: microAreaFormatter(item.label),
                })
            ),
            label: "Microárea",
            id: "microAreaName",
            isMultiSelect: true,
            width: "321px",
        },
        {
            options: toHtmlSelectOptions(
                filtersValues.goodPracticesStatusByQuarter
            ),
            label: "Situação da Boas Práticas",
            id: "goodPracticesStatusByQuarter",
            isMultiSelect: false,
            width: "290px",
        },
        {
            options: toHtmlSelectOptions(
                filtersValues.medicalRecordUpdated
            ).reverse(),
            label: "Situação Cadastral FCI",
            id: "medicalRecordUpdated",
            isMultiSelect: false,
            width: "282px",
        },
        {
            options: toHtmlSelectOptions(filtersValues.patientAgeRange),
            label: "Faixa Etária",
            id: "patientAgeRange",
            isMultiSelect: false,
            width: "280px",
        },
    ];
};

import type * as schema from "@/features/acf/shared/hypertension/schema";
import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import type { SelectConfig } from "@/features/acf/frontend/common/SelectConfig";
import { toHtmlSelectOptions } from "@/features/acf/frontend/common/HtmlSelectOptions";

export const toSelectConfigsShared = (
    filtersValues: schema.SharedFilters
): Array<SelectConfig> => {
    return [
        {
            options: toHtmlSelectOptions(filtersValues.microAreaName)
                .map((item) => ({ ...item, label: nameFormatter(item.label) }))
                .sort((a, b) => a.label.localeCompare(b.label)),
            label: "Microárea",
            id: "microAreaName",
            isMultiSelect: true,
            width: "321px",
        },
        {
            options: toHtmlSelectOptions(
                filtersValues.appointmentStatusByQuarter
            ).sort((a, b) => a.label.localeCompare(b.label)),
            label: "Consulta",
            id: "appointmentStatusByQuarter",
            isMultiSelect: true,
            width: "299px",
        },
        {
            options: toHtmlSelectOptions(
                filtersValues.latestExamRequestStatusByQuarter
            ).sort((a, b) => a.label.localeCompare(b.label)),
            label: "Aferição de PA",
            id: "latestExamRequestStatusByQuarter",
            isMultiSelect: true,
            width: "232px",
        },
        {
            options: toHtmlSelectOptions(filtersValues.patientAgeRange).sort(
                (a, b) => a.label.localeCompare(b.label)
            ),
            label: "Faixa Etária",
            id: "patientAgeRange",
            isMultiSelect: false,
            width: "280px",
        },
    ];
};

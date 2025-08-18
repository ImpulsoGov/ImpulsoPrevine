import type * as schema from "@/features/acf/shared/hypertension/schema";
import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import type { SelectConfig } from "@/features/acf/frontend/common/SelectConfig";
import { toHtmlSelectOptions } from "@/features/acf/frontend/common/HtmlSelectOptions";
import { sortedOptions } from "@/features/acf/frontend/common/SortedOptions";

const appointmentReferenceOrder = [
    //TODO: remover esse Q maiusculo do Quadri que foi corrigido em outro PR.
    "Nunca realizada",
    "Atrasada",
    "Vence dentro do Quadri",
    "Em dia",
];
const latestExamReferencerOrder = appointmentReferenceOrder;

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
            ).sort((a, b) => sortedOptions(a, b, appointmentReferenceOrder)),
            label: "Consulta",
            id: "appointmentStatusByQuarter",
            isMultiSelect: true,
            width: "299px",
        },
        {
            options: toHtmlSelectOptions(
                filtersValues.latestExamRequestStatusByQuarter
            ).sort((a, b) => sortedOptions(a, b, latestExamReferencerOrder)),
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

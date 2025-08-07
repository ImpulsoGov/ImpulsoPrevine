import type * as schema from "@/features/acf/shared/diabetes/schema";
import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import type {
    HtmlSelectOption,
    SelectConfig,
} from "@/features/acf/frontend/common/SelectConfig";
import { toHtmlSelectOptions } from "@/features/acf/frontend/common/HtmlSelectOptions";

const referenceOrder = [
    "Menos de 17 anos",
    "Entre 18 e 24 anos",
    "Entre 25 e 34 anos",
    "Entre 35 e 44 anos",
    "Entre 45 e 54 anos",
    "Entre 55 e 65 anos",
    "Mais de 65 anos",
];

export const sortedOptions = (
    a: HtmlSelectOption,
    b: HtmlSelectOption
): number => referenceOrder.indexOf(a.label) - referenceOrder.indexOf(b.label);

export const toSelectConfigsShared = (
    filtersValues: schema.SharedFilters
): Array<SelectConfig> => {
    return [
        {
            options: toHtmlSelectOptions(filtersValues.communityHealthWorker)
                .map((item) => ({ ...item, label: nameFormatter(item.label) }))
                .sort((a, b) => a.label.localeCompare(b.label)),
            label: "Prof. Responsável",
            id: "communityHealthWorker",
            isMultiSelect: true,
            width: "321px",
        },
        {
            options: toHtmlSelectOptions(filtersValues.patientStatus).sort(
                (a, b) => a.label.localeCompare(b.label)
            ),
            label: "Situação",
            id: "patientStatus",
            isMultiSelect: true,
            width: "299px",
        },
        {
            options: toHtmlSelectOptions(
                filtersValues.conditionIdentifiedBy
            ).sort((a, b) => a.label.localeCompare(b.label)),
            label: "Tipo de Diagnóstico",
            id: "conditionIdentifiedBy",
            isMultiSelect: false,
            width: "232px",
        },
        {
            options: toHtmlSelectOptions(filtersValues.patientAgeRange).sort(
                sortedOptions
            ),
            label: "Faixa Etária",
            id: "patientAgeRange",
            isMultiSelect: true,
            width: "280px",
        },
    ];
};

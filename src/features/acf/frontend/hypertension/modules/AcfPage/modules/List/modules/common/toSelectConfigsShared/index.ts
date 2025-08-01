import type * as z from "zod/v4";
import type * as schema from "@/features/acf/shared/hypertension/schema";
import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import type {
    HtmlSelectOption,
    SelectConfig,
} from "@/features/acf/frontend/common/SelectConfig";

const referenceOrder = [
    "Menos de 17 anos",
    "Entre 18 e 24 anos",
    "Entre 25 e 34 anos",
    "Entre 35 e 44 anos",
    "Entre 45 e 54 anos",
    "Entre 55 e 65 anos",
    "Mais de 65 anos",
];

type FilterOptions = Array<string> | Array<number>;

export const sortedOptions = (
    a: HtmlSelectOption,
    b: HtmlSelectOption
): number => referenceOrder.indexOf(a.label) - referenceOrder.indexOf(b.label);

export const onlyValidFilterValues = <TFilterValue>(
    filterValues: Array<TFilterValue>,
    schema: z.ZodType
): Array<TFilterValue> => {
    return filterValues.filter(
        (filterValue: TFilterValue) => schema.safeParse(filterValue).success
    );
};

export const toHtmlSelectOptions = (
    filterValues: FilterOptions
): Array<HtmlSelectOption> => {
    return filterValues.map<HtmlSelectOption>((item) => ({
        value: item,
        label: String(item),
    }));
};

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
                sortedOptions
            ),
            label: "Faixa Etária",
            id: "patientAgeRange",
            isMultiSelect: false,
            width: "280px",
        },
    ];
};

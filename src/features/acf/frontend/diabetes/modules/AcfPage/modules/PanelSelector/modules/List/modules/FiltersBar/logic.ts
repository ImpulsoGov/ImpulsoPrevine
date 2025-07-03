import { referenceOrder } from "./consts";
import type * as z from "zod/v4";

export type HtmlSelectOption = {
    value: string;
    label: string;
};

export type SelectConfig = {
    id: string;
    label: string;
    options: Array<HtmlSelectOption>;
    isMultiSelect: boolean;
    width: string;
};

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
        label: item,
    }));
};

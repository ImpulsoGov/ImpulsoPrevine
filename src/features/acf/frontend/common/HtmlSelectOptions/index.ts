import type { HtmlSelectOption } from "../SelectConfig";

export const toHtmlSelectOptions = (
    filterValues: Array<string>
): Array<HtmlSelectOption> => {
    return filterValues.map<HtmlSelectOption>((item) => ({
        value: item,
        label: item,
    }));
};

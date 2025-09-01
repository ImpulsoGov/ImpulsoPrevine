import type { HtmlSelectOption } from "../SelectConfig";

export const toHtmlSelectOptions = (
    filterValues: Array<string | null>
): Array<HtmlSelectOption> => {
    return filterValues.map<HtmlSelectOption>((item) => ({
        value: item,
        label: item,
    }));
};

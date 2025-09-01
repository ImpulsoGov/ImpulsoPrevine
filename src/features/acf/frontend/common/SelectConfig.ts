export type HtmlSelectOption = {
    value: string | null;
    label: string;
};

export type SelectConfig = {
    id: string;
    label: string;
    options: Array<HtmlSelectOption>;
    isMultiSelect: boolean;
    width: string;
};

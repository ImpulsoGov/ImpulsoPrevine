export type HtmlSelectOption = {
    value: string | number;
    label: string;
};

export type SelectConfig = {
    id: string;
    label: string;
    options: Array<HtmlSelectOption>;
    isMultiSelect: boolean;
    width: string;
};

import type { HtmlSelectOption } from "@/features/acf/frontend/common/SelectConfig";

export const sortedOptions = (
    a: HtmlSelectOption,
    b: HtmlSelectOption,
    referenceOrder: Array<string>
): number => referenceOrder.indexOf(a.label) - referenceOrder.indexOf(b.label);

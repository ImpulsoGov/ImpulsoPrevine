import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
    CommunityHealthWorker,
} from "@/features/acf/shared/diabetes/model";
import type * as schema from "@/features/acf/shared/diabetes/schema";
import type * as z from "zod/v4";
import { referenceOrder } from "./consts";
import { toSelectConfigsCoeq } from "../CoeqFiltersBar/logic";

//TODO: Existem funcoes duplicadas entre CoapsFiltersBar e CoeqFiltersBar, podemos criar uma camada de abstração para elas

export type FilterOptions =
    | Array<CommunityHealthWorker>
    | Array<PatientStatus>
    | Array<ConditionIdentifiedBy>
    | Array<PatientAgeRange>;

export type SelectConfig = {
    id: string;
    label: string;
    options: Array<HtmlSelectOption>;
    isMultiSelect: boolean;
    width: string;
};

export type HtmlSelectOption = {
    value: string;
    label: string;
};

export const sortedOptions = (
    a: HtmlSelectOption,
    b: HtmlSelectOption
): number => referenceOrder.indexOf(a.label) - referenceOrder.indexOf(b.label);

export const toSelectConfigsCoaps = (
    filtersValues: schema.CoapsFilters
): Array<SelectConfig> => {
    return [
        ...toSelectConfigsCoeq(filtersValues),
        {
            options: toHtmlSelectOptions(filtersValues.careTeamName).sort(
                sortedOptions
            ),
            label: "Equipe",
            id: "careTeamName",
            isMultiSelect: true,
            width: "178px",
        },
    ];
};

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

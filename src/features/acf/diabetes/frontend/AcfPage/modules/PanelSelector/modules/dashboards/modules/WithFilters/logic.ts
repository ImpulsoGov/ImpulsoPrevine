import type { FiltersUi, SelectedValues } from "@/features/acf/diabetes/frontend/model";
import type { VisitantCommunityHealthWorker, PatientStatus, ConditionIdentifiedBy, PatientAgeRange } from "@/features/acf/diabetes/common/model";
import * as schema from "@/features/acf/diabetes/common/schema";
import { referenceOrder } from "./consts";
import type * as z from "zod";

export type FilterValues = VisitantCommunityHealthWorker[] | PatientStatus[] | ConditionIdentifiedBy[] | PatientAgeRange[];

export type SelectConfig = {
    id: string;
    label: string;
    options: HtmlSelectOption[];
    isMultiSelect: boolean;
    width: string;
};

export type HtmlSelectOption = {
    value: string;
    label: string;
};

export const sortedOptions = (a: HtmlSelectOption, b: HtmlSelectOption) => referenceOrder.indexOf(a.label) - referenceOrder.indexOf(b.label);

export const createSelectConfigs = (filtersValues: FiltersUi): SelectConfig[] => [
    {
        options: selectOptions(filtersValues.visitantCommunityHealthWorker)
            .sort((a, b) => (a.label).localeCompare(b.label)),
        label: "Prof. Responsável",
        id: "visitantCommunityHealthWorker",
        isMultiSelect: true,
        width: "330px",
    },
    {
        options: selectOptions(filtersValues.patientStatus)
            .sort((a, b) => (a.label).localeCompare(b.label)),
        label: "Situação",
        id: "patientStatus",
        isMultiSelect: true,
        width: "178px",
    },
    {
        options: selectOptions(filtersValues.conditionIdentifiedBy)
            .sort((a, b) => (a.label).localeCompare(b.label)),
        label: "Tipo de Diagnóstico",
        id: "conditionIdentifiedBy",
        isMultiSelect: false,
        width: "228px",
    },
    {
        options: selectOptions(filtersValues.patientAgeRange)
            .sort(sortedOptions),
        label: "Faixa Etária",
        id: "patientAgeRange",
        isMultiSelect: true,
        width: "178px",
    },
];

export const onlyValidFilterValues = <FilterValue, Schema extends z.ZodTypeAny>(FilterValues: FilterValue[], schema: Schema) =>
    FilterValues.filter((filterValue: FilterValue) => schema.safeParse(filterValue).success);

export const selectOptions = (filterValues: FilterValues): HtmlSelectOption[] => {
    return filterValues.map<HtmlSelectOption>((item) => ({
        value: item,
        label: item,
    }));
};

export const searchParamsToSelectedValues = (
    searchParams: URLSearchParams
): SelectedValues => {
    const patientsStatus = searchParams.get("patientStatus")?.split(",") as schema.PatientStatus[] ?? [];
    const ranges = searchParams.get("patientAgeRange")?.split(",") as schema.PatientAgeRange[] ?? [];
    return {
        visitantCommunityHealthWorker: searchParams.get("visitantCommunityHealthWorker")?.split(",") ?? [],
        patientStatus: onlyValidFilterValues(patientsStatus, schema.patientStatus),
        conditionIdentifiedBy: searchParams.get("conditionIdentifiedBy")?.split(",")[0] as schema.ConditionIdentifiedBy ?? "",
        patientAgeRange: onlyValidFilterValues(ranges, schema.patientAgeRange)
    };
};



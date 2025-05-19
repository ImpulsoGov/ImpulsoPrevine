import type { SelectedValues } from "@/features/acf/diabetes/frontend/model";
import * as schema from "@/features/acf/diabetes/common/schema";
import type * as z from 'zod';

export type SelectConfig = {
    id: string;
    label: string;
    options: HtmlSelectOption[];
    isMultiSelect: boolean;
    width: string;
}

export type HtmlSelectOption = {
    value: string;
    label: string;
};

function onlyValidFilterValues<FilterValue, Schema extends z.ZodTypeAny>(FilterValues: FilterValue[], schema: Schema) {
    return FilterValues.filter((filterValue: FilterValue) => schema.safeParse(filterValue).success);
}

 
export const searchParamsToSelectedValues = (
    searchParams: URLSearchParams
): SelectedValues =>{
    const patientsStatus = searchParams.get("patientStatus")?.split(",") as schema.PatientStatus[] ?? []
    const ranges = searchParams.get("patientAgeRange")?.split(",") as schema.PatientAgeRange[] ?? []
    return {
        visitantCommunityHealthWorker: searchParams.get("visitantCommunityHealthWorker")?.split(",") ?? [],
        patientStatus: onlyValidFilterValues(patientsStatus, schema.patientStatus),
        conditionIdentifiedBy: searchParams.get("conditionIdentifiedBy")?.split(",")[0] as schema.ConditionIdentifiedBy ?? "",
        patientAgeRange: onlyValidFilterValues(ranges, schema.patientAgeRange)
    };
}
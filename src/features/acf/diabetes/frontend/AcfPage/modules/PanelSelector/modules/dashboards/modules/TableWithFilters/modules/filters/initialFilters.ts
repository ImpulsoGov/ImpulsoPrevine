import type { Filters } from "@/features/acf/diabetes/common/model";
import * as schema from "@/features/acf/diabetes/common/schema";
import type * as z from 'zod';

export type Filter = {
    id: string;
    label: string;
    options: OptionsType[] | OptionsType;
    isMultiSelect: boolean;
    width: string;
}

export type OptionsType = {
    value: string;
    label: string;
};

function onlyValidFilterValues<FilterValue, Schema extends z.ZodTypeAny>(FilterValues: FilterValue[], schema: Schema) {
    return FilterValues.filter((filterValue: FilterValue) => schema.safeParse(filterValue).success);
}

// Union type do conteudo de cada key do filters como array 
export const initialFiltersBuilder = (
    searchParams: URLSearchParams
): Filters =>{

    const patientsStatus = searchParams.get("patientStatus")?.split(",") as schema.PatientStatus[] ?? []
    const ranges = searchParams.get("patientAgeRange")?.split(",") as schema.PatientAgeRange[] ?? []

    return {
        visitantCommunityHealthWorker: searchParams.get("visitantCommunityHealthWorker")?.split(",") ?? [],
        patientStatus: onlyValidFilterValues(patientsStatus, schema.patientStatus),
        conditionIdentifiedBy: searchParams.get("conditionIdentifiedBy") as schema.ConditionIdentifiedBy ?? "",
        patientAgeRange: onlyValidFilterValues(ranges, schema.patientAgeRange)
    };
}
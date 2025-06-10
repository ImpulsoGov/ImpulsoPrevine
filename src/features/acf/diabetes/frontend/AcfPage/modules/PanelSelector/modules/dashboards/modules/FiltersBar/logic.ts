import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
    VisitantCommunityHealthWorker,
} from "@/features/acf/diabetes/common/model";
import * as schema from "@/features/acf/diabetes/common/schema";
import type { SelectedFilterValues } from "@/features/acf/diabetes/frontend/model";
import type * as z from "zod/v4";
import { nameFormatter } from "../../../../logic";
import { referenceOrder } from "./consts";

export type FilterOptions =
    | Array<VisitantCommunityHealthWorker>
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

export const toSelectConfigsCoeqs = (
    filtersValues: schema.CoeqFilters
): Array<SelectConfig> => {
    return [
        {
            options: toHtmlSelectOptions(
                filtersValues.visitantCommunityHealthWorker
            )
                .map((item) => ({ ...item, label: nameFormatter(item.label) }))
                .sort((a, b) => a.label.localeCompare(b.label)),
            label: "Prof. Responsável",
            id: "visitantCommunityHealthWorker",
            isMultiSelect: true,
            width: "330px",
        },
        {
            options: toHtmlSelectOptions(filtersValues.patientStatus).sort(
                (a, b) => a.label.localeCompare(b.label)
            ),
            label: "Situação",
            id: "patientStatus",
            isMultiSelect: true,
            width: "178px",
        },
        {
            options: toHtmlSelectOptions(
                filtersValues.conditionIdentifiedBy
            ).sort((a, b) => a.label.localeCompare(b.label)),
            label: "Tipo de Diagnóstico",
            id: "conditionIdentifiedBy",
            isMultiSelect: false,
            width: "228px",
        },
        {
            options: toHtmlSelectOptions(filtersValues.patientAgeRange).sort(
                sortedOptions
            ),
            label: "Faixa Etária",
            id: "patientAgeRange",
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

export const searchParamsToSelectedValuesCoeq = (
    searchParams: URLSearchParams
): SelectedFilterValues => {
    const patientsStatus: Array<schema.PatientStatus> = (searchParams
        .get("patientStatus")
        ?.split(",") ?? []) as Array<schema.PatientStatus>;
    const ranges = (searchParams.get("patientAgeRange")?.split(",") ??
        []) as Array<schema.PatientAgeRange>;
    return {
        visitantCommunityHealthWorker:
            searchParams.get("visitantCommunityHealthWorker")?.split(",") ?? [],
        patientStatus: onlyValidFilterValues(
            patientsStatus,
            schema.patientStatus
        ),
        conditionIdentifiedBy: (searchParams
            .get("conditionIdentifiedBy")
            ?.split(",")[0] ?? "") as schema.ConditionIdentifiedBy,
        patientAgeRange: onlyValidFilterValues(ranges, schema.patientAgeRange),
    };
};

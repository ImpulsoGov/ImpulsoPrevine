import type { ConditionIdentifiedBy, PatientAgeRange, PatientStatus, VisitantCommunityHealthWorker } from "@/features/acf/diabetes/common/model";
import type { SelectConfig, HtmlSelectOption } from "./filters/searchParamsToSelectedValues";
import type { FiltersUi } from "@/features/acf/diabetes/frontend/model";

type FilterValues = VisitantCommunityHealthWorker[] | PatientStatus[] | ConditionIdentifiedBy[] | PatientAgeRange[]; 

const selectOptions = (filterValues: FilterValues): HtmlSelectOption[] => {
    return filterValues.map<HtmlSelectOption>((item) => ({
        value: item,
        label: item,
    }));
};

const referenceOrder = [
  "Menos de 17 anos",
  "Entre 18 e 24 anos",
  "Entre 25 e 34 anos",
  "Entre 35 e 44 anos",
  "Entre 45 e 54 anos",
  "Entre 55 e 65 anos",
  "Mais de 65 anos"
];

const sortedOptions = (a: HtmlSelectOption, b: HtmlSelectOption) => referenceOrder.indexOf(a.label) - referenceOrder.indexOf(b.label);

export const createSelectConfigs = (filtersValues: FiltersUi) : SelectConfig[] => [
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
]

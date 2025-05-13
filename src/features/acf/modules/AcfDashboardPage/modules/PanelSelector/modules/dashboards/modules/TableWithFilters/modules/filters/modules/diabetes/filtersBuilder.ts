import type { DiabetesAcfItem } from "../../../../../PaginatedTable/modules/DataTable/modules/diabetes/diabetes.model";
import type { DiabetesFilterItem } from "./diabetes.model";
import type { Filter, OptionsType } from "../../initialFilters";

type FilterOptions = DiabetesAcfItem['visitantCommunityHealthWorker'][] | DiabetesAcfItem['patientStatus'][] | DiabetesAcfItem['conditionIdentifiedBy'][] | DiabetesAcfItem['patientAgeRange'][];

const filterOptions = (diabetesFilterItem: FilterOptions): OptionsType[] => {
    return diabetesFilterItem.map<OptionsType>((item) => ({
        value: item,
        label: item,
    }));
}
const referenceOrder = [
  "Menos de 17 anos",
  "Entre 18 e 24 anos",
  "Entre 25 e 34 anos",
  "Entre 35 e 44 anos",
  "Entre 45 e 54 anos",
  "Entre 55 e 65 anos",
  "Mais de 65 anos"
];

const sortedOptions = (a: OptionsType, b: OptionsType) => referenceOrder.indexOf(a.label) - referenceOrder.indexOf(b.label);


export const filtersBuilder = (filterItem: DiabetesFilterItem) : Filter[] => [
    {
        options: filterOptions(filterItem.visitantCommunityHealthWorker)
        .sort((a, b) => (a.label).localeCompare(b.label)),
        label: "Prof. Responsável",
        id: "visitantCommunityHealthWorker",
        isMultiSelect: true,
        width: "330px",
    },
    {
        options: filterOptions(filterItem.patientStatus)
        .sort((a, b) => (a.label).localeCompare(b.label)),
        label: "Situação",
        id: "patientStatus",
        isMultiSelect: true,
        width: "178px",
    },
    {
        options: filterOptions(filterItem.conditionIdentifiedBy)
        .sort((a, b) => (a.label).localeCompare(b.label)),
        label: "Tipo de Diagnóstico",
        id: "conditionIdentifiedBy",
        isMultiSelect: true,
        width: "228px",
    },
    {
        options: filterOptions(filterItem.patientAgeRange)
        .sort(sortedOptions),
        label: "Faixa Etária",
        id: "patientAgeRange",
        isMultiSelect: false,
        width: "178px",
    },
]

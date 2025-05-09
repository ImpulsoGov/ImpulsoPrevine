import type { DiabetesAcfItem } from "../../../PaginatedTable/modules/DataTable/modules/diabetes/diabetes.model";
import type { DiabetesFilterItem } from "./diabetes.model";
import type { Filter } from "../../initialFilters";

type FilterOptions = DiabetesAcfItem['visitantCommunityHealthWorker'][] | DiabetesAcfItem['patientStatus'][] | DiabetesAcfItem['conditionIdentifiedBy'][];

const filterOptions = (diabetesFilterItem: FilterOptions)=>{
    return diabetesFilterItem.map((item) => ({
        value: item,
        label: item,
    }));
}

export const filtersBuilder = (filterItem: DiabetesFilterItem) : Filter[] => [
    {
        options: filterOptions(filterItem.conditionIdentifiedBy)
        .sort((a, b) => (a.label ?? '').localeCompare(b.label ?? '')),
        label: "Identificação da Condição",
        id: "conditionIdentifiedBy",
        isMultiSelect: true,
        width: "240px",
    },
    {
        options: filterOptions(filterItem.visitantCommunityHealthWorker)
        .sort((a, b) => (a.label ?? '').localeCompare(b.label ?? '')),
        label: "ACS Responsável",
        id: "visitantCommunityHealthWorker",
        isMultiSelect: true,
        width: "240px",
    },
    {
        options: filterOptions(filterItem.patientStatus)
        .sort((a, b) => (a.label ?? '').localeCompare(b.label ?? '')),
        label: "Status",
        id: "patientStatus",
        isMultiSelect: false,
        width: "240px",
    },
]

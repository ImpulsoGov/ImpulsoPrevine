import { TableWithFilters } from "."
import { diabetesFilterItem } from "./modules/filters/modules/diabetes/diabetes.controller"
import { modelToDB } from "./modules/filters/modules/diabetes/diabetes.adapter";

type FiltersContainerProps = {
    municipalitySusID: string;
    teamIne: string;
    children: React.ReactNode;
}

export const FiltersContainer = async ({
    municipalitySusID,
    teamIne,
    children
}: FiltersContainerProps ) => {
    const filterItem = await diabetesFilterItem(
        municipalitySusID,
        teamIne,
        modelToDB(['visitantCommunityHealthWorker', 'patientStatus', 'conditionIdentifiedBy', 'patientAgeRange'])
    )
    console.log('filterItem', filterItem)
  return (
    <TableWithFilters filterItem={filterItem} >
        {children}
    </TableWithFilters>
  )
}

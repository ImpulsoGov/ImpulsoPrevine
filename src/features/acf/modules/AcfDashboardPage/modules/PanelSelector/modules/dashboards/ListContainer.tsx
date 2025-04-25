
import type { AcfDashboardType } from "../../../../types";
import { InternalCards } from "./modules/cards/internalCards/InternalCards.container";
// import { diabetesFilterItemController } from "./modules/filters/modules/diabetes/diabetes.controller";
export type ListContainerProps = {
    list: AcfDashboardType;
    municipalitySusId: string;
    teamIne: string;
    // title: string;
};

export const ListContainer = async({
    // title,
    list,
    municipalitySusId,
    teamIne,
}: ListContainerProps) => {
    // try {
    //     const data = await diabetesFilterItemController(
    //         municipalitySusId,
    //         teamIne,
    //     );
    // } catch (error) {
    //     captureException(error);
    // }

    return <>
        <InternalCards municipalitySusId={municipalitySusId} teamIne={teamIne} />
        {/* <List list={list} filtersOptions={}/> */}
    </>
};

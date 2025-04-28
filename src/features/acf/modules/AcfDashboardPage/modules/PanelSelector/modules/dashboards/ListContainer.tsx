
import type { AcfDashboardType } from "../../../../types";
import { InternalCards } from "./modules/cards/internalCards/InternalCards.container";
import { captureException } from "@sentry/nextjs";
import { diabetesFilterItemController } from "./modules/filters/modules/diabetes/diabetes.controller";
import { List } from "./List";
import type{ DiabetesFilterItem } from "./modules/filters/modules/diabetes/diabetes.model";

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
    let data: DiabetesFilterItem[] = [];
    try {
        data = await diabetesFilterItemController(
            municipalitySusId,
            teamIne,
            ["acs_nome_cadastro", "identificacao_condicao_diabetes", "status_usuario"]
        );
        // const data = await diabetesFilterItemController(
        //     municipalitySusId,
        //     teamIne,
        //     ["acs_nome_cadastro"]
        // );
        console.log("data", data);
        
    } catch (error) {
        captureException(error);
    }

    return <>
        <InternalCards municipalitySusId={municipalitySusId} teamIne={teamIne} />
        <List list={list} filtersOptions={data}/>
    </>
};

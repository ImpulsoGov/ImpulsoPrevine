import { prisma } from "@prisma/prismaClient";
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';
import type { GridPaginationModel } from "@mui/x-data-grid";
import type { DiabetesDbFilterItem } from "./diabetes.adapter";

export const diabetesPage = async(
    municipalitySusID: string,
    teamIne: string,
    pagination: GridPaginationModel,
    filters: DiabetesDbFilterItem
): Promise<readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]> =>{
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany({
        where: {
            status_usuario: { in: filters.status_usuario },
            identificacao_condicao_diabetes: { in: filters.identificacao_condicao_diabetes },
            acs_nome_cadastro: { in: filters.acs_nome_cadastro },
            municipio_id_sus: municipalitySusID,
            equipe_ine_cadastro: teamIne,

        },
        orderBy: {
            cidadao_nome: "asc"
        },
        take: pagination.pageSize,
        skip: pagination.pageSize * pagination.page,
    })
}


export const diabetesListCount = async(
    municipalitySusID: string,
    teamIne: string,
    filters: DiabetesDbFilterItem
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
        where: {
            status_usuario: { in: filters.status_usuario },
            identificacao_condicao_diabetes: { in: filters.identificacao_condicao_diabetes },
            acs_nome_cadastro: { in: filters.acs_nome_cadastro },
            municipio_id_sus: municipalitySusID,
            equipe_ine_cadastro: teamIne
        }
    })
}
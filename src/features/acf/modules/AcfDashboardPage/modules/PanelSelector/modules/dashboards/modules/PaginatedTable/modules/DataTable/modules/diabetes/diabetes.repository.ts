import { prisma } from "@prisma/prismaClient";
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';
import type { GridPaginationModel } from "@mui/x-data-grid";

export const diabetesPage = async(
    municipalitySusID: string,
    teamIne: string,
    pagination: GridPaginationModel
): Promise<readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]> =>{
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany({
        where: {
            municipio_id_sus: municipalitySusID,
            equipe_ine_cadastro: teamIne
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
    teamIne: string
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
        where: {
            municipio_id_sus: municipalitySusID,
            equipe_ine_cadastro: teamIne
        }
    })
}
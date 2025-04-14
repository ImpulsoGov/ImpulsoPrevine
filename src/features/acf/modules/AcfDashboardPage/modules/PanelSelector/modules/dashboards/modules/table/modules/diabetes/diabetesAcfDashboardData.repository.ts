import { prisma } from "@prisma/prismaClient";
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';

export const diabetesAcfDashboardDataRepository = async(
    municipalitySusID: string,
    teamIne: string,
): Promise<readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]> =>{
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany({
        where: {
            municipio_id_sus: municipalitySusID,
            equipe_ine_cadastro: teamIne
        }
    })
}
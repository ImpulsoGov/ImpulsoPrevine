import { prisma } from "@prisma/prismaClient"
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';

export type FieldNames = keyof impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos;

export const filterOptions = async (
    municipalitySusId: string,
    teamIne: string,
    fields: FieldNames[]
 ): Promise<readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany({
        select: fields.reduce((acc, field) => {
            acc[field] = true;
            return acc;
        }, {} as Record<FieldNames, boolean>),
        distinct: [...fields],
        where : {
            // biome-ignore lint/style/useNamingConvention: <explanation>
            municipio_id_sus: municipalitySusId,
             // biome-ignore lint/style/useNamingConvention: <explanation>
            equipe_ine_cadastro: teamIne,
        }
    })
}
import { prisma } from "@prisma/prismaClient";
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';
import type { DiabetesDbFilterItem } from "../common/model";

const pageSize = 8;

export const diabetesPage = async(
    municipalitySusID: string,
    teamIne: string,
    page: number,
    filters: DiabetesDbFilterItem
): Promise<readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]> =>{
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany({
        where: {
            // biome-ignore lint/style/useNamingConvention: <explanation>
            status_usuario: { in: filters.status_usuario },
            // biome-ignore lint/style/useNamingConvention: <explanation>
            identificacao_condicao_diabetes: { in: filters.identificacao_condicao_diabetes },
            // biome-ignore lint/style/useNamingConvention: <explanation>
            acs_nome_cadastro: { in: filters.acs_nome_cadastro },
            // biome-ignore lint/style/useNamingConvention: <explanation>
            cidadao_faixa_etaria: { in: filters.cidadao_faixa_etaria },
            // biome-ignore lint/style/useNamingConvention: <explanation>
            municipio_id_sus: municipalitySusID,
            // biome-ignore lint/style/useNamingConvention: <explanation>
            equipe_ine_cadastro: teamIne,

        },
        orderBy: {
            // biome-ignore lint/style/useNamingConvention: <explanation>
            cidadao_nome: "asc"
        },
        take: pageSize,
        skip: pageSize * page,
    })
}

export const diabetesListCount = async(
    municipalitySusID: string,
    teamIne: string,
    filters: DiabetesDbFilterItem
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: {
                // biome-ignore lint/style/useNamingConvention: <explanation>
                status_usuario: { in: filters.status_usuario },
                // biome-ignore lint/style/useNamingConvention: <explanation>
                identificacao_condicao_diabetes: {
                    in: filters.identificacao_condicao_diabetes,
                },
                // biome-ignore lint/style/useNamingConvention: <explanation>
                acs_nome_cadastro: { in: filters.acs_nome_cadastro },
                // biome-ignore lint/style/useNamingConvention: <explanation>
                cidadao_faixa_etaria: { in: filters.cidadao_faixa_etaria },
                // biome-ignore lint/style/useNamingConvention: <explanation>
                municipio_id_sus: municipalitySusID,
                // biome-ignore lint/style/useNamingConvention: <explanation>
                equipe_ine_cadastro: teamIne,
            },
        },
    );
}
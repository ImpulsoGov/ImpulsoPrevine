import { prisma } from "@prisma/prismaClient"
import type { FilterOptionsDb } from "../model";

export const filterOptions = async (
    municipalitySusId: string,
    teamIne: string,
): Promise<ReadonlyArray<FilterOptionsDb>> => {
    //TODO: Hoje em dia, essa query está respondendo um array de objetos no formato: 
    //[{
    //  acs_nome_cadastro: 'MIRACI HERNANDES AQUINO',
    //  status_usuario: 'Consulta e solicitação de hemoglobina em dia',
    //  identificacao_condicao_diabetes: 'Diagnóstico Clínico',
    //  cidadao_faixa_etaria: 'Entre 55 e 65 anos'
    //},...]
    //
    //Isso traz alguns problemas:
    //1 - Vários dos resultados do distinct são duplicados. Apenas o resultado com mais valores é realmente distinct (provavelmente acs_nome_cadastro)
    //2 - O formato do array não encaixa no formato da resposta do endpoint.
    //
    //Hoje em dia ambos os problemas são resolvidos pelo adapter em memória, mas seria muito mais simples fazer uma query distinct para cada campo 
    // e simplesmente pegar o retorno, que já viria de-duplicado pelo banco e no formato correto.
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
        {
            select: {
                // biome-ignore lint/style/useNamingConvention: <explanation>
                acs_nome_cadastro: true,
                // biome-ignore lint/style/useNamingConvention: <explanation>
                status_usuario: true,
                // biome-ignore lint/style/useNamingConvention: <explanation>
                identificacao_condicao_diabetes: true,
                // biome-ignore lint/style/useNamingConvention: <explanation>
                cidadao_faixa_etaria: true,
            },
            distinct: [
                "acs_nome_cadastro",
                "status_usuario",
                "identificacao_condicao_diabetes",
                "cidadao_faixa_etaria",
            ],
            where: {
                // biome-ignore lint/style/useNamingConvention: <explanation>
                municipio_id_sus: municipalitySusId,
                // biome-ignore lint/style/useNamingConvention: <explanation>
                equipe_ine_cadastro: teamIne,
            },
        },
    );
}
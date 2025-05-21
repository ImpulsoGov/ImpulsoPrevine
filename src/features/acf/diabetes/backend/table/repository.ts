import { prisma } from "@prisma/prismaClient";
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import type { DiabetesDbFilterItem } from "../model";

const pageSize = 8;

type QueryWhere = {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    status_usuario?: { in: Array<string> };
    // biome-ignore lint/style/useNamingConvention: <explanation>
    identificacao_condicao_diabetes?: { in: Array<string> };
    // biome-ignore lint/style/useNamingConvention: <explanation>
    acs_nome_cadastro?: { in: Array<string> };
    // biome-ignore lint/style/useNamingConvention: <explanation>
    cidadao_faixa_etaria?: { in: Array<string> };
    // biome-ignore lint/style/useNamingConvention: <explanation>
    municipio_id_sus: string;
    // biome-ignore lint/style/useNamingConvention: <explanation>
    equipe_ine_cadastro: string;
};

function addFilterField(where: QueryWhere, filter: DiabetesDbFilterItem, field: keyof DiabetesDbFilterItem ) {
    if (filter[field] && filter[field].length > 0) {
        where[field] = {in: filter[field]};
    }
}

function queryWhere(
    filter: DiabetesDbFilterItem,
    municipalitySusID: string,
    teamIne: string,
): QueryWhere {
    const querys = {} as QueryWhere;
    addFilterField(querys, filter, 'status_usuario');
    addFilterField(querys, filter, 'acs_nome_cadastro');
    addFilterField(querys, filter, 'cidadao_faixa_etaria');
    addFilterField(querys, filter, 'identificacao_condicao_diabetes');
    querys.municipio_id_sus = municipalitySusID;
    querys.equipe_ine_cadastro = teamIne;

    return querys;
}

export const page = async (
    municipalitySusID: string,
    teamIne: string,
    page: number,
    filters: DiabetesDbFilterItem,
): Promise<
    ReadonlyArray<impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos>
> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
        {
            where: queryWhere(filters, municipalitySusID, teamIne),
            orderBy: {
                // biome-ignore lint/style/useNamingConvention: <explanation>
                cidadao_nome: "asc",
            },
            take: pageSize,
            skip: pageSize * page,
        },
    );
};

export const rowCount = async (
    municipalitySusID: string,
    teamIne: string,
    filters: DiabetesDbFilterItem,
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: queryWhere(filters, municipalitySusID, teamIne),
        },
    );
};

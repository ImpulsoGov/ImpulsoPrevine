import { prisma } from "@prisma/prismaClient";
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import type { DiabetesDbFilterItem, SortableDbField } from "../model";
import type { SortOrder } from "../../common/model";
const pageSize = 8;

type QueryWhere = {
    status_usuario?: { in: Array<string> };
    identificacao_condicao_diabetes?: { in: Array<string> };
    acs_nome_cadastro?: { in: Array<string> };
    cidadao_faixa_etaria?: { in: Array<string> };
    municipio_id_sus: string;
    equipe_ine_cadastro: string;
};

function addFilterField(
    where: QueryWhere,
    filter: DiabetesDbFilterItem,
    field: keyof DiabetesDbFilterItem
): void {
    if (filter[field] && filter[field].length > 0) {
        where[field] = { in: filter[field] };
    }
}

function queryWhere(
    filter: DiabetesDbFilterItem,
    municipalitySusID: string,
    teamIne: string
): QueryWhere {
    const querys = {} as QueryWhere;
    addFilterField(querys, filter, "status_usuario");
    addFilterField(querys, filter, "acs_nome_cadastro");
    addFilterField(querys, filter, "cidadao_faixa_etaria");
    addFilterField(querys, filter, "identificacao_condicao_diabetes");
    querys.municipio_id_sus = municipalitySusID;
    querys.equipe_ine_cadastro = teamIne;

    return querys;
}

export const page = async (
    municipalitySusID: string,
    teamIne: string,
    page: number,
    filters: DiabetesDbFilterItem,
    sorting: {
        field: SortableDbField;
        sort: SortOrder;
    }
): Promise<
    ReadonlyArray<impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos>
> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
        {
            where: queryWhere(filters, municipalitySusID, teamIne),
            orderBy: {
                [sorting.field]: {
                    sort: sorting.sort,
                    nulls: sorting.sort == "asc" ? "first" : "last",
                },
            },
            take: pageSize,
            skip: pageSize * page,
        }
    );
};

export const rowCount = async (
    municipalitySusID: string,
    teamIne: string,
    filters: DiabetesDbFilterItem
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: queryWhere(filters, municipalitySusID, teamIne),
        }
    );
};

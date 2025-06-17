import type { SortOrder } from "@/features/acf/shared/diabetes/model";
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import { prisma } from "@prisma/prismaClient";
import type {
    DiabetesDbFilterItemCoaps,
    DiabetesDbFilterItemCoeq,
    SortableDbField,
} from "./model";
const pageSize = 8;

type QueryWhere = {
    status_usuario?: { in: Array<string> };
    identificacao_condicao_diabetes?: { in: Array<string> };
    acs_nome_cadastro?: { in: Array<string> };
    cidadao_faixa_etaria?: { in: Array<string> };
    municipio_id_sus: string;
    cidadao_nome?: { contains: string };
};

type QueryWhereCoaps = QueryWhere & {
    equipe_ine_cadastro?: { in: Array<string> };
};

type QueryWhereCoeq = QueryWhere & {
    equipe_ine_cadastro: string;
};

const addFilterFieldCoaps = (
    where: QueryWhereCoaps,
    filter: DiabetesDbFilterItemCoaps,
    field: keyof DiabetesDbFilterItemCoaps
): void => {
    if (filter[field] && filter[field].length > 0) {
        where[field] = { in: filter[field] };
    }
};

const addFilterFieldCoeq = (
    where: QueryWhereCoeq,
    filter: DiabetesDbFilterItemCoeq,
    field: keyof DiabetesDbFilterItemCoeq
): void => {
    if (filter[field] && filter[field].length > 0) {
        where[field] = { in: filter[field] };
    }
};

const addSearchField = (where: QueryWhere, search: string): void => {
    if (search.length > 0) {
        where["cidadao_nome"] = { contains: search };
    }
};

const queryWhereCoaps = (
    filter: DiabetesDbFilterItemCoaps,
    municipalitySusID: string,
    search: string
): QueryWhere => {
    const querys = {} as QueryWhereCoaps;
    addFilterFieldCoaps(querys, filter, "status_usuario");
    addFilterFieldCoaps(querys, filter, "acs_nome_cadastro");
    addFilterFieldCoaps(querys, filter, "cidadao_faixa_etaria");
    addFilterFieldCoaps(querys, filter, "identificacao_condicao_diabetes");
    addFilterFieldCoaps(querys, filter, "equipe_ine_cadastro");

    querys.municipio_id_sus = municipalitySusID;
    addSearchField(querys, search);

    return querys;
};

const queryWhereCoeq = (
    filter: DiabetesDbFilterItemCoeq,
    municipalitySusID: string,
    teamIne: string,
    search: string
): QueryWhere => {
    const querys = {} as QueryWhereCoeq;
    addFilterFieldCoeq(querys, filter, "status_usuario");
    addFilterFieldCoeq(querys, filter, "acs_nome_cadastro");
    addFilterFieldCoeq(querys, filter, "cidadao_faixa_etaria");
    addFilterFieldCoeq(querys, filter, "identificacao_condicao_diabetes");
    querys.municipio_id_sus = municipalitySusID;
    querys.equipe_ine_cadastro = teamIne;
    addSearchField(querys, search);

    return querys;
};

export const pageCoeq = async (
    municipalitySusID: string,
    teamIne: string,
    page: number,
    filters: DiabetesDbFilterItemCoeq,
    sorting: {
        field: SortableDbField;
        sort: SortOrder;
    },
    searchString: string
): Promise<
    ReadonlyArray<impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos>
> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
        {
            where: queryWhereCoeq(
                filters,
                municipalitySusID,
                teamIne,
                searchString.toLocaleUpperCase()
            ),
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

export const pageCoaps = async (
    municipalitySusID: string,
    page: number,
    filters: DiabetesDbFilterItemCoeq,
    sorting: {
        field: SortableDbField;
        sort: SortOrder;
    },
    searchString: string
): Promise<
    ReadonlyArray<impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos>
> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
        {
            where: queryWhereCoaps(
                filters,
                municipalitySusID,
                searchString.toLocaleUpperCase()
            ),
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

export const rowCountCoaps = async (
    municipalitySusID: string,
    filters: DiabetesDbFilterItemCoeq,
    search: string
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: queryWhereCoaps(
                filters,
                municipalitySusID,
                search.toLocaleUpperCase()
            ),
        }
    );
};

export const rowCountCoeq = async (
    municipalitySusID: string,
    teamIne: string,
    filters: DiabetesDbFilterItemCoeq,
    search: string
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: queryWhereCoeq(
                filters,
                municipalitySusID,
                teamIne,
                search.toLocaleUpperCase()
            ),
        }
    );
};

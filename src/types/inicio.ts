export enum Indicadores {
    CITOPATOLOGICO = "CITOPATOLOGICO",
    DIABETES = "DIABETES",
    HIPERTENSOS = "HIPERTENSOS",
    PRE_NATAL_6_CONSULTAS = "PRE_NATAL_6_CONSULTAS",
    PRE_NATAL_ODONTO = "PRE_NATAL_ODONTO",
    PRE_NATAL_SIFILIS_HIV = "PRE_NATAL_SIFILIS_HIV",
    VACINACAO = "VACINACAO",
}

export enum ParametrosDescricao {
    TOTAL = "TOTAL",
    FORA_DO_INDICADOR = "FORA_DO_INDICADOR",
}

export type SituacaoIndicador = {
    municipio_id_sus: string;
    equipe_ine?: string;
    indicador: Indicadores;
    parametro_descricao: ParametrosDescricao;
    parametro_valor_indicador: number;
};

export type SituacaoPorIndicador = {
    [key in Indicadores]: {
        total: number;
        pendente: number;
    };
};

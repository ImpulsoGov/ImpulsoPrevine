import {
    ParametrosDescricao,
    type SituacaoIndicador,
    type SituacaoPorIndicador,
} from "@/types/inicio";

export const unificarSituacaoPorIndicadores = (
    situacaoIndicadores: Array<SituacaoIndicador> | null
): SituacaoPorIndicador | null => {
    if (!situacaoIndicadores) return null;

    const situacaoInicial: SituacaoPorIndicador = {
        CITOPATOLOGICO: {
            total: 0,
            pendente: 0,
        },
        DIABETES: {
            total: 0,
            pendente: 0,
        },
        HIPERTENSOS: {
            total: 0,
            pendente: 0,
        },
        PRE_NATAL_6_CONSULTAS: {
            total: 0,
            pendente: 0,
        },
        PRE_NATAL_ODONTO: {
            total: 0,
            pendente: 0,
        },
        PRE_NATAL_SIFILIS_HIV: {
            total: 0,
            pendente: 0,
        },
        VACINACAO: {
            total: 0,
            pendente: 0,
        },
    };

    return situacaoIndicadores.reduce<SituacaoPorIndicador>((acc, situacao) => {
        if (situacao.parametro_descricao === ParametrosDescricao.TOTAL) {
            acc[situacao.indicador].total = situacao.parametro_valor_indicador;
        }

        if (
            situacao.parametro_descricao ===
            ParametrosDescricao.FORA_DO_INDICADOR
        ) {
            acc[situacao.indicador].pendente =
                situacao.parametro_valor_indicador;
        }

        return acc;
    }, situacaoInicial);
};

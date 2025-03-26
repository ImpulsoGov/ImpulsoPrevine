import {
    ParametrosDescricao,
    type SituacaoIndicador,
    type SituacaoPorIndicador,
} from "@/types/inicio";

export const unificarSituacaoPorIndicadores = async (
    situacaoIndicadores: SituacaoIndicador[],
) => {
    return Array.isArray(situacaoIndicadores)
        ? situacaoIndicadores.reduce<SituacaoPorIndicador>((acc, situacao) => {
              if (!acc[situacao.indicador]) {
                  acc[situacao.indicador] = {
                      total: 0,
                      pendente: 0,
                  };
              }

              if (situacao.parametro_descricao === ParametrosDescricao.TOTAL) {
                  acc[situacao.indicador].total =
                      situacao.parametro_valor_indicador;
              }

              if (
                  situacao.parametro_descricao ===
                  ParametrosDescricao.FORA_DO_INDICADOR
              ) {
                  acc[situacao.indicador].pendente =
                      situacao.parametro_valor_indicador;
              }

              return acc;
          }, {} as SituacaoPorIndicador)
        : null;
};

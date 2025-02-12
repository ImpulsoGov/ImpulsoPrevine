import { divisaoPorEquipes } from "../helpers/divisaoPorEquipes";
import { MultiplasEquipesPorPagina } from "./MultiplasEquipesPorPagina";
import { UnicaEquipePorPagina } from "./UnicaEquipePorPagina";
import { SemDivisao } from "./SemDivisao";

export const PrintTable = ({ 
    data, 
    colunas, 
    lista,
    filtros_aplicados,
    divisao_dados=true, 
    divisao_paginas=false, 
    data_producao_mais_recente,
    listas_auxiliares,
    largura_colunas_impressao,
    divisorVertical,
    fontFamily="sans-serif",
    propAgrupamentoImpressao,
    legendaImpressao
  }) => {
    const divisao_por_equipes = divisao_dados ? divisaoPorEquipes(data,propAgrupamentoImpressao) : []
    return (
      <div 
        className="largura"
        style={{
          fontFamily: `${fontFamily}, sans-serif`,
        }}
      >
        {
          divisao_dados && !divisao_paginas && divisao_por_equipes &&
          <MultiplasEquipesPorPagina
            divisao_por_equipes={divisao_por_equipes}
            cabecalho={{
              filtros_aplicados : filtros_aplicados,
              data_producao_mais_recente : data_producao_mais_recente,
              lista : lista
            }}
            legendaImpressao={legendaImpressao}
            tabelas={{
              colunas : colunas,
              listas_auxiliares : listas_auxiliares,
              largura_colunas_impressao : largura_colunas_impressao,
              divisorVertical : divisorVertical
            }}
            fontFamily={fontFamily}
            propAgrupamentoImpressao={propAgrupamentoImpressao}
          />
        }
        {
          divisao_paginas && divisao_dados &&
          <UnicaEquipePorPagina
            divisao_por_equipes={divisao_por_equipes}
            cabecalho={{
              filtros_aplicados : filtros_aplicados,
              data_producao_mais_recente : data_producao_mais_recente,
              lista : lista
            }}
            legendaImpressao={legendaImpressao}
            tabelas={{
              colunas : colunas,
              listas_auxiliares : listas_auxiliares,
              largura_colunas_impressao : largura_colunas_impressao,
              divisorVertical : divisorVertical
            }}
            fontFamily={fontFamily}
          />
        }
        {
          (!divisao_dados && !divisao_paginas) &&
          <SemDivisao
            data={data}
            cabecalho={{
              filtros_aplicados : filtros_aplicados,
              data_producao_mais_recente : data_producao_mais_recente,
              lista : lista
            }}
            legendaImpressao={legendaImpressao}
            tabelas={{
              colunas : colunas,
              listas_auxiliares : listas_auxiliares,
              largura_colunas_impressao : largura_colunas_impressao,
              divisorVertical : divisorVertical
            }}
            fontFamily={fontFamily}
          />
        }
      </div>
    );
  };


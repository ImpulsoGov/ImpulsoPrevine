import { CabecalhoPagina } from "./CabecalhoPagina"
import { TabelaUnitaria } from "./TabelaUnitaria"

export const SemDivisao =({
    data,
    cabecalho,
    tabelas,
    fontFamily="sans-serif",
    legendaImpressao
})=>{
    return(
      <div
        style={{
          marginBottom : "30px",
          pageBreakAfter : "always",
          pageBreakInside : "avoid",
          display : "flex",
          flexDirection : "column",
          gap : "16px",
        }}
      >
        <CabecalhoPagina 
          filtros_aplicados={cabecalho.filtros_aplicados}
          data_producao_mais_recente={cabecalho.data_producao_mais_recente}
          lista={cabecalho.lista}
          fontFamily = {fontFamily}
          legendaImpressao={legendaImpressao}
        />
        <TabelaUnitaria
          data = {data}
          colunas = {tabelas.colunas}
          listas_auxiliares = {tabelas.listas_auxiliares}
          divisorVertical={tabelas.divisorVertical}
          fontFamily = {fontFamily}
          indexTabela={0}
          larguraColunas={tabelas.largura_colunas_impressao.paisagem}
          orientacao="paisagem"
        />
        <TabelaUnitaria
          data = {data}
          colunas = {tabelas.colunas}
          listas_auxiliares = {tabelas.listas_auxiliares}
          divisorVertical={tabelas.divisorVertical}
          fontFamily = {fontFamily}
          indexTabela={0}
          larguraColunas={tabelas.largura_colunas_impressao.retrato}
          orientacao="retrato"
        />
      </div>
)} 
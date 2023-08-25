import { v1 as uuidv1 } from 'uuid';
import React, { useState, useEffect, useContext } from 'react';
import { GraficoInfo, Grid12Col, TituloSmallTexto } from "@impulsogov/design-system"
import TabelaIndicadores from "/componentes/TabelaIndicadores/TabelaIndicadores"
import { AcessoindicadoresDesempenho } from '../../services/indicadoresDesempenho'
import {AcessoindicadoresEquipesHomologadas}  from '../../services/indicadoresEquipesHomologadas'
import GraficoDesempenhoMunicipio from "/componentes/GraficoDesempenhoMunicipio/GraficoDesempenhoMunicipio"
import GraficoHistoricoDesempenho from "/componentes/GraficoHistoricoDesempenho/GraficoHistoricoDesempenho"
import Context from "../../utils/Context";

const Indicadores = () => {
  const [indicadoresData, setIndicadoresData] = useState([]); // Estado para armazenar os dados dos indicadores
  const [cidade, setCidade] = useContext(Context);
  useEffect(() =>{AcessoindicadoresDesempenho(cidade).then((result)=>setIndicadoresData(result))}, [cidade]);

  return (
    <div>
      <TituloSmallTexto
        key={uuidv1()}
        imagem={{ 
          posicao: null,
          url: ''
        }}
        texto="Nessa página você vai encontrar o histórico de desempenho do seu município, os resultados dos indicadores na competência atual e nos quadrimestres anteriores, além de informações sobre como bater a meta em cada um deles e recomendações."
        titulo="<b> Indicadores de desempenho </b>"
      />

      <Grid12Col
        items={[
          <div style={{ borderRight: '2px solid #ddd', paddingRight: '10px' }}>
          <TituloSmallTexto
            botao={{
              label: '',
              url: ''
            }}
            imagem={{
              posicao: null,
              url: ''
            }}
            supertitulo=""
            texto="Verifique como foi o desempenho do seu município em relação a meta preconizada pelo Ministério da Saúde para as <b> equipes avaliadas** no quadrimestre selecionado. </b> Veja também o desempenho nos quadrimestres passados."
            titulo="<b> Desempenho do Município </b>"
          /></div>,
          <TituloSmallTexto
            botao={{
              label: '',
              url: ''
            }}
            imagem={{
              posicao: null,
              url: ''
            }}
            supertitulo=""
            texto="Veja o <b> histórico de desempenho (%) </b> geral do seu município ao longo do tempo ou selecione um (ou mais) indicador(es) por vez."
            titulo="<b> Histórico de Desempenho </b>"
          />
        ]}
      />
      <Grid12Col
        items={[
          <div style={{ borderRight: '2px solid #ddd', paddingRight: '10px' }}>
          <GraficoDesempenhoMunicipio
            GrafDesempenho={indicadoresData}
          /></div>,
          <GraficoHistoricoDesempenho
            GrafHistorico={indicadoresData}
          />
        ]}
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo=""
        texto="<b>Fonte: SISAB</b> </br></br> *As regras aplicadas no cálculo dos indicadores seguem a <a href='https://www.conasems.org.br/wp-content/uploads/2022/07/SEI_MS-0027964163-Nota-Tecnica-12.pdf' target='_blank' rel='noreferrer nofollow noopener'><u> NOTA TÉCNICA Nº 12/2022 (SAPS/MS) </u></a> referente à metodologia de cálculo vigente.
        O resultado do Indicador “<b> Cobertura vacinal de Poliomielite inativada e de Pentavalente </b>” considera o alcance de 100% devido à correção da divergência no método de cálculo em 2021, para fins de cálculo do ISF. Os demais resultados dos indicadores estão com o percentual de alcance real.
        <br></br>
        **Equipes avaliadas: Equipes eSF, eAP, eCR, eAPP e eSFR ativas e credenciadas pelo Ministério da Saúde, cadastradas no SCNES pela gestão municipal, distrital ou estadual, homologadas pelo Ministério da Saúde e com ausência de irregularidades que justifiquem a suspensão de 100% (cem por cento) dos incentivos financeiros."
        titulo=""
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo=""
        texto="Abaixo você encontrará algumas informações para te ajudar a melhorar o desempenho dos indicadores, como: <b> quão perto de 85% o denominador informado está </b> , o <b> número total de pessoas </b> que devem ser atendidas para bater a meta de cada indicador, dessas pessoas, <b>quantas pessoas ainda precisam ser cadastradas antes do atendimento</b>, a <b>variação percentual de desempenho da competência atual para a anterior</b>,  e <b>recomendações</b> de como bater as metas."
        titulo="<b>Como melhorar o desempenho dos indicadores </b>" tooltip="" />

      <TabelaIndicadores
        TabIndicadores={indicadoresData}
      />
      <div style={{ paddingBottom: '105px' }}></div>
    </div>
  )
}

export default Indicadores;

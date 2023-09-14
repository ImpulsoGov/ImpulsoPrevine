import { v1 as uuidv1 } from 'uuid';
import React, { useState, useEffect, useContext } from 'react';
import { TituloSmallTexto } from "@impulsogov/design-system"
import TabelaAcoesEstrategicas from "/componentes/TabelaAcoesEstrategicas/TabelaAcoesEstrategicas"
import {AcoesEstrategicasVigenteAgrupada } from '../../services/acoes_estrategicas_vigente_agrupada'
import Context from "../../utils/Context";

const acoes_estrategicas = ({
  municipio,
}) => {
  const [indicadoresData, setIndicadoresData] = useState([]); 
  const [cidade, setCidade] = useContext(Context);
  useEffect(() => {
    AcoesEstrategicasVigenteAgrupada(cidade)
      .then((result) => {
        console.log(result); // Verifique os dados no console
        setIndicadoresData(result);
      });
  }, [cidade]);
  
  
  return (
    <div style={{margin : "0px 80px"}}>
      <TituloSmallTexto
        key={uuidv1()}
        imagem={{
          posicao: null,
          url: ''
        }}
        texto="Nessa página você vai encontrar o histórico de repasses consolidado do componente de Incentivos para Ações Estratégicas do seu município, além do histórico de repasses por ação, detalhes de ações em vigor e um checklist de características do seu município, que mostra quais ações se enquadram no seu perfil."
        titulo="<b> Incentivos para Ações Estratégicas </b>"
        botao={{
          label: '',
          url: ''
        }}
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
        texto="Veja abaixo o histórico de repasses do componente de incentivos para ações estratégicas do seu município, considerando todas as ações implementadas, ou seja, <b>o valor consolidado do município</b> em cada mês. <br></br>"
        titulo="<b> Histórico de repasses </b>"
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
        texto="<p style='color:#606E78'> *Os meses considerados no gráfico acima representam a data de recebimento do repasse, não o mês de referência do repasse. "
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
        texto="Veja o histórico de repasses <b> de cada ação estratégica </b>  do seu município que foi implementada e continua em vigor*."
        titulo="" tooltip="" />

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
        texto="<p style='color:#606E78'> *Os meses considerados no gráfico acima representam a data de recebimento do repasse, não o mês de referência do repasse. <br> *Ações 'em vigor' são aquelas pelas quais o município recebeu repasse maior do que zero nos últimos 12 meses  "
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
        texto="Veja a lista de ações estratégicas implementadas em vigor* do seu município e seus critérios de manutenção. <br></br>"
        titulo="<b> Ações Estratégicas implementadas em vigor </b>"
      />

      <TabelaAcoesEstrategicas
        TabAcoes={indicadoresData}
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
        texto="<p style='color:#606E78'> *Ações 'em vigor' são aquelas pelas quais o município recebeu repasse maior do que zero nos últimos 12 meses "
        titulo=""
      />


      <div style={{ paddingBottom: '105px' }}></div>
    </div>
  )
}

export default acoes_estrategicas;
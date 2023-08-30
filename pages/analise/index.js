import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { v1 as uuidv1 } from 'uuid';
import { PanelSelectorSM, TituloTexto } from "@impulsogov/design-system"
import Indicadores from "../../componentes/indicadores"
import Cadastros from "../../componentes/cadastros"
import Acoes from "../../componentes/acoes_estrategicas"

const Index = ({ res }) => {
  const router = useRouter();
  const [activeTabIndex, setActiveTabIndex] = useState(Number(router.query?.painel));
  const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
  useEffect(() => {
    setActiveTabIndex(Number(router.query?.painel));
  }, [router.query?.painel]);

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { painel: activeTabIndex }
    },
      undefined, { shallow: true }
    );
  }, [activeTabIndex]);

  return (
    <div >

      <TituloTexto
        imagem={{
          posicao: null,
          url: ''
        }}
        titulo="Resultados do Previne Brasil"
        texto="Aqui você vai encontrar os resultados e informações do seu município, referentes a cada pilar do Previne Brasil: Indicadores de Desempenho, Capitação Ponderada e Ações Estratégicas.<br>
        Selecione seu município no seletor abaixo: </br>"
      />

      <PanelSelectorSM
        panel={Number(router.query?.painel)}
        states={{
          activeTabIndex: Number(activeTabIndex),
          setActiveTabIndex: setActiveTabIndex,
          activeTitleTabIndex: activeTitleTabIndex,
          setActiveTitleTabIndex: setActiveTitleTabIndex
        }}
        components={[[
          <Indicadores key={uuidv1()}></Indicadores>,
          <Cadastros key={uuidv1()}></Cadastros>,
          <Acoes key={uuidv1()}></Acoes>,

        ]]}
        subtitles={[
          [
            {
              label: 'INDICADORES DE DESEMPENHO'
            },
            {
              label: 'CAPITAÇÃO PONDERADA'
            },
            {
              label: 'INCENTIVO A AÇÕES ESTRATEGICAS'
            },
          ]
        ]}
        titles={[
          {
            label: ''
          }
        ]}
      />
    </div>
  )
}

export default Index;

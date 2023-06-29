import { useEffect,useState,useContext } from 'react';
import { useRouter } from 'next/router';
import { v1 as uuidv1 } from 'uuid';
import { PanelSelectorSM, TituloTexto } from "@impulsogov/design-system"
import Indicadores from "./indicadores"
import Cadastros from "./cadastros"
import Acoes from "./acoes_estrategicas"


const Index = ({res}) => {
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
    <div>
      <TituloTexto
        imagem={ {
          posicao: null,
          url: ''
        } }
        titulo="Análises"
        texto=""
      />

      <PanelSelectorSM
        panel={ Number(router.query?.painel) }
        states={ {
          activeTabIndex: Number(activeTabIndex),
          setActiveTabIndex: setActiveTabIndex,
          activeTitleTabIndex: activeTitleTabIndex,
          setActiveTitleTabIndex: setActiveTitleTabIndex
        } }
        components={ [[
          <Indicadores key={ uuidv1() }></Indicadores>,
          <Cadastros key={ uuidv1() }></Cadastros>,
          <Acoes key={ uuidv1() }></Acoes>,
        
        ]] }
        subtitles={ [
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
        ] }
        titles={ [
          {
            label: ''
          }
        ] }
      />
    </div>
  )
}

export default Index;

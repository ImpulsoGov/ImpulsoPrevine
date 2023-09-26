import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { v1 as uuidv1 } from 'uuid';
import { PanelSelector, TituloTexto, ScoreCardGrid, Margem } from "@impulsogov/design-system"
import Indicadores from "../../componentes/indicadores"
import Cadastros from "../../componentes/cadastros"
import Acoes from "../../componentes/acoes_estrategicas"
import { CaracterizacaoMunicipalResumo } from ".././../services/caracterizacao_municipal_resumo"
import { MunicipioSelector } from "../../componentes/MunicipioSelector";
import { getData } from '../../services/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { data } from "../../utils/Municipios"
import Context from "../../utils/Context";

export async function getServerSideProps(ctx) {
  
  const res = [
    await getData(LAYOUT),
  ]
  return {
    props: {
      res: res
    }
  }
}
const Index = ({ res }) => {
  const router = useRouter();
  const [activeTabIndex, setActiveTabIndex] = useState(Number(router.query?.painel));
  const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
  const [scoreCardData, setScoreCardData] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useContext(Context); 
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

  useEffect(() => {
    CaracterizacaoMunicipalResumo(selectedMunicipio).then((res)=>setScoreCardData(res))
  }, [selectedMunicipio]);
  return (
    <div >

      <TituloTexto
        imagem={{
          posicao: null,
          url: ''
        }}
        titulo="Resultados do Previne Brasil"
        texto="Aqui você vai encontrar os resultados e informações do seu município, referentes a cada pilar do Previne Brasil: Indicadores de Desempenho, Capitação Ponderada e Ações Estratégicas. </br><br><b> SELECIONE SEU MUNICIPIO ABAIXO<b>"
      />
      
      <MunicipioSelector
        municipios={data}
        municipio={selectedMunicipio}
        setMunicipio={setSelectedMunicipio}
      />
      <Margem
        componente={
          <>
            {
              scoreCardData?.length>0 &&
              <ScoreCardGrid
                valores={scoreCardData}
              />
            }
          </>
        }
      />

      <PanelSelector
        panel={Number(router.query?.painel)}
        states={{
          activeTabIndex: Number(activeTabIndex),
          setActiveTabIndex: setActiveTabIndex,
          activeTitleTabIndex: activeTitleTabIndex,
          setActiveTitleTabIndex: setActiveTitleTabIndex
        }}
        conteudo = "components"
        components={[[
          <Indicadores key={uuidv1()} municipio={selectedMunicipio}/>,
          <Cadastros key={uuidv1()} municipio={selectedMunicipio}/>,
          <Acoes key={uuidv1()} municipio={selectedMunicipio}/>,

        ]]}
        list={[
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

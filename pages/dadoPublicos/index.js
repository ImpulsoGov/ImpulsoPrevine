import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { v1 as uuidv1 } from 'uuid';
import { PanelSelector, TituloTexto, ScoreCardGrid, Margem, CardAlert } from "@impulsogov/design-system"
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
        texto=""
      />

      <CardAlert
        background="#91D3DB"
        padding="20px 30px"
        margin="0 80px 60px 80px"
        destaque="AVISO: "
        msg="Os dados exibidos nessa página são referentes aos critérios do antigo Previne Brasil. As informações permanecem disponíveis para consulta, mas é importante ressaltar que, com o encerramento do programa, os resultados apresentados não devem ser considerados para o cofinanciamento da Atenção Primária à Saúde."
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
          <Indicadores key={"DadosPublicosIndicadores"} municipio={selectedMunicipio}/>,
          <Cadastros key={"DadosPublicosCadastros"} municipio={selectedMunicipio}/>,
          <Acoes key={"DadosPublicosAcoes"} municipio={selectedMunicipio}/>,

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

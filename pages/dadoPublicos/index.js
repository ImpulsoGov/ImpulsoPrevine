import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { v1 as uuidv1 } from 'uuid';
import { PanelSelectorSM, TituloTexto, ScoreCardGrid, Margem } from "@impulsogov/design-system"
import Indicadores from "../../componentes/indicadores"
import Cadastros from "../../componentes/cadastros"
import Acoes from "../../componentes/acoes_estrategicas"
import { CaracterizacaoMunicipalResumo } from ".././../services/caracterizacao_municipal_resumo"
import { MunicipioSelector } from "../../componentes/MunicipioSelector";
import { CardsIndicadores } from '../../componentes/CardsIndicadores/CardsIndicadores';
import { getData } from '../../services/cms'
import { LAYOUT, HOME } from '../../utils/QUERYS'
import { data } from "../../utils/Municipios"

export async function getServerSideProps(ctx) {
  const userIsActive = ctx.req.cookies['next-auth.session-token']
  const userIsActiveSecure = ctx.req.cookies['__Secure-next-auth.session-token']
  let redirect = !userIsActive && !userIsActiveSecure
  if (!redirect) {
    return {
      redirect: {
        destination: "/dadoPublicos",
        permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
      },
    }
  }
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
  const [selectedMunicipio, setSelectedMunicipio] = useState('São Paulo - SP'); // Estado para rastrear o município selecionado

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
    async function fetchScoreCardData() {
      try {
        const dataFromAPI = await CaracterizacaoMunicipalResumo(selectedMunicipio);
        
        const mappedData = CardsIndicadores(dataFromAPI);
        setScoreCardData(mappedData);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    }

    fetchScoreCardData();
  }, [selectedMunicipio]);

  const handleMunicipioChange = (event) => {
    const municipio = event.target.value;
    setSelectedMunicipio(municipio);
  };

  return (
    <div >

      <TituloTexto
        imagem={{
          posicao: null,
          url: ''
        }}
        titulo="Resultados do Previne Brasil"
        texto="Aqui você vai encontrar os resultados e informações do seu município, referentes a cada pilar do Previne Brasil: Indicadores de Desempenho, Capitação Ponderada e Ações Estratégicas."
      />
      <MunicipioSelector
        municipios={data.map((item) => ({ nome: item.nome, uf: item.uf }))}
        onChange={handleMunicipioChange}
      />
      <Margem
        componente={
          <>
            <ScoreCardGrid
              valores={scoreCardData}
            />
          </>
        }
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

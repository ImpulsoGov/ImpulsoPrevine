import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { v1 as uuidv1 } from 'uuid';
import { PanelSelectorSM, TituloTexto, ScoreCardGrid, Margem } from "@impulsogov/design-system"
import Indicadores from "../../componentes/indicadores"
import Cadastros from "../../componentes/cadastros"
import Acoes from "../../componentes/acoes_estrategicas"
import { CaracterizacaoMunicipalResumo } from '../../services/caracterizacao_municipal_resumo'
import { MunicipioSelector } from "../../componentes/MunicipioSelector";
import { getData } from '../../services/cms'
import { LAYOUT, HOME } from '../../utils/QUERYS'
import { data } from "../../utils/Municipios"
import Context from "../../utils/Context";

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

  const [indicadoresData, setIndicadoresData] = useState([]); // Estado para armazenar os dados dos indicadores
  const [cidade, setCidade] = useContext(Context);
  useEffect(() => { CaracterizacaoMunicipalResumo(cidade).then((result) => setIndicadoresData(result)) }, [cidade]);

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
      />
      <Margem
        componente={
          <>
            <ScoreCardGrid
              valores={[
                {
                  descricao: 'Total de pessoas com Hipertensão',
                  valor: 102
                },
                {
                  descricao: 'Total de pessoas com consulta e aferição de PA em dia',
                  valor: 102
                },
                {
                  descricao: 'Total de pessoas com Hipertensão',
                  valor: 102
                },
                {
                  descricao: 'Total de pessoas com Hipertensão',
                  valor: 102
                }
                ,
                {
                  descricao: 'Total de pessoas com Hipertensão',
                  valor: 102
                }
                ,
                {
                  descricao: 'Total de pessoas com Hipertensão',
                  valor: 102
                }
              ]}
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

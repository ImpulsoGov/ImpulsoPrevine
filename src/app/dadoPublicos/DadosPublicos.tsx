'use client'
import { useEffect, useState } from 'react';
import { PanelSelector, TituloTexto, ScoreCardGrid, Margem, CardAlert } from "@impulsogov/design-system"
import { Indicadores } from "@componentes/mounted/dados-publicos/indicadores/Indicadores"
import { CapitacaoPonderada } from "@componentes/mounted/dados-publicos/capitacao-ponderada/CapitacaoPonderada"
import { AcoesEstrategicas } from "@componentes/mounted/dados-publicos/acoes-estrategicas/AcoesEstrategicas"
import { MunicipioSelector } from "@componentes/MunicipioSelector";
import { data } from "@utils/Municipios"
import { CaracterizacaoMunicipalResumo } from "@services/caracterizacao_municipal_resumo"
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export const DadosPublicos = () => {
    const router = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams(); 
    const painel = Number(searchParams.get('painel'));
    const [activeTabIndex, setActiveTabIndex] = useState(painel || 0);
    const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
    const [scoreCardData, setScoreCardData] = useState([]);
    const [selectedMunicipio, setSelectedMunicipio] = useState("João Pessoa - PB"); 
    useEffect(() =>{ setActiveTabIndex(painel || 0)}, [path]);
    useEffect(() => router.push(`${path}?painel=${activeTabIndex}`), [activeTabIndex]);
    useEffect(() => {
      CaracterizacaoMunicipalResumo(selectedMunicipio).then((res)=>setScoreCardData(res))
    }, [selectedMunicipio]);
  
    return <>
    <TituloTexto
      imagem={{
        posicao: null,
        url: ''
      }}
      titulo="Resultados do Previne Brasil"
      texto=""
    />

    <div style={{
      lineHeight: "24px"
    }}>
      <CardAlert
        background="#91D3DB"
        padding="20px 30px"
        margin="0 80px"
        color="#1F1F1F"
        destaque={<span style={{fontSize: "16px"}}>AVISO: </span>}
        msg={<span style={{fontSize: "16px"}}>Os dados exibidos nessa página são referentes aos critérios do antigo Previne Brasil. As informações permanecem disponíveis para consulta, mas é importante ressaltar que, com o encerramento do programa, os resultados apresentados não devem ser considerados para o cofinanciamento da Atenção Primária à Saúde.</span>}
      />
    </div>

    <TituloTexto
      imagem={{
        posicao: null,
        url: ''
      }}
      titulo=""
      texto="<b>DIGITE O SEU MUNICIPIO ABAIXO</b>"
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
      panel={Number(useSearchParams().get('painel') || 0)}
      states={{
        activeTabIndex: Number(activeTabIndex),
        setActiveTabIndex: setActiveTabIndex,
        activeTitleTabIndex: activeTitleTabIndex,
        setActiveTitleTabIndex: setActiveTitleTabIndex
      }}
      conteudo = "components"
      components={[[
        <Indicadores key={"DadosPublicosIndicadores"} cidade={selectedMunicipio}/>,
        <CapitacaoPonderada key={"DadosPublicosCadastros"} cidade={selectedMunicipio} />,
        <AcoesEstrategicas key={"DadosPublicosAcoes"} cidade={selectedMunicipio} />,

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
  </>

}
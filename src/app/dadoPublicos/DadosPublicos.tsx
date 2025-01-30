'use client'
import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import dynamic from 'next/dynamic';
const Spinner = dynamic(() => import('@impulsogov/design-system').then(mod => mod.Spinner));
const PanelSelector = dynamic<{
  panel:number;
  states: {
    activeTabIndex: number;
    setActiveTabIndex: (index: number) => void;
    activeTitleTabIndex: number;
    setActiveTitleTabIndex: (index: number) => void;
  };
  conteudo: string;
  components: JSX.Element[][];
  list: {label: string}[][];
  titles: {label: string}[];
}>(() => import('@impulsogov/design-system').then(mod => mod.PanelSelector), { 
    loading: () => <Spinner/>
 });
const TituloTexto = dynamic<{ 
  titulo: string; 
  texto: string; 
  imagem: { 
    posicao: string | null; 
    url: string; 
  };
}>(() => import('@impulsogov/design-system').then(mod => mod.TituloTexto), { 
  loading: () => <Spinner/>
});
const ScoreCardGrid = dynamic<{ valores: { id: number; value: string }[] }>(() => import('@impulsogov/design-system').then(mod => mod.ScoreCardGrid), { 
  loading: () => <Spinner/>
});
const CardAlert = dynamic<{
  background: string;
  padding: string;
  margin: string;
  color: string;
  destaque: JSX.Element;
  msg: JSX.Element;
}>(() => import('@impulsogov/design-system').then(mod => mod.CardAlert), { 
  loading: () => <Spinner/>
});
const Indicadores = dynamic(() => import('@componentes/mounted/dados-publicos/indicadores/Indicadores').then(mod => mod.Indicadores), { 
  loading: () => <Spinner/>
});
const CapitacaoPonderada = dynamic(() => import('@componentes/mounted/dados-publicos/capitacao-ponderada/CapitacaoPonderada').then(mod => mod.CapitacaoPonderada), { 
  loading: () => <Spinner/>
});
const AcoesEstrategicas = dynamic(() => import('@componentes/mounted/dados-publicos/acoes-estrategicas/AcoesEstrategicas').then(mod => mod.AcoesEstrategicas), { 
  loading: () => <Spinner/>
});
const MunicipioSelector = dynamic(() => import('@componentes/MunicipioSelector').then(mod => mod.MunicipioSelector), { 
  loading: () => <Spinner/>
});

import { CaracterizacaoMunicipalResumo } from "@services/caracterizacao_municipal_resumo";
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
	useEffect(() =>{ setActiveTabIndex(painel || 0)}, [painel]);
	useEffect(() => router.push(`${path}?painel=${activeTabIndex}`), [activeTabIndex, path, router]);
    useEffect(() => {
      CaracterizacaoMunicipalResumo(selectedMunicipio).then((res)=>setScoreCardData(res))
    }, [selectedMunicipio]);
  
	return (
		<>
			<TituloTexto
				imagem={{
					posicao: null,
					url: "",
				}}
				titulo="Resultados do Previne Brasil"
				texto=""
			/>

			<div
				style={{
					lineHeight: "24px",
				}}
			>
				<CardAlert
					background="#91D3DB"
					padding="20px 30px"
					margin="0 80px"
					color="#1F1F1F"
					destaque={<span style={{ fontSize: "16px" }}>AVISO: </span>}
					msg={
						<span style={{ fontSize: "16px" }}>
							Os dados exibidos nessa página são referentes aos critérios do
							antigo Previne Brasil. As informações permanecem disponíveis para
							consulta, mas é importante ressaltar que, com o encerramento do
							programa, os resultados apresentados não devem ser considerados
							para o cofinanciamento da Atenção Primária à Saúde.
						</span>
					}
				/>
			</div>

	<TituloTexto
		imagem={{
			posicao: null,
			url: "",
		}}
		titulo=""
		texto="<b>DIGITE O SEU MUNICIPIO ABAIXO</b>"
	/>

	<MunicipioSelector
	  municipio={selectedMunicipio}
	  setMunicipio={setSelectedMunicipio}
	/>
	{scoreCardData?.length > 0 && (
	  <div>
		<ScoreCardGrid
		  valores={scoreCardData}
		/>
	  </div>
	)}

			<PanelSelector
				panel={Number(useSearchParams().get("painel") || 0)}
				states={{
					activeTabIndex: Number(activeTabIndex),
					setActiveTabIndex: setActiveTabIndex,
					activeTitleTabIndex: activeTitleTabIndex,
					setActiveTitleTabIndex: setActiveTitleTabIndex,
				}}
				conteudo="components"
				components={[
					[
						<Indicadores
							key={"DadosPublicosIndicadores"}
							cidade={selectedMunicipio}
						/>,
						<CapitacaoPonderada
							key={"DadosPublicosCadastros"}
							cidade={selectedMunicipio}
						/>,
						<AcoesEstrategicas
							key={"DadosPublicosAcoes"}
							cidade={selectedMunicipio}
						/>,
					],
				]}
				list={[
					[
						{
							label: "INDICADORES DE DESEMPENHO",
						},
						{
							label: "CAPITAÇÃO PONDERADA",
						},
						{
							label: "INCENTIVO A AÇÕES ESTRATEGICAS",
						},
					],
				]}
				titles={[
					{
						label: "",
					},
				]}
			/>
		</>
	);
};

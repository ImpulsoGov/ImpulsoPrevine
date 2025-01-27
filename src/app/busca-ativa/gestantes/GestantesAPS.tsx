import { IndicadorUmTabelaGestantesAtivas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_1/tabelas/GestantesAtivas";
import { IndicadorUmTabelaGestantesEncerradas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_1/tabelas/GestantesEncerradas";
import { IndicadorDoisTabelaGestantesAtivas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_2/tabelas/GestantesAtivas";
import { IndicadorDoisTabelaGestantesEncerradas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_2/tabelas/GestantesEncerradas";
import { IndicadorTresTabelaGestantesAtivas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_3/tabelas/GestantesAtivas";
import { IndicadorTresTabelaGestantesEncerradas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_3/tabelas/GestantesEncerradas";
import { IndicadorUmCardsGestantesAtivas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_1/cards/cardsGestantesAtivas";
import { IndicadorUmCardsGestantesEncerradas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_1/cards/cardsGestantesEncerradas";
import { IndicadorDoisCardsGestantesAtivas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_2/cards/cardsGestantesAtivas";
import { IndicadorDoisCardsGestantesEncerradas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_2/cards/cardsGestantesEncerradas";
import { IndicadorTresCardsGestantesAtivas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_3/cards/cardsGestantesAtivas";
import { IndicadorTresCardsGestantesEncerradas } from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_3/cards/cardsGestantesEncerradas";
import { TabelaGestantesSemDUM } from "@componentes/mounted/busca-ativa/gestantes/APS/GestantesSemDUM/GestantesSemDum";
import {
	CardsGraficoIndicadorDoisQuadriAtual,
	GraficoIndicadorDoisQuadriAtual,
} from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_2/grafico_indicador_2_atual";
import {
	CardsGraficoIndicadorDoisQuadriFuturo,
	GraficoIndicadorDoisQuadriFuturo,
} from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_2/grafico_indicador_2_futuro";
import {
	CardsGraficoIndicadorTresQuadriAtual,
	GraficoIndicadorTresQuadriAtual,
} from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_3/grafico_indicador_3_atual";
import {
	CardsGraficoIndicadorTresQuadriFuturo,
	GraficoIndicadorTresQuadriFuturo,
} from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_3/grafico_indicador_3_futuro";
import { CardsAPS } from "@componentes/mounted/busca-ativa/gestantes/APS/cardsAPS";
import {
	CardsGraficoIndicadorUmQuadriFuturo,
	GraficoIndicadorUmQuadriFuturo,
} from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_1/grafico_indicador_1_futuro";
import {
	GraficoIndicadorUmQuadriAtual,
	CardsGraficoIndicadorUmQuadriAtual,
} from "@componentes/mounted/busca-ativa/gestantes/APS/indicador_1/grafico_indicador_1_atual";
import {
	PainelComLegendaIndUm,
	PainelComLegendaInd2e3,
	PainelComLegenda,
} from "./PainelComLegenda";
import mixpanel from "mixpanel-browser";
import MunicipioQuadrimestre from "@componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import {
	formatarQuadrimestres,
	obterDadosProximosQuadrimestres,
	obterDadosQuadrimestre,
} from "@utils/quadrimestre";
import { dispararEventoAbrirImpressaoAPS } from "@helpers/eventosImpressaoHotjar";
import {
	CardAlert,
	TituloTexto,
	ButtonLightSubmit,
	PanelSelector,
} from "@impulsogov/design-system";
import { Dispatch, SetStateAction } from "react";

export const GestantesAPS = ({
	tabelaDataAPS,
	tabelaData,
	setTabelaData,
	showSnackBar,
	setShowSnackBar,
	Voltar,
	activeTabIndex,
	setActiveTabIndex,
	activeTitleTabIndex,
	setActiveTitleTabIndex,
	filtros_aplicados,
	setFiltros_aplicados,
}: {
	tabelaDataAPS: any;
	tabelaData: any;
	setTabelaData: Dispatch<SetStateAction<any>>;
	showSnackBar: any;
	setShowSnackBar: Dispatch<SetStateAction<any>>;
	Voltar: () => void;
	activeTabIndex: any;
	setActiveTabIndex: Dispatch<SetStateAction<any>>;
	activeTitleTabIndex: any;
	setActiveTitleTabIndex: Dispatch<SetStateAction<any>>;
	filtros_aplicados: any;
	setFiltros_aplicados: Dispatch<SetStateAction<any>>;
}) => {
	const Children = [
		[
			[
				<CardsGraficoIndicadorUmQuadriAtual
					tabelaDataAPS={tabelaDataAPS}
					key="CardsGraficoIndicadorUmQuadriAtual"
				/>,
				<GraficoIndicadorUmQuadriAtual
					tabelaDataAPS={tabelaDataAPS}
					key="GraficoIndicadorUmQuadriAtual"
				/>,
			],
			[
				<CardsGraficoIndicadorUmQuadriFuturo
					tabelaDataAPS={tabelaDataAPS}
					key="CardsGraficoIndicadorUmQuadriFuturo"
				/>,
				<GraficoIndicadorUmQuadriFuturo
					tabelaDataAPS={tabelaDataAPS}
					key="GraficoIndicadorUmQuadriFuturo"
				/>,
			],
			[
				<IndicadorUmCardsGestantesAtivas
					tabelaDataAPS={tabelaDataAPS}
					key="IndicadorUmCardsGestantesAtivas"
				/>,
				<IndicadorUmTabelaGestantesAtivas
					tabelaDataAPS={tabelaDataAPS}
					tabelaData={tabelaData}
					setTabelaData={setTabelaData}
					trackObject={mixpanel}
					aba={activeTitleTabIndex}
					sub_aba={activeTabIndex}
					liberarPesquisa={dispararEventoAbrirImpressaoAPS}
					showSnackBar={showSnackBar}
					setShowSnackBar={setShowSnackBar}
					filtros_aplicados={filtros_aplicados}
					setFiltros_aplicados={setFiltros_aplicados}
					key="IndicadorUmTabelaGestantesAtivas"
				/>,
				<PainelComLegendaIndUm key="PainelComLegendaIndUmGestantesAtivas" />,
			],
			[
				<IndicadorUmCardsGestantesEncerradas
					tabelaDataAPS={tabelaDataAPS}
					key="IndicadorUmCardsGestantesEncerradas"
				/>,
				<IndicadorUmTabelaGestantesEncerradas
					tabelaDataAPS={tabelaDataAPS}
					tabelaData={tabelaData}
					setTabelaData={setTabelaData}
					trackObject={mixpanel}
					aba={activeTitleTabIndex}
					sub_aba={activeTabIndex}
					liberarPesquisa={dispararEventoAbrirImpressaoAPS}
					showSnackBar={showSnackBar}
					setShowSnackBar={setShowSnackBar}
					filtros_aplicados={filtros_aplicados}
					setFiltros_aplicados={setFiltros_aplicados}
					key="IndicadorUmTabelaGestantesEncerradas"
				/>,
				<PainelComLegendaIndUm key="PainelComLegendaIndUmGestantesEncerradas" />,
			],
		],
		[
			[
				<CardsGraficoIndicadorDoisQuadriAtual
					tabelaDataAPS={tabelaDataAPS}
					key="CardsGraficoIndicadorDoisQuadriAtual"
				/>,
				<GraficoIndicadorDoisQuadriAtual
					tabelaDataAPS={tabelaDataAPS}
					key="GraficoIndicadorDoisQuadriAtual"
				/>,
			],
			[
				<CardsGraficoIndicadorDoisQuadriFuturo
					tabelaDataAPS={tabelaDataAPS}
					key="CardsGraficoIndicadorDoisQuadriFuturo"
				/>,
				<GraficoIndicadorDoisQuadriFuturo
					tabelaDataAPS={tabelaDataAPS}
					key="GraficoIndicadorDoisQuadriFuturo"
				/>,
			],
			[
				<IndicadorDoisCardsGestantesAtivas
					tabelaDataAPS={tabelaDataAPS}
					key="IndicadorDoisCardsGestantesAtivas"
				/>,
				<IndicadorDoisTabelaGestantesAtivas
					tabelaDataAPS={tabelaDataAPS}
					tabelaData={tabelaData}
					setTabelaData={setTabelaData}
					trackObject={mixpanel}
					aba={activeTitleTabIndex}
					sub_aba={activeTabIndex}
					liberarPesquisa={dispararEventoAbrirImpressaoAPS}
					showSnackBar={showSnackBar}
					setShowSnackBar={setShowSnackBar}
					filtros_aplicados={filtros_aplicados}
					setFiltros_aplicados={setFiltros_aplicados}
					key="IndicadorDoisTabelaGestantesAtivas"
				/>,
				<PainelComLegendaInd2e3 key="PainelComLegendaInd2GestantesAtivas" />,
			],
			[
				<IndicadorDoisCardsGestantesEncerradas
					tabelaDataAPS={tabelaDataAPS}
					key="IndicadorDoisCardsGestantesEncerradas"
				/>,
				<IndicadorDoisTabelaGestantesEncerradas
					tabelaDataAPS={tabelaDataAPS}
					tabelaData={tabelaData}
					setTabelaData={setTabelaData}
					trackObject={mixpanel}
					aba={activeTitleTabIndex}
					sub_aba={activeTabIndex}
					liberarPesquisa={dispararEventoAbrirImpressaoAPS}
					showSnackBar={showSnackBar}
					setShowSnackBar={setShowSnackBar}
					filtros_aplicados={filtros_aplicados}
					setFiltros_aplicados={setFiltros_aplicados}
					key="IndicadorDoisTabelaGestantesEncerradas"
				/>,
				<PainelComLegendaInd2e3 key="PainelComLegendaInd2GestantesEncerradas" />,
			],
		],
		[
			[
				<CardsGraficoIndicadorTresQuadriAtual
					tabelaDataAPS={tabelaDataAPS}
					key="CardsGraficoIndicadorTresQuadriAtual"
				/>,
				<GraficoIndicadorTresQuadriAtual
					tabelaDataAPS={tabelaDataAPS}
					key="GraficoIndicadorTresQuadriAtual"
				/>,
			],
			[
				<CardsGraficoIndicadorTresQuadriFuturo
					tabelaDataAPS={tabelaDataAPS}
					key="CardsGraficoIndicadorTresQuadriFuturo"
				/>,
				<GraficoIndicadorTresQuadriFuturo
					tabelaDataAPS={tabelaDataAPS}
					key="GraficoIndicadorTresQuadriFuturo"
				/>,
			],
			[
				<IndicadorTresCardsGestantesAtivas
					tabelaDataAPS={tabelaDataAPS}
					key="IndicadorTresCardsGestantesAtivas"
				/>,
				<IndicadorTresTabelaGestantesAtivas
					tabelaDataAPS={tabelaDataAPS}
					tabelaData={tabelaData}
					setTabelaData={setTabelaData}
					trackObject={mixpanel}
					aba={activeTitleTabIndex}
					sub_aba={activeTabIndex}
					liberarPesquisa={dispararEventoAbrirImpressaoAPS}
					showSnackBar={showSnackBar}
					setShowSnackBar={setShowSnackBar}
					filtros_aplicados={filtros_aplicados}
					setFiltros_aplicados={setFiltros_aplicados}
					key="IndicadorTresTabelaGestantesAtivas"
				/>,
				<PainelComLegendaInd2e3 key="PainelComLegendaInd3GestantesAtivas" />,
			],
			[
				<IndicadorTresCardsGestantesEncerradas
					tabelaDataAPS={tabelaDataAPS}
					key="IndicadorTresCardsGestantesEncerradas"
				/>,
				<IndicadorTresTabelaGestantesEncerradas
					tabelaDataAPS={tabelaDataAPS}
					tabelaData={tabelaData}
					setTabelaData={setTabelaData}
					trackObject={mixpanel}
					aba={activeTitleTabIndex}
					sub_aba={activeTabIndex}
					liberarPesquisa={dispararEventoAbrirImpressaoAPS}
					showSnackBar={showSnackBar}
					setShowSnackBar={setShowSnackBar}
					filtros_aplicados={filtros_aplicados}
					setFiltros_aplicados={setFiltros_aplicados}
					key="IndicadorTresTabelaGestantesEncerradas"
				/>,
				<PainelComLegendaInd2e3 key="PainelComLegendaInd3GestantesEncerradas" />,
			],
		],
		[
			<>
				<TabelaGestantesSemDUM
					tabelaDataAPS={tabelaDataAPS}
					tabelaData={tabelaData}
					setTabelaData={setTabelaData}
					trackObject={mixpanel}
					aba={activeTitleTabIndex}
					sub_aba={activeTabIndex}
					liberarPesquisa={dispararEventoAbrirImpressaoAPS}
					showSnackBar={showSnackBar}
					setShowSnackBar={setShowSnackBar}
					filtros_aplicados={filtros_aplicados}
					setFiltros_aplicados={setFiltros_aplicados}
					key="TabelaGestantesSemDUM"
				/>
				<PainelComLegenda key="PainelComLegendaGestantesSemDUM" />
			</>,
		],
	];
	const dataAtual = Date.now();
	const quadriAtualFormatado = dataAtual
		? `${formatarQuadrimestres([obterDadosQuadrimestre(dataAtual)])}`
		: "";
	const quadrisFuturosFormatados = dataAtual
		? formatarQuadrimestres(obterDadosProximosQuadrimestres(dataAtual), " + ")
		: "";

	return (
		<>
			<div style={{ padding: "30px 80px 30px 80px", display: "flex" }}>
				<ButtonLightSubmit
					icon="https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG"
					label="VOLTAR"
					submit={Voltar}
				/>
			</div>
			<TituloTexto
				titulo="Lista Nominal de Pré-Natal"
				texto=""
				imagem={{ posicao: null, url: "" }}
			/>
			<CardAlert
				destaque="IMPORTANTE: "
				msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
			/>
			<MunicipioQuadrimestre data={dataAtual} />
			<CardsAPS tabelaDataAPS={tabelaDataAPS} />
			<PanelSelector
				breakLines
				components={Children}
				conteudo="components"
				states={{
					activeTabIndex: Number(activeTabIndex),
					setActiveTabIndex: setActiveTabIndex,
					activeTitleTabIndex: activeTitleTabIndex,
					setActiveTitleTabIndex: setActiveTitleTabIndex,
				}}
				list={[
					[
						{
							label: `GRÁFICO ${quadriAtualFormatado}`,
						},
						{
							label: `GRÁFICO ${quadrisFuturosFormatados}`,
						},
						{
							label: "GESTANTES ATIVAS",
						},
						{
							label: "GESTANTES ENCERRADAS",
						},
					],
					[
						{
							label: `GRÁFICO ${quadriAtualFormatado}`,
						},
						{
							label: `GRÁFICO ${quadrisFuturosFormatados}`,
						},
						{
							label: "GESTANTES ATIVAS",
						},
						{
							label: "GESTANTES ENCERRADAS",
						},
					],
					[
						{
							label: `GRÁFICO ${quadriAtualFormatado}`,
						},
						{
							label: `GRÁFICO ${quadrisFuturosFormatados}`,
						},
						{
							label: "GESTANTES ATIVAS",
						},
						{
							label: "GESTANTES ENCERRADAS",
						},
					],
					[
						{
							label: "GESTANTES SEM DUM",
						},
					],
				]}
				titles={[
					{
						label: "INDICADOR 1 (6 CONSULTAS)",
					},
					{
						label: "INDICADOR 2 (EXAME DE HIV E SÍFILIS)",
					},
					{
						label: "INDICADOR 3 (ATENDIMENTO ODONTO)",
					},
					{
						label: "GESTANTES SEM DUM",
					},
				]}
			/>
		</>
	);
};

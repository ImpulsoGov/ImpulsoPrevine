"use client";
import { TabelaEquipe } from "@componentes/mounted/busca-ativa/diabetes/Equipe/TabelaEquipe";
import MunicipioQuadrimestre from "@componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import {
	ButtonLightSubmit,
	CardAlert,
	ScoreCardGrid,
	Spinner,
	TituloTexto,
} from "@impulsogov/design-system";
import type { Dispatch, SetStateAction } from "react";
import { PainelComLegenda } from "./PainelComLegenda";

export const DiabetesEquipe = ({
	tabelaData,
	tabelaDataEquipe,
	setTabelaData,
	showSnackBar,
	setShowSnackBar,
	setFiltros_aplicados,
	dispararEventoAbrirImpressaoEquipe,
	Voltar,
}: {
	tabelaData: any;
	tabelaDataEquipe: any;
	setTabelaData: Dispatch<SetStateAction<any>>;
	showSnackBar: any;
	setShowSnackBar: Dispatch<SetStateAction<any>>;
	setFiltros_aplicados: Dispatch<SetStateAction<any>>;
	dispararEventoAbrirImpressaoEquipe: any;
	Voltar: any;
}) => {
	const dataAtual = Date.now();
	return (
		<>
			<div
				style={
					window.screen.width > 1024
						? { padding: "30px 80px 30px 80px", display: "flex" }
						: { padding: "30px 0 0 5px", display: "flex" }
				}
			>
				<ButtonLightSubmit
					icon="https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG"
					label="VOLTAR"
					submit={Voltar}
				/>
			</div>
			<TituloTexto
				titulo="Lista Nominal Diabetes"
				texto=""
				imagem={{ posicao: null, url: "" }}
			/>
			<CardAlert
				destaque="IMPORTANTE: "
				msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
			/>
			<MunicipioQuadrimestre data={dataAtual} />

			{tabelaDataEquipe && (
				<ScoreCardGrid
					valores={[
						{
							descricao: "Total de pessoas com diabetes",
							valor: tabelaDataEquipe.length,
						},
						{
							descricao:
								"Total de pessoas com consulta e solicitação de hemoglobina glicada em dia",
							valor: tabelaDataEquipe?.reduce((acumulador: any, item: any) => {
								return item.prazo_proxima_consulta == "Em dia" &&
									item.prazo_proxima_solicitacao_hemoglobina == "Em dia"
									? acumulador + 1
									: acumulador;
							}, 0),
						},
						{
							descricao: "Total de pessoas com diagnóstico autorreferido",
							valor: tabelaDataEquipe.reduce((acumulador: any, item: any) => {
								return item.identificacao_condicao_diabetes == "Autorreferida"
									? acumulador + 1
									: acumulador;
							}, 0),
						},
						{
							descricao: "Total de pessoas com diagnóstico clínico",
							valor: tabelaDataEquipe.reduce((acumulador: any, item: any) => {
								return item.identificacao_condicao_diabetes ==
									"Diagnóstico Clínico"
									? acumulador + 1
									: acumulador;
							}, 0),
						},
					]}
				/>
			)}
			<TabelaEquipe
				tabelaData={tabelaData}
				tabelaDataEquipe={tabelaDataEquipe}
				setTabelaData={setTabelaData}
				showSnackBar={showSnackBar}
				setShowSnackBar={setShowSnackBar}
				setFiltros_aplicados={setFiltros_aplicados}
				liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
			/>
			{tabelaDataEquipe ? <PainelComLegenda /> : <Spinner />}
		</>
	);
};

"use client";
import {
	CardAlert,
	TituloTexto,
	ButtonLightSubmit,
	ScoreCardGrid,
	Spinner,
} from "@impulsogov/design-system";
import MunicipioQuadrimestre from "@componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import { TabelaEquipe } from "@componentes/mounted/busca-ativa/hipertensao/Equipe/TabelaEquipe";
import { PainelComLegenda } from "../diabeticos/PainelComLegenda";
import React, { Dispatch, SetStateAction } from "react";

interface HipertensaoEquipeType {
	tabelaDataEquipe: any;
	tabelaData: any;
	setTabelaData: Dispatch<SetStateAction<any>>;
	showSnackBar: any;
	setShowSnackBar: Dispatch<SetStateAction<any>>;
	filtros_aplicados: any;
	setFiltros_aplicados: Dispatch<SetStateAction<any>>;
	dispararEventoAbrirImpressaoEquipe: () => void;
	Voltar: () => void;
}

export const HipertensaoEquipe: React.FC<HipertensaoEquipeType> = ({
	tabelaDataEquipe,
	tabelaData,
	setTabelaData,
	showSnackBar,
	setShowSnackBar,
	filtros_aplicados,
	setFiltros_aplicados,
	dispararEventoAbrirImpressaoEquipe,
	Voltar,
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
				titulo="Lista Nominal Hipertensão"
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
							descricao: "Total de pessoas com hipertensão",
							valor: tabelaDataEquipe.length,
						},
						{
							descricao:
								"Total de pessoas com consulta e aferição de PA em dia",
							valor: tabelaDataEquipe.reduce((acumulador: any, item: any) => {
								return item.prazo_proxima_consulta == "Em dia" &&
									item.prazo_proxima_afericao_pa == "Em dia"
									? acumulador + 1
									: acumulador;
							}, 0),
						},
						{
							descricao: "Total de pessoas com diagnóstico autorreferido",
							valor: tabelaDataEquipe.reduce((acumulador: any, item: any) => {
								return item.identificacao_condicao_hipertensao ==
									"Autorreferida"
									? acumulador + 1
									: acumulador;
							}, 0),
						},
						{
							descricao: "Total de pessoas com diagnóstico clínico",
							valor: tabelaDataEquipe.reduce((acumulador: any, item: any) => {
								return item.identificacao_condicao_hipertensao ==
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
				liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
				filtros_aplicados={filtros_aplicados}
				setFiltros_aplicados={setFiltros_aplicados}
			/>
			{tabelaDataEquipe ? <PainelComLegenda /> : <Spinner />}
		</>
	);
};

"use client";
import { TabelaAPS } from "@componentes/mounted/busca-ativa/hipertensao/APS/TabelaAPS";
import MunicipioQuadrimestre from "@componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import {
	ButtonLightSubmit,
	CardAlert,
	GraficoBuscaAtiva,
	ScoreCardGrid,
	Spinner,
	TituloTexto,
} from "@impulsogov/design-system";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { PainelComLegenda } from "../diabeticos/PainelComLegenda";

interface HipertensaoAPSType {
	tabelaDataAPS: any;
	tabelaData: any;
	setTabelaData: Dispatch<SetStateAction<any>>;
	showSnackBar: any;
	setShowSnackBar: Dispatch<SetStateAction<any>>;
	filtros_aplicados: any;
	setFiltros_aplicados: Dispatch<SetStateAction<any>>;
	dispararEventoAbrirImpressaoAPS: () => void;
	Voltar: () => void;
}

export const HipertensaoAPS: React.FC<HipertensaoAPSType> = ({
	tabelaDataAPS,
	tabelaData,
	setTabelaData,
	filtros_aplicados,
	setFiltros_aplicados,
	showSnackBar,
	setShowSnackBar,
	dispararEventoAbrirImpressaoAPS,
	Voltar,
}) => {
	const dataAtual = Date.now();
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
				titulo="Lista Nominal Hipertensão"
				texto=""
				imagem={{ posicao: null, url: "" }}
			/>
			<CardAlert
				destaque="IMPORTANTE: "
				msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
			/>
			<MunicipioQuadrimestre data={dataAtual} />
			{tabelaDataAPS && (
				<ScoreCardGrid
					valores={[
						{
							descricao: "Total de pessoas com hipertensão",
							valor: tabelaDataAPS.length,
						},
						{
							descricao:
								"Total de pessoas com consulta e aferição de PA em dia",
							valor: tabelaDataAPS.reduce((acumulador: number, item: Record<string,string>) => {
								return item.prazo_proxima_consulta === "Em dia" &&
									item.prazo_proxima_afericao_pa === "Em dia"
									? acumulador + 1
									: acumulador;
							}, 0),
						},
						{
							descricao: "Total de pessoas com diagnóstico autorreferido",
							valor: tabelaDataAPS.reduce((acumulador: number, item: Record<string,string>) => {
								return item.identificacao_condicao_hipertensao ===
									"Autorreferida"
									? acumulador + 1
									: acumulador;
							}, 0),
						},
						{
							descricao: "Total de pessoas com diagnóstico clínico",
							valor: tabelaDataAPS.reduce((acumulador: number, item: Record<string,string>) => {
								return item.identificacao_condicao_hipertensao ===
									"Diagnóstico Clínico"
									? acumulador + 1
									: acumulador;
							}, 0),
						},
					]}
				/>
			)}
			{tabelaDataAPS && (
				<GraficoBuscaAtiva
					dataBarra={{
						title: {
							text: "Distribuição por equipe",
							subtext: "",
							left: "80",
							top: "top",
						},
						color: ["#55D499", "#F8D76B", "#FFA75E", "#FF7C81"],
						grid: {
							containLabel: true,
							top: "20%",
						},
						legend: {
							data: [
								"Consulta e aferição de PA em dia",
								"Apenas a consulta a fazer",
								"Apenas a aferição de PA a fazer",
								"Os dois a fazer",
							],
							top: "60",
						},
						series: [
							{
								data: Object.entries(
									tabelaDataAPS.reduce((acumulador: { [x: string]: number; }, item: Record<string,string>) => {
										if (
											item.prazo_proxima_consulta === "Em dia" &&
											item.prazo_proxima_afericao_pa === "Em dia"
										)
											acumulador[item.equipe_nome_cadastro] =
												(acumulador[item.equipe_nome_cadastro] || 0) + 1;
										return acumulador;
									}, {}),
								),
								name: "Consulta e aferição de PA em dia",
								stack: "stack",
								type: "bar",
							},
							{
								data: Object.entries(
									tabelaDataAPS.reduce((acumulador: { [x: string]: number; }, item: Record<string,string>) => {
										if (
											item.prazo_proxima_consulta !== "Em dia" &&
											item.prazo_proxima_afericao_pa === "Em dia"
										)
											acumulador[item.equipe_nome_cadastro] =
												(acumulador[item.equipe_nome_cadastro] || 0) + 1;
										return acumulador;
									}, {}),
								),
								name: "Apenas a consulta a fazer",
								stack: "stack",
								type: "bar",
							},
							{
								data: Object.entries(
									tabelaDataAPS.reduce((acumulador: { [x: string]: number; }, item: Record<string,string>) => {
										if (
											item.prazo_proxima_afericao_pa !== "Em dia" &&
											item.prazo_proxima_consulta === "Em dia"
										)
											acumulador[item.equipe_nome_cadastro] =
												(acumulador[item.equipe_nome_cadastro] || 0) + 1;
										return acumulador;
									}, {}),
								),
								name: "Apenas a aferição de PA a fazer",
								stack: "stack",
								type: "bar",
							},
							{
								data: Object.entries(
									tabelaDataAPS.reduce((acumulador: { [x: string]: number; }, item: Record<string,string>) => {
										if (
											item.prazo_proxima_consulta !== "Em dia" &&
											item.prazo_proxima_afericao_pa !== "Em dia"
										)
											acumulador[item.equipe_nome_cadastro] =
												(acumulador[item.equipe_nome_cadastro] || 0) + 1;
										return acumulador;
									}, {}),
								),
								name: "Os dois a fazer",
								stack: "stack",
								type: "bar",
							},
						],
						tooltip: {
							trigger: "axis",
						},
						xAxis: {
							data: Array.from(
								new Set(
									tabelaDataAPS.map((item: Record<string,string>) => item.equipe_nome_cadastro),
								),
							),
							type: "category",
							axisLabel: {
								rotate: 45,
							},
						},
						yAxis: {
							type: "value",
							axisLabel: {
								formatter: (value: number) => value.toLocaleString("pt-BR"),
							},
						},
					}}
					dataRosca={{
						title: {
							text: "Consolidado Municipal",
							left: "80",
						},
						color: ["#55D499", "#F8D76B", "#FFA75E", "#FF7C81"],
						series: [
							{
								avoidLabelOverlap: false,
								data: [
									{
										name: "Consulta e Aferição de PA em dia",
										value: (
											(tabelaDataAPS.reduce((acumulador: number, item: Record<string,string>) => {
												return item.prazo_proxima_consulta === "Em dia" &&
													item.prazo_proxima_afericao_pa === "Em dia"
													? acumulador + 1
													: acumulador;
											}, 0) *
												100) /
											tabelaDataAPS.length
										).toFixed(1),
									},
									{
										name: "Apenas a consulta a fazer",
										value: (
											(tabelaDataAPS.reduce((acumulador: number, item: Record<string,string>) => {
												return item.prazo_proxima_consulta !== "Em dia" &&
													item.prazo_proxima_afericao_pa === "Em dia"
													? acumulador + 1
													: acumulador;
											}, 0) *
												100) /
											tabelaDataAPS.length
										).toFixed(1),
									},
									{
										name: "Apenas Aferição de PA a fazer",
										value: (
											(tabelaDataAPS.reduce((acumulador: number, item: Record<string,string>) => {
												return item.prazo_proxima_afericao_pa !== "Em dia" &&
													item.prazo_proxima_consulta === "Em dia"
													? acumulador + 1
													: acumulador;
											}, 0) *
												100) /
											tabelaDataAPS.length
										).toFixed(1),
									},
									{
										name: "Os dois a fazer",
										value: (
											(tabelaDataAPS.reduce((acumulador: number, item: Record<string,string>) => {
												return item.prazo_proxima_consulta !== "Em dia" &&
													item.prazo_proxima_afericao_pa !== "Em dia"
													? acumulador + 1
													: acumulador;
											}, 0) *
												100) /
											tabelaDataAPS.length
										).toFixed(1),
									},
								],
								emphasis: {
									label: {
										fontSize: "20",
										fontWeight: "bold",
										show: true,
									},
								},
								label: {
									formatter: "{c}%",
									position: "inside",
									show: true,
									textStyle: {
										color: "white",
										fontSize: 12,
									},
								},
								labelLine: {
									show: false,
								},
								name: "Gráfico de rosca",
								radius: ["35%", "70%"],
								type: "pie",
							},
						],
						tooltip: {
							formatter: "{b}",
							trigger: "item",
						},
					}}
				/>
			)}
			<TabelaAPS
				tabelaData={tabelaData}
				tabelaDataAPS={tabelaDataAPS}
				liberarPesquisa={dispararEventoAbrirImpressaoAPS}
				setTabelaData={setTabelaData}
				showSnackBar={showSnackBar}
				setShowSnackBar={setShowSnackBar}
				filtros_aplicados={filtros_aplicados}
				setFiltros_aplicados={setFiltros_aplicados}
			/>
			{tabelaDataAPS ? <PainelComLegenda /> : <Spinner />}
		</>
	);
};

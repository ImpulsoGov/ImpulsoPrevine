import { Spinner } from "@impulsogov/design-system";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";

const GraficoSuasEquipes = ({ GrafCapitacao }) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Verifica se GrafCapitacao não está vazio e define data com os dados corretos
		if (GrafCapitacao && GrafCapitacao.length > 0) {
			setData(GrafCapitacao);
			setIsLoading(false);
		}
	}, [GrafCapitacao]);

	const cadastradosData = data.filter(
		(item) =>
			item.equipe_status_tipo === "Cadastrados" &&
			item.equipe_status === "Cadastradas",
	);
	const homologadosCadastradasData = data.filter(
		(item) =>
			item.equipe_status_tipo === "Homologados" &&
			item.equipe_status === "Cadastradas e homologadas",
	);
	const homologadosNaoCadastradasData = data.filter(
		(item) =>
			item.equipe_status_tipo === "Homologados" &&
			item.equipe_status === "Cadastradas e não homologadas",
	);
	const validosData = data.filter(
		(item) =>
			item.equipe_status_tipo === "Válidos" &&
			item.equipe_status === "Homologadas e válidas",
	);
	const naovalidosData = data.filter(
		(item) =>
			item.equipe_status_tipo === "Válidos" &&
			item.equipe_status === "Homologadas e não válidas",
	);

	const option = {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
		},
		legend: {},
		grid: {
			left: "0%",
			right: "0%",
			bottom: "0%",
			containLabel: true,
		},
		xAxis: [
			{
				type: "value",

				splitLine: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
			},
		],
		yAxis: [
			{
				type: "category",
				data: [""],
				splitLine: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
			},
		],
		series: [
			{
				name: "Cadastradas",
				type: "bar",
				stack: "Unico",
				itemStyle: {
					color: "#145C56",
				},
				label: {
					show: true,
					position: "insideRight",
				},
				emphasis: {
					focus: "series",
				},
				barWidth: 40,
				data: cadastradosData.map((item) => ({
					value: item.equipe_total,
					tooltip: {
						formatter: `Cadastrados: ${item.equipe_total}`,
					},
				})),
			},
			{
				name: "Cadastradas e homologadas",
				type: "bar",
				stack: "ch",
				itemStyle: {
					color: "#238A62",
				},
				label: {
					show: true,
					position: "insideRight",
				},
				emphasis: {
					focus: "series",
				},
				barWidth: 40,
				data: homologadosCadastradasData.map((item) => ({
					value: item.equipe_total,
					tooltip: {
						formatter: `Cadastradas e homologadas: ${item.equipe_total}`,
					},
				})),
			},
			{
				name: "Cadastradas e não homologadas",
				type: "bar",
				stack: "ch",
				itemStyle: {
					color: "#7CD6A5",
				},
				label: {
					show: true,
					position: "insideRight",
				},
				emphasis: {
					focus: "series",
				},
				barWidth: 40,
				data: homologadosNaoCadastradasData.map((item) => ({
					value: item.equipe_total,
					tooltip: {
						formatter: `Cadastradas e não homologadas: ${item.equipe_total}`,
					},
				})),
			},
			{
				name: "Homologadas e válidas",
				type: "bar",
				stack: "hv",
				itemStyle: {
					color: "#96D8BF",
				},
				label: {
					show: true,
					position: "insideRight",
				},
				emphasis: {
					focus: "series",
				},
				barWidth: 40,
				data: validosData.map((item) => ({
					value: item.equipe_total,
					tooltip: {
						formatter: `Homologadas e válidas: ${item.equipe_total}`,
					},
				})),
			},
			{
				name: "Homologadas e não válidas",
				type: "bar",
				stack: "hv",
				itemStyle: {
					color: "#29BD83",
				},
				label: {
					show: true,
					position: "insideRight",
				},
				emphasis: {
					focus: "series",
				},
				barWidth: 40,
				data: naovalidosData.map((item) => ({
					value: item.equipe_total,
					tooltip: {
						formatter: `Homologadas e não válidas: ${item.equipe_total}`,
					},
				})),
			},
		],
	};

	if (isLoading) {
		return <Spinner />;
	} else {
		return (
			<ReactEcharts
				option={option}
				style={{ height: "200px", width: "100%" }}
			/>
		);
	}
};

export default GraficoSuasEquipes;

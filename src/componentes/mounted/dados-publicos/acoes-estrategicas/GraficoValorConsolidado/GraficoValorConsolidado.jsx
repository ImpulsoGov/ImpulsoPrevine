import { Spinner } from "@impulsogov/design-system";
import ReactEcharts from "echarts-for-react";

function formatar(value) {
	if (value >= 1000000) {
		return (value / 1000000).toFixed(1) + "M";
	} else if (value >= 1000) {
		return (value / 1000).toFixed(0) + "K";
	}
	return value;
}

const GraficoValorConsolidado = ({ GrafValorConsolidado }) => {
	// Filtra dados a partir de setembro de 2021
	const filteredData = GrafValorConsolidado.filter((repasses) => {
		const [ano, mes] = repasses.codigo.split(".");
		const mesNumerico = Number.parseInt(mes.substring(1)); // Converte o mês em número
		return Number(ano) > 2021 || (Number(ano) === 2021 && mesNumerico >= 9); // Compara o mês como número
	});

	const somaPorMes = {};

	filteredData.forEach((repasses) => {
		const [ano, mes] = repasses.codigo.split(".");
		const chave = `${obterMesAbreviado(mes)} ${ano}`;
		somaPorMes[chave] = (somaPorMes[chave] || 0) + repasses.pagamento_total;
	});

	// Extrair os meses formatados e valores das somas
	const mesesFormatados = Object.keys(somaPorMes);
	const valores = Object.values(somaPorMes);

	function obterMesAbreviado(mes) {
		switch (mes) {
			case "M1":
				return "Jan";
			case "M2":
				return "Fev";
			case "M3":
				return "Mar";
			case "M4":
				return "Abr";
			case "M5":
				return "Mai";
			case "M6":
				return "Jun";
			case "M7":
				return "Jul";
			case "M8":
				return "Ago";
			case "M9":
				return "Set";
			case "M10":
				return "Out";
			case "M11":
				return "Nov";
			case "M12":
				return "Dez";
			default:
				return mes;
		}
	}

	const option = {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
		},
		legend: {
			y: "-5",
		},
		grid: {
			left: "1%",
			right: "0%",
			bottom: "0%",
			containLabel: true,
		},
		xAxis: [
			{
				type: "category",
				data: mesesFormatados,
				axisLabel: {
					rotate: 40,
					interval: 0,
				},
			},
		],
		yAxis: [
			{
				type: "value",
				splitLine: {
					show: false,
				},
				axisLabel: {
					formatter: formatar,
				},
			},
		],
		series: [
			{
				name: "Pagamento total",
				type: "bar",
				stack: "Ad",
				itemStyle: {
					color: "#2EB280",
				},
				data: valores,
				label: {
					show: false,
					position: "insideTop",
				},
			},
		],
	};

	if (mesesFormatados.length > 0) {
		return (
			<ReactEcharts
				option={option}
				style={{ width: "100%", height: "500px" }}
			/>
		);
	} else {
		return <Spinner />;
	}
};

export default GraficoValorConsolidado;

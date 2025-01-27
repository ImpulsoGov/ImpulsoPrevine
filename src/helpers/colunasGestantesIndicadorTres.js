import identificacaoAtendimentoOdontologico from "../data/identificacao_atendimento_odontologico.json" assert {
	type: "json",
};

const formatarNome = ({ value }) => {
	const name = {
		width: "100%",
		padding: "20px",
	};
	return <div style={name}>{value}</div>;
};
const DDP_STYLE = (param) => {
	const block = {
		backgroundColor: "#FFECEC",
		border: "1px solid #EF565D",
		borderRadius: "5px",
		color: "#EF565D",
		padding: "2px",
		fontWeight: 550,
		width: "fit-content",
		display: "flex",
		gap: "5px",
		alignItems: "center",
		justifyContent: "center",
		padding: "3px 10px",
	};
	return param.value ? (
		<div>{FormatarData(param)}</div>
	) : (
		<div style={block}>sem DUM</div>
	);
};
const FormatarData = (param) => {
	if (!param.value) return null;
	const parts = param.value.split("-");
	const dia = parts[2];
	const mes = parts[1];
	const ano = parts[0];
	const date = `${dia}/${mes}/${ano}`;
	return date;
};
const ATENDIMENTO_ODONTOLOGICO_STYLE = ({ value }) => {
	const styleNull = {
		width: "38px",
		height: "25px",
		padding: "3px",
		color: "#1F1F1F",
		backgroundColor: "#FFF",
		borderRadius: "5px",
		textAlign: "center",
		fontWeight: 500,
	};
	const block = {
		backgroundColor: "#FFECEC",
		border: "1px solid #EF565D",
		borderRadius: "5px",
		color: "#EF565D",
		padding: "2px",
		fontWeight: 550,
		width: "75px",
		display: "flex",
		gap: "5px",
		alignItems: "center",
		justifyContent: "center",
		padding: "3px 10px",
	};
	const check = {
		backgroundColor: "#E7FBF3",
		border: "1px solid #9DEECD",
		borderRadius: "5px",
		color: "#1D856C",
		padding: "2px",
		fontWeight: 550,
		width: "75px",
		display: "flex",
		gap: "5px",
		alignItems: "center",
		justifyContent: "center",
		padding: "3px 10px",
	};
	const checkSymbolStyle = {
		border: "2px solid #1D856C",
		borderRadius: "100%",
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "2px",
	};
	const blockSymbolStyle = {
		border: "2px solid #EF565D",
		borderRadius: "100%",
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "2px",
	};
	const style = {
		1: check,
		2: block,
		3: styleNull,
	};
	const descricao =
		identificacaoAtendimentoOdontologico.identificacao_atendimento_odontologico.find(
			(item) => item.id_atendimento_odontologico == value,
		).atendimento_odontologico_descricao;
	return (
		<div style={style[value]}>
			{value == 1 && <span style={checkSymbolStyle}>✔</span>}
			{value == 2 && <span style={blockSymbolStyle}>✖</span>}
			{descricao}
		</div>
	);
};
const REGISTRO_STYLE = ({ value }) => {
	if (value.toString() == "1") return "Sim";
	if (value.toString() == "2") return "Não";
};

const colunasGestantesIndicadorTres = [
	{
		align: "left",
		field: "cidadao_nome",
		headerAlign: "center",
		headerName: "NOME",
		renderCell: formatarNome,
		width: 320,
		sortable: false,
	},
	{
		align: "center",
		field: "gestacao_data_dpp",
		headerAlign: "center",
		headerName: "DPP + 14 DIAS",
		width: 100,
		sortable: false,
		renderCell: DDP_STYLE,
	},
	{
		align: "center",
		field: "id_atendimento_odontologico",
		headerAlign: "center",
		headerName: "ATENDIMENTO ODONTOLÓGICO",
		width: 120,
		sortable: false,
		renderCell: ATENDIMENTO_ODONTOLOGICO_STYLE,
	},
	{
		align: "center",
		field: "id_registro_parto",
		headerAlign: "center",
		headerName: "REGISTRO DE PARTO",
		width: 100,
		sortable: false,
		renderCell: REGISTRO_STYLE,
	},
	{
		align: "center",
		field: "equipe_nome",
		headerAlign: "center",
		headerName: "EQUIPE",
		width: 250,
		sortable: false,
	},
	{
		align: "center",
		field: "acs_nome",
		headerAlign: "center",
		headerName: "PROFISSIONAL RESPONSÁVEL",
		width: 300,
		sortable: false,
	},
];

export { colunasGestantesIndicadorTres };

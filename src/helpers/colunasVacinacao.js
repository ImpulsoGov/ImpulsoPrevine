const esquemaCompleto = "https://media.graphassets.com/wOzzseVhRriXENS9OhcG";
const doseAplicada = "https://media.graphassets.com/QrINNoP2RUy0mgQZnLE6";
const doseNaoAplicada = "https://media.graphassets.com/Xoe3jutQHm7KJbJ9CeD4";
const esquemaEmAndamento = "https://media.graphassets.com/Psuwuj7pS1agRqB7Is5H";
const doseEmAtraso = "https://media.graphassets.com/neGWWuEyTF6RLagu7nIU";
const esquemaNaoIniciado = "https://media.graphassets.com/OEg0Ik1ITqO9yqRT4fnd";
const esquemaEmAtraso = "https://media.graphassets.com/bEpC7MYaTwmBj5A7V363";

const formatarNome = ({ value }) => {
	const name = {
		width: "100%",
		padding: "20px",
		textAlign: "center",
	};
	return <div style={name}>{value}</div>;
};
const idadeStyle = ({ value }) => {
	return (
		<div
			style={{
				width: "100%",
				textAlign: "right",
			}}
		>
			{value + " meses"}
		</div>
	);
};
const cpfStyle = ({ value }) => {
	return (
		<div
			style={{
				width: "100%",
				textAlign: "right",
			}}
		>
			{value}
		</div>
	);
};
const STYLE_DOSES_POLIO = (value, colorCode) => {
	const block = {
		backgroundColor: "#FFECEC",
		border: "1px solid #F8BBAE",
		borderRadius: "5px",
		color: "#EF565D",
		padding: "2px",
		fontWeight: 550,
		width: "130px",
		display: "flex",
		gap: "5px",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "3px 10px",
	};
	const atencao = {
		backgroundColor: "#EFF5F9",
		border: "1px solid #A6B5BE",
		borderRadius: "5px",
		color: "#606E78",
		padding: "2px",
		fontWeight: 550,
		width: "130px",
		display: "flex",
		gap: "5px",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "3px 10px",
	};
	const check = {
		backgroundColor: "#E7FBF3",
		border: "1px solid #9DEECD",
		borderRadius: "5px",
		color: "#1D856C",
		padding: "2px",
		fontWeight: 550,
		width: "130px",
		display: "flex",
		gap: "5px",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "3px 10px",
	};
	const atencaoSymbolStyle = {
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "2px",
		paddingLeft: "2px",
	};
	const checkSymbolStyle = {
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
		1: atencao,
		2: check,
		3: block,
	};
	return (
		<div style={style[colorCode]}>
			{colorCode == 1 && (
				<span style={atencaoSymbolStyle}>
					<img src={doseNaoAplicada} width={16} height={16}></img>
				</span>
			)}
			{colorCode == 2 && (
				<span style={checkSymbolStyle}>
					<img src={doseAplicada} width={16} height={16}></img>
				</span>
			)}
			{colorCode == 3 && (
				<span style={blockSymbolStyle}>
					<img src={doseEmAtraso} width={16} height={16}></img>
				</span>
			)}
			{FormatarData(value)}
		</div>
	);
};
const STYLE_DOSES_PENTA = (value, colorCode) => {
	const block = {
		backgroundColor: "#FFECEC",
		border: "1px solid #F8BBAE",
		borderRadius: "5px",
		color: "#EF565D",
		padding: "2px",
		fontWeight: 550,
		width: "130px",
		display: "flex",
		gap: "5px",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "3px 10px",
	};
	const atencao = {
		backgroundColor: "#EFF5F9",
		border: "1px solid #A6B5BE",
		borderRadius: "5px",
		color: "#606E78",
		padding: "2px",
		fontWeight: 550,
		width: "130px",
		display: "flex",
		gap: "5px",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "3px 10px",
	};
	const check = {
		backgroundColor: "#E7FBF3",
		border: "1px solid #9DEECD",
		borderRadius: "5px",
		color: "#1D856C",
		padding: "2px",
		fontWeight: 550,
		width: "130px",
		display: "flex",
		gap: "5px",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "3px 10px",
	};
	const atencaoSymbolStyle = {
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "2px",
		paddingLeft: "2px",
	};
	const checkSymbolStyle = {
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
		1: atencao,
		2: check,
		3: block,
	};
	return (
		<div style={style[colorCode]}>
			{colorCode == 1 && (
				<span style={atencaoSymbolStyle}>
					<img src={doseNaoAplicada} width={16} height={16}></img>
				</span>
			)}
			{colorCode == 2 && (
				<span style={checkSymbolStyle}>
					<img src={doseAplicada} width={16} height={16}></img>
				</span>
			)}
			{colorCode == 3 && (
				<span style={blockSymbolStyle}>
					<img src={doseEmAtraso} width={16} height={16}></img>
				</span>
			)}
			{FormatarData(value)}
		</div>
	);
};

const FormatarData = (value) => {
	if (!value) return null;
	const parts = value.split("-");
	const dia = parts[2];
	const mes = parts[1];
	const ano = parts[0];
	const date = `${dia}/${mes}/${ano}`;
	return date;
};
const STYLE_STATUS_POLIO = ({ value }) => {
	const atraso = {
		backgroundColor: "#FFECEC",
		border: "1px solid #F8BBAE",
		borderRadius: "5px",
		color: "#EF565D",
		padding: "4px",
		fontWeight: 550,
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	};
	const naoIniciado = {
		backgroundColor: "#EFF5F9",
		border: "1px solid #A6B5BE",
		borderRadius: "5px",
		color: "#606E78",
		padding: "4px",
		fontWeight: 550,
		width: "230px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	};

	const andamento = {
		backgroundColor: "#FFF0E1",
		border: "1px solid #F4CCAB",
		borderRadius: "5px",
		color: "#E98633",
		fontWeight: 550,
		gap: "5px",
		padding: "4px",
		width: "230px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
	const completo = {
		backgroundColor: "#E7FBF3",
		border: "1px solid #9DEECD",
		borderRadius: "5px",
		color: "#1D856C",
		fontWeight: 550,
		padding: "4px",
		width: "230px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
	const andamentoSymbolStyle = {
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
	const completoSymbolStyle = {
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "2px",
		marginRight: "4px",
	};
	const atrasoSymbolStyle = {
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "2px",
		marginRight: "4px",
	};
	const naoIniciadoSymbolStyle = {
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "2px",
		marginRight: "4px",
	};

	const style = {
		10: completo,
		20: andamento,
		30: atraso,
		40: naoIniciado,
	};
	const descricoes = {
		10: "Completo",
		20: "Em andamento",
		30: "Em atraso",
		40: "Não iniciado",
	};

	const descricao = descricoes[value];
	return (
		<div style={style[value]}>
			{value == 10 && (
				<span style={completoSymbolStyle}>
					<img src={esquemaCompleto} width={16} height={16}></img>
				</span>
			)}
			{value == 20 && (
				<span style={andamentoSymbolStyle}>
					<img src={esquemaEmAndamento} width={16} height={16}></img>
				</span>
			)}
			{value == 30 && (
				<span style={atrasoSymbolStyle}>
					<img src={esquemaEmAtraso} width={16} height={16}></img>
				</span>
			)}
			{value == 40 && (
				<span style={naoIniciadoSymbolStyle}>
					<img src={esquemaNaoIniciado} width={16} height={16}></img>
				</span>
			)}
			<div>{descricao}</div>
		</div>
	);
};
const STYLE_STATUS_PENTA = ({ value }) => {
	const atraso = {
		backgroundColor: "#FFECEC",
		border: "1px solid #F8BBAE",
		borderRadius: "5px",
		color: "#EF565D",
		padding: "4px",
		fontWeight: 550,
		width: "230px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	};
	const naoIniciado = {
		backgroundColor: "#EFF5F9",
		border: "1px solid #A6B5BE",
		borderRadius: "5px",
		color: "#606E78",
		padding: "4px",
		fontWeight: 550,
		width: "230px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	};

	const andamento = {
		backgroundColor: "#FFF0E1",
		border: "1px solid #F4CCAB",
		borderRadius: "5px",
		color: "#E98633",
		fontWeight: 550,
		gap: "5px",
		padding: "4px",
		width: "230px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
	const completo = {
		backgroundColor: "#E7FBF3",
		border: "1px solid #9DEECD",
		borderRadius: "5px",
		color: "#1D856C",
		fontWeight: 550,
		padding: "4px",
		width: "230px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
	const andamentoSymbolStyle = {
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
	const completoSymbolStyle = {
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "2px",
		marginRight: "4px",
	};
	const atrasoSymbolStyle = {
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "2px",
		marginRight: "4px",
	};
	const naoIniciadoSymbolStyle = {
		width: "18px",
		height: "18px",
		fontSize: "8px",
		fontWeight: "600",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "2px",
		marginRight: "4px",
	};

	const style = {
		1: completo,
		2: andamento,
		3: atraso,
		4: naoIniciado,
	};
	const descricoes = {
		1: "Completo",
		2: "Em andamento",
		3: "Em atraso",
		4: "Não iniciado",
	};

	const descricao = descricoes[value];
	return (
		<div style={style[value]}>
			{value == 1 && (
				<span style={completoSymbolStyle}>
					<img src={esquemaCompleto} width={16} height={16}></img>
				</span>
			)}
			{value == 2 && (
				<span style={andamentoSymbolStyle}>
					<img src={esquemaEmAndamento} width={16} height={16}></img>
				</span>
			)}
			{value == 3 && (
				<span style={atrasoSymbolStyle}>
					<img src={esquemaEmAtraso} width={16} height={16}></img>
				</span>
			)}
			{value == 4 && (
				<span style={naoIniciadoSymbolStyle}>
					<img src={esquemaNaoIniciado} width={16} height={16}></img>
				</span>
			)}
			<div>{descricao}</div>
		</div>
	);
};

const STYLE_1_DOSE_POLIO = (param) => {
	const value = param.row.data_ou_prazo_1dose_polio;
	const colorCode = param.row.id_cor_1dose_polio;
	return STYLE_DOSES_POLIO(value, colorCode);
};
const STYLE_2_DOSE_POLIO = (param) => {
	const value = param.row.data_ou_prazo_2dose_polio;
	const colorCode = param.row.id_cor_2dose_polio;
	return STYLE_DOSES_POLIO(value, colorCode);
};
const STYLE_3_DOSE_POLIO = (param) => {
	const value = param.row.data_ou_prazo_3dose_polio;
	const colorCode = param.row.id_cor_3dose_polio;
	return STYLE_DOSES_POLIO(value, colorCode);
};
const STYLE_1_DOSE_PENTA = (param) => {
	const value = param.row.data_ou_prazo_1dose_penta;
	const colorCode = param.row.id_cor_1dose_penta;
	return STYLE_DOSES_PENTA(value, colorCode);
};
const STYLE_2_DOSE_PENTA = (param) => {
	const value = param.row.data_ou_prazo_2dose_penta;
	const colorCode = param.row.id_cor_2dose_penta;
	return STYLE_DOSES_PENTA(value, colorCode);
};
const STYLE_3_DOSE_PENTA = (param) => {
	const value = param.row.data_ou_prazo_3dose_penta;
	const colorCode = param.row.id_cor_3dose_penta;
	return STYLE_DOSES_PENTA(value, colorCode);
};

const colunasVacinacaoEquipe = [
	{
		align: "left",
		field: "cidadao_nome",
		headerAlign: "center",
		headerName: "NOME DA CRIANÇA",
		width: 320,
		sortable: false,
		renderCell: formatarNome,
	},
	{
		align: "center",
		field: "cidadao_cpf_dt_nascimento",
		headerName: "CPF / DATA DE NASCIMENTO",
		align: "center",
		width: 140,
		sortable: false,
		renderCell: cpfStyle,
	},
	{
		align: "center",
		field: "cidadao_idade_meses",
		headerAlign: "center",
		headerName: "IDADE (MESES)",
		renderCell: idadeStyle,
		width: 100,
		sortable: false,
	},
	{
		align: "center",
		field: "id_status_polio",
		headerAlign: "center",
		headerName: "STATUS DO ESQUEMA POLIOMIELITE",
		width: 250,
		sortable: false,
		renderCell: STYLE_STATUS_POLIO,
	},
	{
		align: "center",
		field: "data_ou_prazo_1dose_polio",
		headerAlign: "center",
		headerName: "1ª DOSE POLIO",
		width: 150,
		sortable: false,
		renderCell: STYLE_1_DOSE_POLIO,
	},
	{
		align: "center",
		field: "data_ou_prazo_2dose_polio",
		headerAlign: "center",
		headerName: "2ª DOSE POLIO",
		width: 150,
		sortable: false,
		renderCell: STYLE_2_DOSE_POLIO,
	},
	{
		align: "center",
		field: "data_ou_prazo_3dose_polio",
		headerAlign: "center",
		headerName: "3ª DOSE POLIO",
		width: 150,
		sortable: false,
		renderCell: STYLE_3_DOSE_POLIO,
	},
	{
		align: "center",
		field: "id_status_penta",
		headerAlign: "center",
		headerName: "STATUS DO ESQUEMA PENTAVALENTE",
		width: 250,
		sortable: false,
		renderCell: STYLE_STATUS_PENTA,
	},
	{
		align: "center",
		field: "data_ou_prazo_1dose_penta",
		headerAlign: "center",
		headerName: "1ª DOSE PENTA",
		width: 150,
		sortable: false,
		renderCell: STYLE_1_DOSE_PENTA,
	},
	{
		align: "center",
		field: "data_ou_prazo_2dose_penta",
		headerAlign: "center",
		headerName: "2ª DOSE PENTA",
		width: 150,
		sortable: false,
		renderCell: STYLE_2_DOSE_PENTA,
	},
	{
		align: "center",
		field: "data_ou_prazo_3dose_penta",
		headerAlign: "center",
		headerName: "3ª DOSE PENTA",
		width: 150,
		sortable: false,
		renderCell: STYLE_3_DOSE_PENTA,
	},
	{
		align: "left",
		field: "cidadao_nome_responsavel",
		headerAlign: "center",
		headerName: "NOME DO RESPONSÁVEL FAMILIAR",
		align: "center",
		width: 320,
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

const colunasVacinacaoAPS = [
	{
		align: "left",
		field: "cidadao_nome",
		headerAlign: "center",
		headerName: "NOME DA CRIANÇA",
		width: 320,
		sortable: false,
		renderCell: formatarNome,
	},
	{
		align: "center",
		field: "cidadao_cpf_dt_nascimento",
		headerName: "CPF / DATA DE NASCIMENTO",
		align: "center",
		width: 140,
		sortable: false,
		renderCell: cpfStyle,
	},
	{
		align: "center",
		field: "cidadao_idade_meses",
		headerAlign: "center",
		headerName: "IDADE (MESES)",
		renderCell: idadeStyle,
		width: 100,
		sortable: false,
	},
	{
		align: "center",
		field: "id_status_polio",
		headerAlign: "center",
		headerName: "STATUS DO ESQUEMA POLIOMIELITE",
		width: 250,
		sortable: false,
		renderCell: STYLE_STATUS_POLIO,
	},
	{
		align: "center",
		field: "data_ou_prazo_1dose_polio",
		headerAlign: "center",
		headerName: "1ª DOSE POLIO",
		width: 150,
		sortable: false,
		renderCell: STYLE_1_DOSE_POLIO,
	},
	{
		align: "center",
		field: "data_ou_prazo_2dose_polio",
		headerAlign: "center",
		headerName: "2ª DOSE POLIO",
		width: 150,
		sortable: false,
		renderCell: STYLE_2_DOSE_POLIO,
	},
	{
		align: "center",
		field: "data_ou_prazo_3dose_polio",
		headerAlign: "center",
		headerName: "3ª DOSE POLIO",
		width: 150,
		sortable: false,
		renderCell: STYLE_3_DOSE_POLIO,
	},
	{
		align: "center",
		field: "id_status_penta",
		headerAlign: "center",
		headerName: "STATUS DO ESQUEMA PENTAVALENTE",
		width: 250,
		sortable: false,
		renderCell: STYLE_STATUS_PENTA,
	},
	{
		align: "center",
		field: "data_ou_prazo_1dose_penta",
		headerAlign: "center",
		headerName: "1ª DOSE PENTA",
		width: 150,
		sortable: false,
		renderCell: STYLE_1_DOSE_PENTA,
	},
	{
		align: "center",
		field: "data_ou_prazo_2dose_penta",
		headerAlign: "center",
		headerName: "2ª DOSE PENTA",
		width: 150,
		sortable: false,
		renderCell: STYLE_2_DOSE_PENTA,
	},
	{
		align: "center",
		field: "data_ou_prazo_3dose_penta",
		headerAlign: "center",
		headerName: "3ª DOSE PENTA",
		width: 150,
		sortable: false,
		renderCell: STYLE_3_DOSE_PENTA,
	},
	{
		align: "left",
		field: "cidadao_nome_responsavel",
		headerAlign: "center",
		headerName: "NOME DO RESPONSÁVEL FAMILIAR",
		align: "center",
		width: 320,
		sortable: false,
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

export { colunasVacinacaoEquipe, colunasVacinacaoAPS };

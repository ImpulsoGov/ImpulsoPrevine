const formatar_nome = ({ value }) => {
	const name = {
		width: "100%",
		padding: "20px",
	};
	return <div style={name}>{value}</div>;
};

const colunasPainelTrilha = [
	{
		align: "left",
		field: "municipio",
		headerAlign: "center",
		headerName: "Municipio",
		renderCell: formatar_nome,
		width: 300,
	},
	{
		align: "center",
		field: "usuarios",
		headerAlign: "center",
		headerName: "Usuarios",
		width: 90,
	},
	{
		align: "center",
		field: "usuarios_perfil_capacitacao",
		headerAlign: "center",
		headerName: "Perfil Capacitação",
		width: 120,
	},
	{
		align: "center",
		field: "usuarios_trilha_cito",
		headerAlign: "center",
		headerName: "Trilha Citopatológico",
		width: 120,
	},
	{
		align: "center",
		field: "usuarios_trilha_cronicos",
		headerAlign: "center",
		headerName: "Trilha Cronicos",
		width: 120,
	},
];

export { colunasPainelTrilha };

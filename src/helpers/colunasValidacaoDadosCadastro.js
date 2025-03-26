const formatarNome = ({ value }) => {
    const name = {
        width: "100%",
        padding: "20px",
    };

    return <div style={name}>{value}</div>;
};

const formatarValidacao = ({ value }) => {
    return value ? (
        <div style={{ color: "green" }}>✔</div>
    ) : (
        <div style={{ color: "red" }}>✖</div>
    );
};

const colunasValidacaoDadosCadastro = [
    {
        align: "left",
        field: "usuario",
        headerAlign: "center",
        headerName: "Usuário",
        renderCell: formatarNome,
        width: 300,
    },
    {
        align: "center",
        field: "nome",
        headerAlign: "center",
        headerName: "Nome",
        width: 90,
        renderCell: formatarValidacao,
    },
    {
        align: "center",
        field: "cpf",
        headerAlign: "center",
        headerName: "CPF",
        width: 90,
        renderCell: formatarValidacao,
    },
    {
        align: "center",
        field: "mail",
        headerAlign: "center",
        headerName: "E-mail",
        width: 90,
        renderCell: formatarValidacao,
    },
    {
        align: "center",
        field: "equipe",
        headerAlign: "center",
        headerName: "Equipe",
        width: 90,
        renderCell: formatarValidacao,
    },
    {
        align: "center",
        field: "municipio_uf",
        headerAlign: "center",
        headerName: "Municipio - UF",
        width: 120,
        renderCell: formatarValidacao,
    },
    {
        align: "center",
        field: "cargo",
        headerAlign: "center",
        headerName: "Cargo",
        width: 90,
        renderCell: formatarValidacao,
    },
    {
        align: "center",
        field: "telefone",
        headerAlign: "center",
        headerName: "Telefone",
        width: 100,
        renderCell: formatarValidacao,
    },
    {
        align: "center",
        field: "whatsapp",
        headerAlign: "center",
        headerName: "Whatsapp",
        width: 90,
        renderCell: formatarValidacao,
    },
    {
        align: "center",
        field: "perfil",
        headerAlign: "center",
        headerName: "Perfil",
        width: 90,
        renderCell: formatarValidacao,
    },
];

export { colunasValidacaoDadosCadastro };

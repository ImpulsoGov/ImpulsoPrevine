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

const colunasValidacaoRequsicoes = [
    {
        align: "left",
        field: "usuario",
        headerAlign: "center",
        headerName: "Usuário",
        renderCell: formatarNome,
        flex: 150,
    },
    {
        align: "center",
        field: "success",
        headerAlign: "center",
        headerName: "Requisição",
        flex: 90,
        renderCell: formatarValidacao,
    },
    {
        align: "center",
        field: "mensagem",
        headerAlign: "center",
        headerName: "Mensagem",
        flex: 250,
    },
];

export { colunasValidacaoRequsicoes };

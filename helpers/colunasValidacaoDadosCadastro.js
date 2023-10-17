const PrazoProximaConsultaStyle = ({value})=> {
    const emDia = {
        backgroundColor: "#E7FBF3",
        border: "1px solid #9DEECD",
        borderRadius: "5px",
        color: "#1D856C",
        padding: "2px",
        fontWeight : 550,
    }
    const prazo = {
        backgroundColor: "#FFF0E1",
        border: "1px solid #F4CCAB",
        borderRadius: "5px",
        color: "#E98633",
        padding: "2px",
        fontWeight : 550,
    }
    const style = (value=="Em dia") ? emDia : prazo
    return <div style={style}>{value}</div>
}
const formatar_nome = ({value})=>{
    const name = {
      width : '100%',
      padding : '20px'
    }
    return <div style={name}>{value}</div>
}
const formatar_validacao = ({value})=>{
    return value ?
    <div style={{color : 'green'}}>✔</div> : 
    <div style={{color : 'red'}}>✖</div>
}
  
  
  const colunasValidacaoDadosCadastro = [
    {
      align: 'left',
      field: 'usuario',
      headerAlign: 'center',
      headerName: 'Usuário',
      renderCell : formatar_nome,
      width: 300
    },
    {
      align: 'center',
      field: 'nome',
      headerAlign: 'center',
      headerName: 'Nome',
      width: 90,
      renderCell : formatar_validacao
    },
    {
      align: 'center',
      field: 'cpf',
      headerAlign: 'center',
      headerName: 'CPF',
      width: 90,
      renderCell : formatar_validacao
    },
    {
      align: 'center',
      field: 'mail',
      headerAlign: 'center',
      headerName: 'E-mail',
      width: 90,
      renderCell : formatar_validacao
    },
    {
      align: 'center',
      field: 'equipe',
      headerAlign: 'center',
      headerName: 'Equipe',
      width: 90,
      renderCell : formatar_validacao
    },
    {
      align: 'center',
      field: 'municipio_uf',
      headerAlign: 'center',
      headerName: 'Municipio - UF',
      width: 120,
      renderCell : formatar_validacao
    },
    {
      align: 'center',
      field: 'cargo',
      headerAlign: 'center',
      headerName: 'Cargo',
      width: 90,
      renderCell : formatar_validacao
    },
    {
        align: 'center',
        field: 'telefone',
        headerAlign: 'center',
        headerName: 'Telefone',
        width: 100,
        renderCell : formatar_validacao
    },
    {
        align: 'center',
        field: 'whatsapp',
        headerAlign: 'center',
        headerName: 'Whatsapp',
        width: 90,
        renderCell : formatar_validacao
    },
    {
        align: 'center',
        field: 'perfil',
        headerAlign: 'center',
        headerName: 'Perfil',
        width: 90,
        renderCell : formatar_validacao
    }

    ]
  
  export { colunasValidacaoDadosCadastro }
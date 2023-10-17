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
  
  
  const colunasValidacaoRequsicoes = [
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
      field: 'requisicao',
      headerAlign: 'center',
      headerName: 'Requisição',
      width: 90,
      renderCell : formatar_validacao
    },
    {
        align: 'center',
        field: 'erro',
        headerAlign: 'center',
        headerName: 'Erro',
        width: 250,
    },
]
  
  export { colunasValidacaoRequsicoes }
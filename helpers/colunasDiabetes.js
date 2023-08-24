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

const FormatarData = (str)=>{
  if(!str.value) return null
  const parts = str.value.split('-');
  const dia = parts[2];
  const mes = parts[1];
  const ano = parts[0];
  const date = `${dia}/${mes}/${ano}`
  return date
}
const FormatarDataNascimento = (str)=>{ 
  const parts = str.value.split('-');
  const dia = parts[2];
  const mes = parts[1];
  const ano = parts[0];
  const date = `${dia}/${mes}/${ano}`
  return str.value.includes('-') ?  date : str.value
}
const formatar_nome = ({value})=>{
  const name = {
    width : '100%',
    padding : '20px'
  }
  return <div style={name}>{value}</div>
}


const colunasDiabetes = [
  {
    align: 'left',
    field: 'cidadao_nome',
    headerAlign: 'center',
    headerName: 'NOME',
    renderCell : formatar_nome,
    width: 240
  },
  {
    align: 'center',
    field: 'cidadao_cpf_dt_nascimento',
    headerAlign: 'center',
    headerName: 'CPF',
    renderCell : FormatarDataNascimento,
    width: 130
  },
  {
    align: 'center',
    field: 'identificacao_condicao_diabetes',
    headerAlign: 'center',
    headerName: 'IDENTIFICAÇÃO DA CONDIÇÃO',
    width: 150
  },
  {
    align: 'center',
    field: 'dt_ultima_consulta',
    headerAlign: 'center',
    headerName: 'DATA DA CONSULTA MAIS RECENTE',
    renderCell : FormatarData,
    width: 120
  },
  {
    align: 'center',
    field: 'prazo_proxima_consulta',
    headerAlign: 'center',
    headerName: 'PRAZO PARA PRÓXIMA CONSULTA',
    renderCell: PrazoProximaConsultaStyle,
    width: 130
  },
  {
    align: 'center',
    field: 'dt_solicitacao_hemoglobina_glicada_mais_recente',
    headerAlign: 'center',
    headerName: 'DATA DE SOLICITAÇÃO DE HEMOGLOBINA GLICADA MAIS RECENTE',
    renderCell : FormatarData,
    width: 180
  },
  {
    align: 'center',
    field: 'prazo_proxima_solicitacao_hemoglobina',
    headerAlign: 'center',
    headerName: 'PRAZO PARA PRÓXIMA SOLICITAÇÃO DE HEMOGLOBINA GLICADA',
    renderCell: PrazoProximaConsultaStyle,
    width: 180
  },
  {
    align: 'center',
    field: 'acs_nome_cadastro',
    headerAlign: 'center',
    headerName: 'ACS RESPONSÁVEL',
    width: 250
  }
]

export { colunasDiabetes }
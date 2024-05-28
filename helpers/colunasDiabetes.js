import * as icones from "../constants/icones";

const PrazoProximaConsultaStyle = ({value})=> {
  const emDia = {
      backgroundColor: "#E7FBF3",
      border: "1px solid #9DEECD",
      borderRadius: "5px",
      color: "#1D856C",
      padding: "3px 10px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      width: "150px",
  }
  const prazo = {
      backgroundColor: "#FFF0E1",
      border: "1px solid #F4CCAB",
      borderRadius: "5px",
      color: "#E98633",
      padding: "3px 10px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      width: "150px",
  }
  const style = (value=="Em dia") ? emDia : prazo
  const icone = (value == "Em dia") ? icones.VERIFICADO : icones.ATENCAO

  return (
    <div style={ style }>
      <img src={ icone } width={ 16 } height={ 16 } />
      <div>{ value }</div>
    </div>
  )
}

const FormatarData = (str)=>{
  if(!str) return null
  const parts = str.split('-');
  const dia = parts[2];
  const mes = parts[1];
  const ano = parts[0];
  const ano2Digitos = ano.slice(-2);
  const date = `${dia}/${mes}/${ano2Digitos}`
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

const exibirTagDataAusente = (texto) => {
  const estiloTag = {
    borderRadius: "5px",
    border: "1px solid #A6B5BE",
    color: "#606E78",
    fontWeight: "600",
    display: "flex",
    padding: "3px 10px",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    width: "150px"
  };

  return (
    <div style={ estiloTag }>
      <img src={ icones.AMPULHETA } width={ 16 } height={ 16 } />
      <div>{ texto }</div>
    </div>
  );
};

const tratarData = ({ value: data }) => data ? FormatarData(data) : exibirTagDataAusente("Não realizada");

const colunasDiabetes = [
  {
    align: 'left',
    field: 'cidadao_nome',
    headerAlign: 'center',
    headerName: 'NOME',
    renderCell : formatar_nome,
    width: 240,
    sortable : false
  },
  {
    align: 'center',
    field: 'cidadao_cpf_dt_nascimento',
    headerAlign: 'center',
    headerName: 'CPF/DATA DE NASCIMENTO',
    renderCell : FormatarDataNascimento,
    width: 130,
    sortable : false
  },
  {
    align: 'center',
    field: 'identificacao_condicao_diabetes',
    headerAlign: 'center',
    headerName: 'TIPO DE DIAGNÓSTICO',
    width: 150,
    sortable : false
  },
  {
    align: 'center',
    field: 'cidadao_idade',
    headerAlign: 'center',
    headerName: 'IDADE (ANOS)',
    width: 70,
    sortable: false
  },
  {
    align: 'center',
    field: 'dt_consulta_mais_recente',
    headerAlign: 'center',
    headerName: 'DATA DA ÚLTIMA CONSULTA',
    renderCell : tratarData,
    width: 180,
    sortable : false
  },
  {
    align: 'center',
    field: 'prazo_proxima_consulta',
    headerAlign: 'center',
    headerName: 'PRAZO PARA PRÓXIMA CONSULTA',
    renderCell: PrazoProximaConsultaStyle,
    width: 180,
    sortable : false
  },
  {
    align: 'center',
    field: 'dt_solicitacao_hemoglobina_glicada_mais_recente',
    headerAlign: 'center',
    headerName: 'DATA DA ÚLTIMA SOLICITAÇÃO DE HEMOGLOBINA GLICADA',
    renderCell : tratarData,
    width: 180,
    sortable : false
  },
  {
    align: 'center',
    field: 'prazo_proxima_solicitacao_hemoglobina',
    headerAlign: 'center',
    headerName: 'PRAZO PARA PRÓXIMA SOLICITAÇÃO DE HEMOGLOBINA GLICADA',
    renderCell: PrazoProximaConsultaStyle,
    width: 180,
    sortable : false
  },
  {
    align: 'center',
    field: 'acs_nome_cadastro',
    headerAlign: 'center',
    headerName: 'PROFISSIONAL RESPONSÁVEL',
    width: 250,
    sortable : false
  }
]

export { colunasDiabetes }
import status_usuario_descricao from "../data/StatusAcompanhamento.json" assert { type: 'json' };

const selecionar_status_usuario_descricao = ({value})=> {
    const alert = {
      backgroundColor: "#FFECEC",
      border: "1px solid #F8BBAE",
      borderRadius: "5px",
      color: "#EF565D",
      padding: "2px",
      fontWeight : 550,
      width : "90%",
      display : "flex",
      gap : "5px",
      alignItems: "center",
      justifyContent : "center",
      padding : "3px 10px"
    }
    const atencao = {
      backgroundColor: "#FFF0E1",
      border: "1px solid #F4CCAB",
      borderRadius: "5px",
      color: "#E98633",
      padding: "2px",
      fontWeight : 550,
      width : "fit-content",
      display : "flex",
      gap : "5px",
      alignItems: "center",
      justifyContent : "center",
      padding : "3px 10px"
    }
    const check = {
        backgroundColor: "#E7FBF3",
        border: "1px solid #9DEECD",
        borderRadius: "5px",
        color: "#1D856C",
        padding: "2px",
        fontWeight : 550,
        width : "fit-content",
        display : "flex",
        gap : "5px",
        alignItems: "center",
        justifyContent : "center",
        padding : "3px 10px"
      }
  
    const styleStatus = {
      12 : check,  
      13 : alert,
      14 : alert,
      15 : atencao,
      16 : alert
    }
    const alertSymbolStyle = {
      border: "2px solid #EF565D",
      borderRadius : "100%",
      width : "18px",
      height : "18px",
      fontSize : "8px",
      fontWeight : "600",
      display : "flex",
      alignItems: "center",
      justifyContent : "center"
    }
    const atencaoSymbolStyle = {
      border: "2px solid #E98633",
      borderRadius : "100%",
      width : "18px",
      height : "18px",
      fontSize : "8px",
      fontWeight : "600",
      display : "flex",
      alignItems: "center",
      justifyContent : "center"
    }
    const checkSymbolStyle = {
        border: "2px solid #1D856C",
        borderRadius : "100%",
        width : "18px",
        height : "18px",
        fontSize : "8px",
        fontWeight : "600",
        display : "flex",
        alignItems: "center",
        justifyContent : "center"
      }
  
    const descricao = status_usuario_descricao.data.find(item => item?.id_status_usuario == value)?.status_usuario_descricao
    return <div style={styleStatus[value]}> 
      {[13,14,16].includes(value) &&  <span style={alertSymbolStyle}>✖</span>} 
      {[15].includes(value) &&  <span style={atencaoSymbolStyle}>!</span>} 
      {[12].includes(value) &&  <span style={checkSymbolStyle}>✔</span>} 
      <span>{descricao}</span>
      </div>
}
  
const prazoStyle = ({value})=>{
    const atencao = {
      backgroundColor: "#FFF0E1",
      border: "1px solid #F4CCAB",
      borderRadius: "5px",
      color: "#E98633",
      padding: "2px",
      fontWeight : 550,
      width : "fit-content",
      display : "flex",
      gap : "5px",
      alignItems: "center",
      justifyContent : "center",
      padding : "3px 10px"
    }
    const check = {
        backgroundColor: "#E7FBF3",
        border: "1px solid #9DEECD",
        borderRadius: "5px",
        color: "#1D856C",
        padding: "2px",
        fontWeight : 550,
        width : "fit-content",
        display : "flex",
        gap : "5px",
        alignItems: "center",
        justifyContent : "center",
        padding : "3px 10px"
      }
  
    const atencaoSymbolStyle = {
      border: "2px solid #E98633",
      borderRadius : "100%",
      width : "18px",
      height : "18px",
      fontSize : "8px",
      fontWeight : "600",
      display : "flex",
      alignItems: "center",
      justifyContent : "center"
    }
    const checkSymbolStyle = {
        border: "2px solid #1D856C",
        borderRadius : "100%",
        width : "18px",
        height : "18px",
        fontSize : "8px",
        fontWeight : "600",
        display : "flex",
        alignItems: "center",
        justifyContent : "center"
      }

    return <div style={value != "Em dia" ? atencao : check}>
        {value != "Em dia" && <span style={atencaoSymbolStyle}>!</span>} 
        {value == "Em dia" && <span style={checkSymbolStyle}>✔</span>} 
        {value}
        </div>
  
}

const formatar_nome = ({value})=>{
  const name = {
    width : '100%',
    padding : '20px'
  }
  return <div style={name}>{value}</div>
}
  

const colunasCito=[
    {
      align: 'left',
      field: 'paciente_nome',
      headerAlign: 'center',
      headerName: 'NOME',
      renderCell : formatar_nome,
      width: 320
    },
    {
      align: 'center',
      field: 'cidadao_cpf_dt_nascimento',
      headerAlign: 'center',
      headerName: 'CPF / DATA DE NASCIMENTO',
      width: 140
    },
    {
      align: 'center',
      field: 'id_status_usuario',
      headerAlign: 'center',
      headerName: 'STATUS DA COLETA',
      renderCell : selecionar_status_usuario_descricao,
      width: 300
    },
    {
      align: 'center',
      field: 'vencimento_da_coleta',
      headerAlign: 'center',
      headerName: 'VENCIMENTO DA COLETA',
      width: 105
    },
    {
      align: 'center',
      field: 'prazo_proxima_coleta',
      headerAlign: 'center',
      headerName: 'PRAZO PARA PRÓXIMA COLETA',
      renderCell: prazoStyle,
      width: 130
    },
    {
      align: 'center',
      field: 'idade',
      headerAlign: 'center',
      headerName: 'IDADE',
      width: 80
    },
    {
      align: 'center',
      field: 'acs_nome',
      headerAlign: 'center',
      headerName: 'PROFISSIONAL RESPONSÁVEL',
      width: 250
    }
  ]

export { colunasCito } 
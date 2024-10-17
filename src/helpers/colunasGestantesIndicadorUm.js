const formatar_nome = ({value})=>{
  const name = {
    width : '100%',
    padding : '20px'
  }
  return <div style={name}>{value}</div>
}
const DDP_STYLE = (param)=>{
  const block = {
    backgroundColor: "#FFECEC",
    border: "1px solid #EF565D",
    borderRadius: "5px",
    color: "#EF565D",
    padding: "2px",
    fontWeight : 550,
    width : "fit-content",
    display : "flex",
    gap : "5px",
    alignItems: "center",
    justifyContent : "center",
    padding : "3px 10px"
  }
  return param.value ? 
  <div>{FormatarData(param)}</div> :
  <div style={block}>sem DUM</div>
}
const IG_PRIMEIRA_CONSULTA_STYLE = (param)=>{
  const value = param.row.gestacao_idade_gestacional_primeiro_atendimento
  const IG_MENOR_12_SEM = {
    width : '38px',
    padding : '3px',
    color : '#1D856C',
    backgroundColor : '#E7FBF3',
    border : 'solid 1px #9DEECD',
    borderRadius: '5px',
    textAlign : 'center',
    fontWeight: 500
  }
  const IG_MAIOR_12_SEM = {
    width : '38px',
    padding : '3px',
    color : '#EF565D',
    backgroundColor : '#FFECEC',
    border : 'solid 1px #EF565D',
    borderRadius: '5px',
    textAlign : 'center',
    fontWeight: 500
  }
  const IG_NULL = {
    width : '38px',
    height : '25px',
    padding : '3px',
    color : '#1F1F1F',
    backgroundColor : '#FFF',
    borderRadius: '5px',
    textAlign : 'center',
    fontWeight: 500
  }
  let IG_STYLE
  if(value){
    IG_STYLE = Number(value)<=12 ? IG_MENOR_12_SEM : IG_MAIOR_12_SEM
  }else{
    IG_STYLE = IG_NULL
  }
  return <div style={IG_STYLE}>{value ? value : "-"}</div>
}
const TOTAL_CONSULTAS_VALIDAS_STYLE = (param)=>{
  let colorCode
  if(param.row.gestacao_idade_gestacional_primeiro_atendimento <= 12 && param.row.consultas_pre_natal_validas <= 5) colorCode = 1 //Laranja
  if(param.row.gestacao_idade_gestacional_primeiro_atendimento > 12) colorCode = 2 //Vermelho
  if(param.row.gestacao_idade_gestacional_primeiro_atendimento <= 12 && param.row.consultas_pre_natal_validas >= 6) colorCode = 3 //verde
  if(!param.row.consultas_pre_natal_validas) colorCode = 0 //Branco
  const value = param.row.consultas_pre_natal_validas
  const STYLE_NULL = {
    width : '38px',
    height : '25px',
    padding : '3px',
    color : '#1F1F1F',
    backgroundColor : '#FFF',
    borderRadius: '5px',
    textAlign : 'center',
    fontWeight: 500
  }
  const block = {
    backgroundColor: "#FFECEC",
    border: "1px solid #EF565D",
    borderRadius: "5px",
    color: "#EF565D",
    fontWeight : 550,
    width : "65px",
    display : "flex",
    gap : "5px",
    alignItems: "center",
    justifyContent : "space-between",
    padding : "3px 10px"
  }
  const atencao = {
    backgroundColor: "#FFF0E1",
    border: "1px solid #F4CCAB",
    borderRadius: "5px",
    color: "#E98633",
    padding: "2px",
    fontWeight : 550,
    width : "65px",
    display : "flex",
    gap : "5px",
    alignItems: "center",
    justifyContent : "space-between",
    padding : "3px 10px"
  }
  const check = {
    backgroundColor: "#E7FBF3",
    border: "1px solid #9DEECD",
    borderRadius: "5px",
    color: "#1D856C",
    padding: "2px",
    fontWeight : 550,
    width : "65px",
    display : "flex",
    gap : "5px",
    alignItems: "center",
    justifyContent : "space-between",
    padding : "3px 10px"
  }
  const atencaoSymbolStyle = {
    border: "2px solid #F4CCAB",
    borderRadius : "100%",
    width : "18px",
    height : "18px",
    fontSize : "8px",
    fontWeight : "600",
    display : "flex",
    alignItems: "center",
    justifyContent : "center",
    paddingTop : "2px",
    paddingLeft : "2px"
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
      justifyContent : "center",
      paddingTop : "2px"
  }
  const blockSymbolStyle = {
    border: "2px solid #EF565D",
    borderRadius : "100%",
    width : "18px",
    height : "18px",
    fontSize : "8px",
    fontWeight : "600",
    display : "flex",
    alignItems: "center",
    justifyContent : "center",
    paddingTop : "2px"
  }

  const style = {
    0 : STYLE_NULL,
    1 : atencao,
    2 : block,
    3 : check
  }
  return <div style={style[colorCode]}>
      {(colorCode == 0) && <span>-</span>} 
      {(colorCode == 1) && <span style={atencaoSymbolStyle}>!</span>} 
      {colorCode == 2 && <span style={blockSymbolStyle}>✖</span>} 
      {colorCode == 3 && <span style={checkSymbolStyle}>✔</span>} 
      {value}
      </div>
}
const FormatarData = (param)=>{
  if(!param.value) return null
  const parts = param.value.split('-');
  const dia = parts[2];
  const mes = parts[1];
  const ano = parts[0];
  const date = `${dia}/${mes}/${ano}`
  return date
}
const REGISTRO_STYLE = ({value})=>{
  if(value.toString()=='1') return "Sim"
  if(value.toString()=='2') return "Não"
}
const colunasGestantesIndicadorUm=[
    {
      align: 'left',
      field: 'cidadao_nome',
      headerAlign: 'center',
      headerName: 'NOME',
      renderCell : formatar_nome,
      width: 320,
      sortable : false
    },
    {
      align: 'center',
      field: 'gestacao_data_dpp',
      headerAlign: 'center',
      headerName: 'DPP + 14 DIAS',
      width: 130,
      sortable : false,
      renderCell : DDP_STYLE
    },
    {
      align: 'center',
      field: 'gestacao_idade_gestacional_primeiro_atendimento',
      headerAlign: 'center',
      headerName: 'IG (1ª CONSULTA)',
      width: 90,
      sortable : false,
      renderCell : IG_PRIMEIRA_CONSULTA_STYLE,

    },
    {
      align: 'center',
      field: 'consultas_pre_natal_validas',
      headerAlign: 'center',
      headerName: 'TOTAL DE CONSULTAS VALIDAS',
      width: 100,
      sortable : false,
      renderCell : TOTAL_CONSULTAS_VALIDAS_STYLE
    },
    {
      align: 'center',
      field: 'id_registro_parto',
      headerAlign: 'center',
      headerName: 'REGISTRO DE PARTO',
      width: 100,
      sortable : false,
      renderCell : REGISTRO_STYLE
    },
    {
      align: 'center',
      field: 'equipe_nome',
      headerAlign: 'center',
      headerName: 'EQUIPE',
      width: 250,
      sortable : false
    },
    {
      align: 'center',
      field: 'acs_nome',
      headerAlign: 'center',
      headerName: 'PROFISSIONAL RESPONSÁVEL',
      width: 250,
      sortable : false
    },
      
  ]

export { colunasGestantesIndicadorUm } 
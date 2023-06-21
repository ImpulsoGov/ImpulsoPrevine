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


const colunasDiabetes = [
    {
      align: 'left',
      field: 'cidadao_nome',
      headerAlign: 'center',
      headerName: 'NOME',
      width: 240
    },
    {
      align: 'center',
      field: 'cidadao_cpf',
      headerAlign: 'center',
      headerName: 'CPF',
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
      headerName: 'DATA DA AFERIÇÃO DE PA MAIS RECENTE',
      width: 130
    },
    {
      align: 'center',
      field: 'prazo_proxima_solicitacao_hemoglobina',
      headerAlign: 'center',
      headerName: 'PRAZO PARA PRÓXIMA AFERIÇÃO DE PA',
      renderCell: PrazoProximaConsultaStyle,
      width: 130
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
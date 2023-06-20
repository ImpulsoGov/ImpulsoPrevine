const colunasHipertensao = [
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
      field: 'identificacao_condicao_hipertensao',
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
      renderCell: () => {},
      width: 130
    },
    {
      align: 'center',
      field: 'dt_afericao_pressao_mais_recente',
      headerAlign: 'center',
      headerName: 'DATA DA AFERIÇÃO DE PA MAIS RECENTE',
      width: 130
    },
    {
      align: 'center',
      field: 'prazo_proxima_afericao_pa',
      headerAlign: 'center',
      headerName: 'PRAZO PARA PRÓXIMA AFERIÇÃO DE PA',
      renderCell: function noRefCheck() {},
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

export { colunasHipertensao }
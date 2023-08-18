const filtrarPorPeriodoCodigo = (dados, periodoSelecionado) => {
  const periodoFiltrar = periodoSelecionado || '2023.Q1';

  return dados.filter(item => item.periodo_codigo === periodoFiltrar);
};

export {filtrarPorPeriodoCodigo}
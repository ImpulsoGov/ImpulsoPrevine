const filtrarPorPeriodoCodigo = (dados, periodoSelecionado) => {
  if (!periodoSelecionado) {
    // Encontra o último período existente nos dados
    const ultimosPeriodos = dados.map(item => item.periodo_codigo);
    ultimosPeriodos.sort(); // Classificar os períodos em ordem
    periodoSelecionado = ultimosPeriodos[ultimosPeriodos.length - 1];
  }

  return dados.filter(item => item.periodo_codigo === periodoSelecionado);
};

export {filtrarPorPeriodoCodigo}
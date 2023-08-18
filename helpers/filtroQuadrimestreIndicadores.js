const filtrarPorPeriodoCodigo = (dados, periodoSelecionado) => {
  if (!periodoSelecionado) {
    // Encontre o último período existente nos dados
    const ultimosPeriodos = dados.map(item => item.periodo_codigo);
    periodoSelecionado = ultimosPeriodos[ultimosPeriodos.length - 1];
  }

  return dados.filter(item => item.periodo_codigo === periodoSelecionado);
};

export {filtrarPorPeriodoCodigo}
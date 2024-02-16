const PRIMEIRO_QUADRIMESTRE_DO_ANO = 1;
const ULTIMO_QUADRIMESTRE_DO_ANO = 3;
const QUANTIDADE_PADRAO_PROXIMOS_QUADRIMESTRES = 3;

export const obterDadosQuadrimestre = (data) => {
  const objetoDeData = new Date(data);
  const mes = objetoDeData.getUTCMonth() + 1; // ? +1 pra ficar de 1 a 12
  const ano = String(objetoDeData.getUTCFullYear());
  const quadrimestre = String(Math.ceil(mes / 4));
  return {
    quadrimestre,
    ano,
  };
};

export const obterDadosProximosQuadrimestres = (dataBase, quantidade = QUANTIDADE_PADRAO_PROXIMOS_QUADRIMESTRES) => {
  let iteracao = quantidade;
  const proximosQuadrimestres = [];

  while (iteracao > 0) {
    const dadosUltimoQuadrimestre = proximosQuadrimestres.length === 0
      ? obterDadosQuadrimestre(dataBase)
      : proximosQuadrimestres.at(-1);

    const proximoQuadrimestre = Number(dadosUltimoQuadrimestre.quadrimestre) + 1;

    const anoDoProximoQuadrimestre = String(
      proximoQuadrimestre > ULTIMO_QUADRIMESTRE_DO_ANO
        ? Number(dadosUltimoQuadrimestre.ano) + 1
        : dadosUltimoQuadrimestre.ano
    );

    proximosQuadrimestres.push({
      quadrimestre: String(
        proximoQuadrimestre > ULTIMO_QUADRIMESTRE_DO_ANO
          ? PRIMEIRO_QUADRIMESTRE_DO_ANO
          : proximoQuadrimestre
      ),
      ano: anoDoProximoQuadrimestre,
    });

    iteracao -= 1;
  }

  return proximosQuadrimestres;
};

export const formatarQuadrimestres = (quadrimestres, separador = '') => {
  const quadrisPorAno = quadrimestres.reduce((acc, { quadrimestre, ano }) => {
    const quadri = `Q${quadrimestre}`;

    acc[ano]
      ? acc[ano] = `${acc[ano]} + ${quadri}`
      : acc[ano] = quadri

    return acc;
  }, {});

  const quadrisFormatadosComAno = [];

  for (const ano in quadrisPorAno) {
    quadrisFormatadosComAno.push(`${quadrisPorAno[ano]}/${ano.slice(-2)}`)
  }

  return quadrisFormatadosComAno.join(separador);
};

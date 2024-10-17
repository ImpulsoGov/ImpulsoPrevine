const PRIMEIRO_QUADRIMESTRE_DO_ANO = 1;
const ULTIMO_QUADRIMESTRE_DO_ANO = 3;
const QUANTIDADE_PADRAO_PROXIMOS_QUADRIMESTRES = 3;

export const obterDadosQuadrimestre = (data : Date | string | number) => {
  const objetoDeData = typeof(data)=='string' || typeof(data)=='number' ? new Date(data) : data;
  const mes = objetoDeData.getMonth() + 1; // ? +1 pra ficar de 1 a 12
  const ano = String(objetoDeData.getFullYear());
  const quadrimestre = String(Math.ceil(mes / 4));
  return {
    quadrimestre,
    ano,
  };
};
interface QuadrimestreData {
  quadrimestre: string;
  ano: string;
}
export const obterDadosProximosQuadrimestres = (
  dataBase : Date | string | number,
  quantidade : number= QUANTIDADE_PADRAO_PROXIMOS_QUADRIMESTRES
) => {
  const proximosQuadrimestres : QuadrimestreData[] = [];

  for (let iteracao = quantidade; iteracao > 0; iteracao--) {
    const dadosUltimoQuadrimestre : QuadrimestreData = proximosQuadrimestres.length === 0
      ? obterDadosQuadrimestre(dataBase)
      : proximosQuadrimestres.at(-1) as QuadrimestreData;

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
  }

  return proximosQuadrimestres;
};

export const formatarQuadrimestres = (quadrimestres : any, separador = '') => {
  const quadrisPorAno = quadrimestres.reduce((acc : any, { quadrimestre, ano } : any) => {
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

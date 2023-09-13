import React from 'react';

const CardsIndicadores = ({ dataFromAPI }) => {
  // Verifique se dataFromAPI não é nulo ou não é um array
  if (!dataFromAPI || !Array.isArray(dataFromAPI)) {
    return null; // Retorne null ou outra representação vazia adequada
  }

  const mappedData = [
    {
      descricao: 'Tipologia',
      valor: dataFromAPI.municipio_tipologia,
    },
    {
      descricao: 'População IBGE (2020)',
      valor: dataFromAPI.municipio_populacao_2020,
    },
    {
      descricao: 'Nº total de equipes',
      valor: dataFromAPI.equipe_total,
    },
    {
      descricao: 'Parâmetro',
      valor: dataFromAPI.cadastro_parametro,
    },
    {
      descricao: 'Nº de cadastros das equipes válidas',
      valor: dataFromAPI.cadastros_equipes_validas,
    },
    {
      descricao: 'Nº de cadastros vulneráveis das equipes válidas',
      valor: dataFromAPI.cadastros_equipes_validas_com_ponderacao,
    },
  ];

  return mappedData;
};

export default CardsIndicadores;

import React from 'react';

const CardsIndicadores = ({ dataFromAPI }) => {
  // Verifique se os dadosFromAPI não são nulos
  if (!dataFromAPI || !Array.isArray(dataFromAPI)) {
    return []; 
  }

  const mappedData = [
    {
      descricao: 'Tipologia',
      valor: municipio_tipologia,
    },
    {
      descricao: 'População IBGE (2020)',
      valor: municipio_populacao_2020,
    },
    {
      descricao: 'Nº total de equipes',
      valor: equipe_total,
    },
    {
      descricao: 'Parâmetro',
      valor: cadastro_parametro,
    },
    {
      descricao: 'Nº de cadastros das equipes válidas',
      valor: cadastros_equipes_validas,
    },
    {
      descricao: 'Nº de cadastros vulneráveis das equipes válidas',
      valor: cadastros_equipes_validas_com_ponderacao,
    },
  ];

  return (
    <div>
      {mappedData.map((item, index) => (
        <div key={index}>
          <h3>{item.descricao}</h3>
          <p>{item.valor}</p>
        </div>
      ))}
    </div>
  );
};

export default CardsIndicadores;

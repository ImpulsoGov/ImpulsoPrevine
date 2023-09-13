import React from 'react';

const CardsIndicadores = ({ dataFromAPI }) => {
  
  const mappedData = [
    {
      descricao: 'Tipologia',
      valor: dataFromAPI.municipio_tipologia 
    },
    {
      descricao: 'População IBGE (2020)',
      valor: dataFromAPI.municipio_populacao_2020 
    },
    {
      descricao: 'Nº total de equipes',
      valor: dataFromAPI.equipe_total 
    },
    {
      descricao: 'Parâmetro',
      valor: dataFromAPI.cadastro_parametro 
    },
    {
      descricao: 'Nº de cadastros das equipes válidas',
      valor: dataFromAPI.cadastros_equipes_validas 
    },
    {
      descricao: 'Nº de cadastros vulneráveis das equipes válidas',
      valor: dataFromAPI.cadastros_equipes_validas_com_ponderacao 
    },
  ];

  const cards = mappedData.map((item, index) => (
    <div key={index}>
      <h3>{item.descricao}</h3>
      <p>{item.valor}</p>
    </div>
  ));

  return <div>{cards}</div>;
};

export default CardsIndicadores;
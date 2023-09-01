import React from 'react';
import styles from './MunicipioSelector.module.css';

const MunicipioSelector  = ({ municipios, onChange }) => {
  return (
    <div>
      <label htmlFor="municipio"></label>
      <select className={styles.municipio} onChange={onChange}>
        <option value="">Selecionar Município</option>
        {municipios.map((municipio, index) => (
          <option key={index} value={municipio.nome}>
              {municipio.nome} - {municipio.uf}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MunicipioSelector ;
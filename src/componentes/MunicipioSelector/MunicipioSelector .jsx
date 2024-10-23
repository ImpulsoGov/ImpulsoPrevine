import React from 'react';
import { SearchBar } from '@impulsogov/design-system/dist/SearchBar/SearchBar';
const MunicipioSelector = (props)=>{
    return(
      <div style={{marginLeft : '80px'}}>
      { 
        props.municipio &&
        <SearchBar
          data={props.municipios}
          theme="White"
          municipio={props.municipio}
          setMunicipio={props.setMunicipio}
        />
      }
      </div>
    )
}
export default MunicipioSelector ;
import axios from "axios";
import { API_URL } from "../../constants/API_URL";

const tabelaCitoEquipe = async(municipio_uf,equipe,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL + `impulsoprevine/busca-ativa/citopatologico-por-equipe?municipio_uf=${municipio_uf}&equipe=${equipe}`,
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };
      
      const res = axios.request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });      
      
      return res
}
const tabelaCitoAPS = async(municipio_uf,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL + `impulsoprevine/busca-ativa/citopatologico-por-municipio?municipio_uf=${municipio_uf}`,
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };
      
      const res = axios.request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });      

      return res
}

export { tabelaCitoEquipe, tabelaCitoAPS  }
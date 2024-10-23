import axios from "axios";
import { API_URL_DADOS_NOMINAIS } from "../../constants/API_URL";

const tabelaCitoEquipe = async(municipio_id_sus,equipe,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL_DADOS_NOMINAIS + `impulsoprevine/busca-ativa/citopatologico-por-equipe?municipio_id_sus=${municipio_id_sus}&equipe=${equipe}`,
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
const tabelaCitoAPS = async(municipio_id_sus,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL_DADOS_NOMINAIS + `impulsoprevine/busca-ativa/citopatologico-por-municipio?municipio_id_sus=${municipio_id_sus}`,
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
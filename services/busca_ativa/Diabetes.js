import axios from "axios";
import { API_URL_DADOS_NOMINAIS } from "../../constants/API_URL";

const tabelaDiabetesEquipe = async(municipio_uf,equipe,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL_DADOS_NOMINAIS + `impulsoprevine/busca-ativa/diabeticos-por-equipe?municipio_uf=${municipio_uf}&equipe=${equipe}`,
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
const tabelaDiabetesAPS = async(municipio_uf,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL_DADOS_NOMINAIS + `impulsoprevine/busca-ativa/diabeticos-por-municipio?municipio_uf=${municipio_uf}`,
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

export { tabelaDiabetesEquipe, tabelaDiabetesAPS  }
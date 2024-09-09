import axios from "axios";
import { API_URL_DADOS_NOMINAIS } from "../../constants/API_URL";

const tabelaGestantesEquipe = async(municipio_id_sus,equipe,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL_DADOS_NOMINAIS + `impulsoprevine/busca-ativa/gestantes?municipio_id_sus=${municipio_id_sus}&equipe=${equipe}`,
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };
      
      const res = axios.request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });      
      
      return res
}
const tabelaGestantesAPS = async(municipio_id_sus,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL_DADOS_NOMINAIS + `busca_ativa/gestantes/gestantesAPS?municipio_id_sus=${municipio_id_sus}`,
        headers: { 
          'Authorization': 'Bearer ' + token,
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

export { tabelaGestantesAPS, tabelaGestantesEquipe }
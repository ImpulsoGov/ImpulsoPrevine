import axios from "axios";
import { API_URL_DADOS_NOMINAIS } from "../../constants/API_URL";

const tabelaGestantesEquipe = async(municipio_id_sus,equipe,token)=>{
  try {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL_DADOS_NOMINAIS + `impulsoprevine/busca-ativa/gestantes?municipio_id_sus=${municipio_id_sus}&equipe=${equipe}`,
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };
      
    const res = await axios.request(config)
    return res
    } catch (error) {
        return error.response.data
    }
}
const tabelaGestantesAPS = async(municipio_id_sus,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL_DADOS_NOMINAIS + `impulsoprevine/busca-ativa/gestantes-coordenacao?municipio_id_sus=${municipio_id_sus}`,
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

export { tabelaGestantesAPS, tabelaGestantesEquipe }
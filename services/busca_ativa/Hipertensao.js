import axios from "axios";
import { API_URL } from "../../constants/API_URL";

const tabelaHipertensao = async(municipio_id_sus,equipe,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL + `impulsoprevine/busca-ativa/hipertensao-por-equipe?municipio_id_sus=${municipio_id_sus}&equipe=${equipe}`,
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

export { tabelaHipertensao }
import axios from "axios";
import { API_URL_DADOS_NOMINAIS } from "../../constants/API_URL";

const tabelaHipertensaoEquipe = async(municipio_uf,equipe,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL_DADOS_NOMINAIS + `impulsoprevine/busca-ativa/hipertensao-por-equipe?municipio_uf=${municipio_uf}&equipe=${equipe}`,
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };
      
      const res = axios.request(config)
      .then((response) => {
        console.log(response)
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });      

      return res
}
const tabelaHipertensaoAPS = async(municipio_uf,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL_DADOS_NOMINAIS + `impulsoprevine/busca-ativa/hipertensao-por-municipio?municipio_uf=${municipio_uf}`,
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };
      console.log("requisição realizada")
      const res = axios.request(config)
      .then((response) => {
        console.log(response)
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });      

      return res
}

export { tabelaHipertensaoEquipe, tabelaHipertensaoAPS }
import axios from "axios";
import { API_LOCAL } from "../constants/API_URL";

const CadastrosEquipeContagem = async (municipio_uf) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_LOCAL + `impulsoprevine/capitacao-ponderada/cadastros-contagem?municipio_uf=${municipio_uf}`
  };
  const res = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
  return res
}

  export {CadastrosEquipeContagem}
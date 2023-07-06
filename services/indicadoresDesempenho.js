import axios from "axios";
import { API_URL } from "../constants/API_URL";

const indicadoresDesempenho = async (municipio_uf) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_URL + `/impulsoprevine/indicadores/desempenho_score_equipes_validas?municipio_uf'=${municipio_uf}`,
    headers: {},
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

  export {indicadoresDesempenho}
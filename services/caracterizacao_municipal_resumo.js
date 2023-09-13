import axios from "axios";
import { API_URL } from "../constants/API_URL";

const CaracterizacaoMunicipalResumo = async (municipio_uf) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_URL + `impulsoprevine/caracterizacao_municipal/resumo?municipio_uf=${municipio_uf}`
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

  export {CaracterizacaoMunicipalResumo}
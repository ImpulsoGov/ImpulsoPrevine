import axios from "axios";
import { API_URL_DADOS_PUBLICOS } from "../constants/API_URL";

const CadastrosEquipes = async (municipio_uf) => {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url:
			API_URL_DADOS_PUBLICOS +
			`impulsoprevine/capitacao-ponderada/cadastros-equipe?municipio_uf=${municipio_uf}`,
	};
	const res = await axios(config)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			return error.response.data;
		});
	return res;
};

export { CadastrosEquipes };

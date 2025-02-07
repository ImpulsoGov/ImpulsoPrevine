import axios from "axios";
import { API_URL_DADOS_NOMINAIS } from "../../constants/API_URL";

const tabelaVacinacaoEquipe = async (municipioIdSus, equipe, token) => {
	const config = {
		method: "get",
		maxBodyLength: Number.POSITIVE_INFINITY,
		url:
			API_URL_DADOS_NOMINAIS +
			`impulsoprevine/busca-ativa/vacinacao-por-equipe?municipio_id_sus=${municipioIdSus}&equipe=${equipe}`,
		headers: {
			Authorization: "Bearer " + token,
		},
	};

	const res = axios
		.request(config)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response.data;
		});

	return res;
};
const tabelaVacinacaoAPS = async (municipioIdSus, token) => {
	const config = {
		method: "get",
		maxBodyLength: Number.POSITIVE_INFINITY,
		url:
			API_URL_DADOS_NOMINAIS +
			`impulsoprevine/busca-ativa/vacinacao-por-municipio?municipio_id_sus=${municipioIdSus}`,
		headers: {
			Authorization: "Bearer " + token,
		},
	};
	const res = axios
		.request(config)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});

	return res;
};

export { tabelaVacinacaoEquipe, tabelaVacinacaoAPS };

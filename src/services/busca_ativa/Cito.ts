import axios from "axios";
import { API_URL_DADOS_NOMINAIS } from "../../constants/API_URL";

const tabelaCitoEquipe = async (
	municipioIdSus: string,
	equipe: string,
	token: string,
) => {
	const config = {
		method: "get",
		url: `${API_URL_DADOS_NOMINAIS}impulsoprevine/busca-ativa/citopatologico-por-equipe?municipio_id_sus=${municipioIdSus}&equipe=${equipe}`,
		headers: {
			authorization: `Bearer ${token}`,
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

export type TabelaCitoResponse = Record<
	string,
	string | number | boolean | Date | null | undefined
>[];

const tabelaCitoAps = async (
	municipioIdSus: string,
	token: string,
): Promise<TabelaCitoResponse> => {
	const config = {
		method: "get",
		url: `${API_URL_DADOS_NOMINAIS}impulsoprevine/busca-ativa/citopatologico-por-municipio?municipio_id_sus=${municipioIdSus}`,
		headers: {
			authorization: `Bearer ${token}`,
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

export { tabelaCitoEquipe, tabelaCitoAps };

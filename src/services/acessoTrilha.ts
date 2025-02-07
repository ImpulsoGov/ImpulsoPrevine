import axios from "axios";
import { API_URL } from "../constants/API_URL";

const acessoTrilhasClient = async (usuarioId: string, token: string) => {
	const config = {
		method: "get",
		maxBodyLength: Number.POSITIVE_INFINITY,
		url:
			API_URL +
			`impulsoprevine/capacitacao/acesso-trilhas?usuario_id=${usuarioId}`,
		headers: {
			Authorization: "Bearer " + token,
		},
	};

	const res = await axios(config)
		.then((response) => response.data)
		.catch((error) => error.response.data);
	return res;
};

const acessoModulosTrilhasClient = async (
	usuarioId: string,
	trilhaId: string,
	token: string,
) => {
	const config = {
		method: "get",
		maxBodyLength: Number.POSITIVE_INFINITY,
		url:
			API_URL +
			`impulsoprevine/capacitacao/acesso-modulos-trilha?usuario_id=${usuarioId}&trilha_id=${trilhaId}`,
		headers: {
			Authorization: "Bearer " + token,
		},
	};
	const res = await axios(config)
		.then((response) => response.data)
		.catch((error) => error.response.data);
	return res;
};

export { acessoTrilhasClient, acessoModulosTrilhasClient };

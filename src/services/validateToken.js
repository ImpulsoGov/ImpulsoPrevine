import axios from "axios";
import { API_URL_USUARIOS } from "../constants/API_URL";

const validatetoken = async (token) => {
	let config = {
		method: "get",
		url: API_URL_USUARIOS + "suporte/validate-token",
		headers: {
			Authorization: "Bearer " + token,
		},
	};

	if (token) {
		const { data } = await axios(config);
		return data;
	} else {
		return "token invalido";
	}
};

export { validatetoken };

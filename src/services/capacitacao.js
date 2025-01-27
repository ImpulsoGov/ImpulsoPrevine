import axios from "axios";
import { API_URL } from "../constants/API_URL";
import FormData from "form-data";

const consultarAvaliacaoConclusaoClient = async (
	usuario_id,
	codigo_conteudo,
	token,
) => {
	try {
		let data = new FormData();
		data.append("usuario_id", usuario_id);
		data.append("codigo_conteudo", codigo_conteudo);
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: API_URL + "impulsoprevine/capacitacao/consulta-avaliacao-conclusao",
			headers: {
				Authorization: "Bearer " + token,
			},
			data: data,
		};
		const res = await axios(config)
			.then(function (response) {
				return response.data;
			})
			.catch(function (error) {
				return error.response.data;
			});
		return res;
	} catch (error) {
		return error;
	}
};

const consultarAvaliacaoConclusao = async (
	usuario_id,
	codigo_conteudo,
	token,
) => {
	const res = await consultarAvaliacaoConclusaoClient(
		usuario_id,
		codigo_conteudo,
		token,
	);
	if (res?.error == null) {
		if (res.data) if (res?.data.length > 0) return res.data;
	}
	return false;
};
const consultarAvaliacaoConclusaoPorUsuarioClient = async (
	usuario_id,
	token,
) => {
	try {
		let data = new FormData();
		data.append("usuario_id", usuario_id);
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url:
				API_URL +
				"impulsoprevine/capacitacao/consulta-avaliacao-conclusao-por-usuario",
			headers: {
				Authorization: "Bearer " + token,
			},
			data: data,
		};
		const res = await axios(config)
			.then(function (response) {
				return response.data;
			})
			.catch(function (error) {
				return error.response.data;
			});
		return res;
	} catch (error) {
		return error;
	}
};

const consultarAvaliacaoConclusaoPorUsuario = async (usuario_id, token) => {
	const res = await consultarAvaliacaoConclusaoPorUsuarioClient(
		usuario_id,
		token,
	);
	if (res?.error == null) {
		if (typeof res?.data == "undefined") return res?.error;
		if (res?.data.length >= 0) return res.data;
	}
	return false;
};

async function avaliarConteudoClient(
	usuario_id,
	codigo_conteudo,
	avaliacao,
	token,
) {
	let data = new FormData();
	data.append("usuario_id", usuario_id);
	data.append("codigo_conteudo", codigo_conteudo);
	data.append("avaliacao", avaliacao);

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: API_URL + "impulsoprevine/capacitacao/avaliacao-conteudo",
		headers: {
			Authorization: "Bearer " + token,
		},
		data: data,
	};

	const res = await axios(config)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			return error.response.data;
		});
	return res;
}
async function avaliarConteudo(usuario_id, codigo_conteudo, avaliacao, token) {
	const res = await avaliarConteudoClient(
		usuario_id,
		codigo_conteudo,
		avaliacao,
		token,
	);
	if (res?.error == null) return res;
	return false;
}
async function concluirConteudoClient(usuario_id, codigo_conteudo, token) {
	let data = new FormData();
	data.append("usuario_id", usuario_id);
	data.append("codigo_conteudo", codigo_conteudo);
	data.append("conclusao", "True");

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: API_URL + "impulsoprevine/capacitacao/conclusao-conteudo",
		headers: {
			Authorization: "Bearer " + token,
		},
		data: data,
	};

	const res = await axios(config)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			return error.response.data;
		});
	return res;
}
async function concluirConteudo(usuario_id, codigo_conteudo, token) {
	const res = await concluirConteudoClient(usuario_id, codigo_conteudo, token);
	if (res?.error == null) return res;
	return false;
}

export {
	consultarAvaliacaoConclusao,
	concluirConteudo,
	avaliarConteudo,
	consultarAvaliacaoConclusaoPorUsuario,
};

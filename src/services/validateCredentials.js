import axios from "axios";
import FormData from "form-data";
import mixpanel from "mixpanel-browser";
import { API_URL_USUARIOS } from "../constants/API_URL";
import { rotasPublicas } from "@/middlewares/middlewarePages";

const validateCredentials = async (mail, senha) => {
	mixpanel.track("button_click", {
		button_action: "entrar_area_restitra_apos_senha",
	});

	const data = new FormData();
	data.append("username", mail);
	data.append("password", senha);

	var config = {
		method: "post",
		url: API_URL_USUARIOS + "suporte/usuarios/token",
		data: data,
	};

	const res = await axios(config)
		.then((response) => response.data)
		.catch((error) => {
			console.log(error);
			mixpanel.track("validation_error", {
				button_action: "entrar_area_restitra_apos_senha",
				error_message: error.response.data,
				login_flow: "login",
			});
			return error.response.data;
		});

	return res;
};

const validacao = (
	setResposta,
	validarCredencial,
	entrar,
	mail,
	senha,
	setEsperandoResposta,
	setModal
) => {
	const res = async () => await validarCredencial(mail, senha);
	if (mail.length < 1 || senha.length < 1) {
		const msgCampoVazio = "Preencha todos os campos";
		setResposta(msgCampoVazio);
		return msgCampoVazio;
	} else {
		res().then((response) => {
			if (typeof response["access_token"] !== "undefined") {
				entrar("credentials", {
					redirect: true,
					username: mail,
					password: senha,
					callbackUrl: rotasPublicas.includes(window.location.pathname) ? `${window.location.origin}/inicio`: window.location.href,
				});
				setModal(false);
			} else {
				setResposta(response["detail"]);
				setEsperandoResposta(false);
			}
			return res;
		});
	}
};

export { validateCredentials, validacao };

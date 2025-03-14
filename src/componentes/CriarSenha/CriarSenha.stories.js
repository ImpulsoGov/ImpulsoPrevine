import { CriarSenha } from "./index";

export default {
	title: "Componentes/CriarSenha",
	component: CriarSenha,
};
import axios from "axios";
import FormData from "form-data";

const submitCadastro = async (nome, mail, senha, cpf) => {
	const data = new FormData();
	data.append("nome", nome);
	data.append("mail", mail);
	data.append("senha", senha);
	data.append("cpf", cpf);
	const config = {
		method: "post",
		url: "http://localhost:8000/suporte/usuarios/cadastro",
		headers: {
			...data.getHeaders(),
		},
		data: data,
	};

	return await axios(config)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
		});
};

const submitCadastroIp = async (municipio, cargo, telefone, whatsapp, mail) => {
	var data = new FormData();
	data.append("municipio", municipio);
	data.append("cargo", cargo);
	data.append("telefone", telefone);
	data.append("whatsapp", whatsapp);
	data.append("mail", mail);

	var config = {
		method: "post",
		url: "http://localhost:8000/suporte/usuarios/cadastro-ip",
		headers: {
			...data.getHeaders(),
		},
		data: data,
	};

	return await axios(config)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
		});
};

export const Default = () => {
	return (
		<CriarSenha
			titulo="Crie sua senha"
			campos={{
				senha: "Crie sua senha",
				ConfirmarSenha: "Digite sua senha novamente",
			}}
			button={{ label: "ENVIAR", link: "" }}
			submitCadastro={submitCadastro}
			submitCadastroIP={submitCadastroIp}
		/>
	);
};

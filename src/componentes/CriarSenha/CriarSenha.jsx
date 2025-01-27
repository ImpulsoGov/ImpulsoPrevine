import React, { useState } from "react";
import style from "./CriarSenha.module.css";
import { ButtonColorSubmit } from "../ButtonColor";

const CriarSenha = ({
	titulo,
	campos,
	button,
	setEtapa,
	submitCadastro,
	submitCadastroIP,
	arg,
	data,
}) => {
	const [senha, setSenha] = useState("");
	const [confirmarSenha, setConfirmarSenha] = useState("");
	const [message, setMessage] = useState("");
	let match = (e) => {
		if (senha == e || e == confirmarSenha) {
			setMessage("");
		} else {
			setMessage("As senhas não estão iguais");
		}
	};
	const handleSubmit = async () => {
		//e.preventDefault();
		if (senha != confirmarSenha) {
			setMessage("As senhas não estão iguais");
			return null;
		}
		data[0]["cadastro_usuario"].senha = senha;
		submitCadastro(
			data[0]["cadastro_usuario"].nome,
			data[0]["cadastro_usuario"].mail,
			data[0]["cadastro_usuario"].senha,
			data[0]["cadastro_usuario"].cpf,
		).then(() =>
			submitCadastroIP(
				data[0]["cadastro_ip"].municipio,
				data[0]["cadastro_ip"].cargo,
				data[0]["cadastro_ip"].telefone,
				data[0]["cadastro_ip"].whatsapp,
				data[0]["cadastro_ip"].mail,
			),
		);
		setEtapa(1);
	};
	return (
		<div className={style.CriarSenhaContainer}>
			<div className={style.CriarSenhaTitulo}>{titulo}</div>
			<div className={style.CriarSenhaCampos}>
				<input
					className={style.CriarSenhaCampo}
					type="password"
					placeholder={campos.senha}
					value={senha}
					onChange={(e) => {
						setSenha(e.target.value);
						match(e.target.value);
					}}
				/>
				<input
					className={style.CriarSenhaCampo}
					type="password"
					placeholder={campos.ConfirmarSenha}
					value={confirmarSenha}
					onChange={(e) => {
						setConfirmarSenha(e.target.value);
						match(e.target.value);
					}}
				/>
			</div>
			{message && (
				<div className={style.CriarSenhaMessage}>
					<p>{message}</p>
				</div>
			)}
			<div className={style.CriarSenhaCampoButton}>
				<ButtonColorSubmit label="VOLTAR" submit={setEtapa} arg={arg} />

				<ButtonColorSubmit label={button.label} submit={handleSubmit} />
			</div>
		</div>
	);
};

export { CriarSenha };

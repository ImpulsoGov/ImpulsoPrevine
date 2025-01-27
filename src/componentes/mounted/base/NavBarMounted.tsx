"use client";
import { NavBar } from "@impulsogov/design-system";
import { signIn, signOut } from "next-auth/react";
import { validacao, validateCredentials } from "@services/validateCredentials";
import {
	criarSenha,
	primeiroAcesso,
	verificarCPFPrimeiroAcesso,
} from "@services/primeiroAcesso";
import {
	alterarSenha,
	solicitarNovaSenha,
	validarCodigo,
	verificarCPF,
} from "@services/esqueciMinhaSenha";
import { data } from "@utils/Municipios";
import { menuNavBar } from "@helpers/menuNavBar";

import { Dispatch, SetStateAction } from "react";
import { Session } from "next-auth";
import { Mixpanel } from "mixpanel-browser";
import { useRouter } from "next/navigation";

interface NavBarMountedType {
	mixpanel: Mixpanel;
	session: Session | null;
	nome: string | null | undefined;
	path: string;
	cidade: string;
	setCidade: Dispatch<SetStateAction<string>>;
	width: number;
	res: any;
	active: boolean;
	setMode: Dispatch<SetStateAction<boolean>>;
}

export const NavBarMounted: React.FC<NavBarMountedType> = ({
	mixpanel,
	session,
	nome,
	path,
	cidade,
	setCidade,
	width,
	res,
	active,
	setMode,
}) => {
	const router = useRouter();
	return (
		<NavBar
			projeto="IP"
			trackObject={mixpanel}
			login={{ titulo: "Faça o login para ver os dados restritos." }}
			user={{
				nome: nome,
				cargo: session != null ? session.user.cargo : "",
				button: { label: "sair" },
				label:
					session == null || typeof session == undefined
						? "Acesso Restrito"
						: nome?.[0],
				equipe: session?.user?.equipe,
				login: signIn,
				logout: signOut,
				validarCredencial: validateCredentials,
				validacao: validacao,
				botaoAuxiliar: session?.user.perfis.includes(2)
					? {
							label: "GESTÃO DE USUÁRIOS",
							handelClick: () => router.push("/gestao-usuarios"),
						}
					: null,
			}}
			municipio={cidade}
			setMunicipio={setCidade}
			data={data}
			theme={{
				logoProjeto:
					width > 900 ? res.logoIps[0].logo[0].url : res.logoIps[1].logo[0].url,
				cor:
					path == "/" ||
					path == "/apoio" ||
					path == "/analise" ||
					path == "/quem-somos"
						? "Cinza"
						: "White",
				logoLink: session ? "/inicio" : "/",
				logoOnClick: session
					? () =>
							mixpanel.track("menu_click", {
								menu_action: "acessar_pg_inicio_logo",
							})
					: () => {},
			}}
			showMenuMobile={{
				states: {
					active: active,
					setMode: setMode,
				},
			}}
			menu={menuNavBar(session, res)}
			NavBarIconBranco={res.logoMenuMoblies[0].logo.url}
			NavBarIconDark={res.logoMenuMoblies[1].logo.url}
			esqueciMinhaSenha={{
				reqs: {
					verificacao: verificarCPF,
					mail: solicitarNovaSenha,
					codigo: async (cpf: string, codigo: string) => {
						const response = await validarCodigo(cpf, codigo);
						mixpanel.track("button_click", {
							button_action: "proximo_inseriu_codigo_telefone",
							login_flow: "esqueceu_senha",
						});
						!response.success &&
							mixpanel.track("validation_error", {
								button_action: "proximo_inseriu_codigo_telefone",
								error_message: response.mensagem,
								login_flow: "esqueceu_senha",
							});
						return response;
					},
					alterarSenha: alterarSenha,
				},
				titulos: {
					mail: "Recuperação de senha",
					verificacao: "Recuperação de senha",
					senha: "Recuperação de senha",
					codigo: "Recuperação de senha",
					sucesso: "Nova senha criada com sucesso!",
				},
				chamadas: {
					mail: "Digite o seu CPF para receber um código de autorização de recuperação da senha.",
					aviso: " ",
					verificacao:
						"É necessário que um código de verificação seja enviado por mensagem de SMS para o telefone cadastrado ",
					trocar_telefone:
						"<div style='margin-top:50px;display : flex;align-items: center;font-size : 14px'><img width='20px' height='20px' src='/mark-question.svg' style='margin-right : 10px'/>Está com um problema? Entre em <a href='https://bit.ly/atendimento-impulso-previne-login' style='color:#2EB280;cursor:pointer;text-decoration: underline;margin-left: 8px;' target='_blank'>contato com o suporte.</a></div>",
					codigo:
						"Digite abaixo o código recebido por mensagem de SMS no número de telefone cadastrado: ",
					senha: "Escolha uma nova senha",
					sucesso:
						"Agora é só entrar na área restrita com seu CPF e a senha criada.",
				},
			}}
			ModalInicio={{
				titulo: "Faça o login para ver os dados restritos.",
				chamada:
					"Se esse é o seu primeiro acesso e sua senha ainda não foi criada, clique abaixo em ‘primeiro acesso’. Se você já possui uma senha, clique em ‘entrar’.",
				cardAlert:
					"<p style='font-size:14px;'>A área logada é de acesso exclusivo para municípios parceiros. Para ver os resultados públicos do seu município <a href='analise' style='text-decoration:underline !important;'>clique aqui.</a></p>",
				botaoPrincipal: {
					label: "entrar",
					theme: "ColorIP",
				},
				botaoSecundario: {
					label: "primeiro acesso",
				},
				botaoAjuda: {
					label: "ESTOU COM PROBLEMAS NO LOGIN",
					link: "https://docs.google.com/forms/d/e/1FAIpQLSe1i7zkVOz-T24xfD3F4XCM2J-hYnoTKYCMHG3EVMLUoBNpMg/viewform?usp=sf_link",
				},
			}}
			primeiroAcesso={{
				reqs: {
					verificacao: verificarCPFPrimeiroAcesso,
					mail: primeiroAcesso,
					codigo: async (cpf: string, codigo: string) => {
						mixpanel.track("button_click", {
							button_action: "proximo_inseriu_codigo_telefone",
							login_flow: "primeiro_acesso",
						});
						const response = await validarCodigo(cpf, codigo);
						!response.success &&
							mixpanel.track("validation_error", {
								button_action: "proximo_inseriu_codigo_telefone",
								error_message: response.mensagem,
								login_flow: "primeiro_acesso",
							});
						return response;
					},
					alterarSenha: criarSenha,
				},
				titulos: {
					mail: "Bem-vindo(a)! Precisamos que você crie uma senha para acessar os dados restritos.",
					verificacao: "Verificação do telefone",
					codigo: "Verificação do telefone",
					senha: "Crie sua senha de acesso",
					sucesso: "Senha criada com sucesso!",
				},
				chamadas: {
					mail: "Se você é de um município parceiro e ainda não tem senha cadastrada, siga os próximos passos.",
					aviso: " ",
					codigo:
						"Digite abaixo o código recebido por mensagem de SMS no número de telefone cadastrado: ",
					verificacao:
						"É necessário que um código de verificação seja enviado por mensagem de SMS para o telefone ",
					trocar_telefone:
						"<div style='margin-top:50px;display : flex;align-items: center;font-size : 14px'><img width='20px' height='20px' src='/mark-question.svg' style='margin-right : 10px'/>Está com um problema? Entre em <a href='https://bit.ly/atendimento-impulso-previne-login' style='color:#2EB280;cursor:pointer;text-decoration: underline;margin-left: 8px;' target='_blank'>contato com o suporte.</a></div>",
					senha: "Escolha uma senha",
					sucesso:
						"Agora é só entrar na área restrita com seu CPF e a senha criada.",
				},
			}}
		/>
	);
};

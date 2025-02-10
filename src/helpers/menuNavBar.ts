import mixpanel from "mixpanel-browser";

type Menu = {
	label: string;
	url: string;
	sub?: Menu[];
	onClick?: () => void;
};

const subMenuListasNominais = (visao: string): Menu[] => [
	{
		label: "Citopatológico",
		url: `/busca-ativa/citopatologico?aba=${""}&sub_aba=0&visao=${visao}`,
		onClick: () =>
			mixpanel.track("menu_click", {
				menu_action: "acessar_lista_citopatologico",
			}),
	},
	{
		label: "Diabetes",
		url: `/busca-ativa/diabeticos?aba=${""}&sub_aba=${""}&visao=${visao}`,
		onClick: () =>
			mixpanel.track("menu_click", { menu_action: "acessar_lista_diabetes" }),
	},
	{
		label: "Hipertensão",
		url: `/busca-ativa/hipertensos?aba=${""}&sub_aba=${""}&visao=${visao}`,
		onClick: () =>
			mixpanel.track("menu_click", {
				menu_action: "acessar_lista_hipertensao",
			}),
	},
	{
		label: "Pré-Natal",
		url: `/busca-ativa/gestantes?aba=0&sub_aba=0&visao=${visao}`,
		onClick: () =>
			mixpanel.track("menu_click", { menu_action: "acessar_lista_pre_natal" }),
	},
	{
		label: "Vacinação",
		url: `/busca-ativa/vacinacao?aba=0&sub_aba=0&visao=${visao}`,
		onClick: () =>
			mixpanel.track("menu_click", { menu_action: "acessar_lista_vacinacao" }),
	},
];

const loggedMenu = (session: any) => {
	const menus: Menu[] = [
		{
			label: "Início",
			url: "/inicio",
			onClick: () =>
				mixpanel.track("menu_click", { menu_action: "acessar_pg_inicio" }),
		},
	];
	if (
		session?.user.perfis.includes(5) ||
		session?.user.perfis.includes(8) ||
		session?.user.perfis.includes(9)
	)
		menus.push({
			label: "Listas Nominais",
			url: "",
			sub: subMenuListasNominais(
				session.user.perfis.includes(5) || session.user.perfis.includes(8)
					? "aps"
					: "equipe",
			),
		});
	menus.push({
		label: "Dados do SISAB",
		url: "/analise",
		onClick: () =>
			mixpanel.track("menu_click", { menu_action: "acessar_dados_sisab" }),
	});
	return menus;
};
const notLoggedMenu = (res: any) => {
	return [res.menus[0], res.menus[1]].concat([
		{ label: "Apoio aos Municípios", url: "/apoio" },
		{ label: "FAQ", url: "/faq" },
		{ label: "Blog", url: "/blog" },
	]);
};

export const menuNavBar = (session: any, res: any) =>
	session ? loggedMenu(session) : notLoggedMenu(res);

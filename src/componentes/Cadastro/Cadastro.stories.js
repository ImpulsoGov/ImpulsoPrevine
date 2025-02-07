import { Cadastro } from "./index";

export default {
	title: "Componentes/Cadastro",
	component: Cadastro,
};

export const Default = () => {
	return (
		<Cadastro
			titulo="Cadastro do município"
			campos={[
				{ label: "Nome Completo" },
				{ label: "Municipio" },
				{ label: "Cargo" },
				{ label: "E-mail" },
				{ label: "(DDD) Telefone" },
			]}
			button={{ label: "Próximo", link: "" }}
		/>
	);
};

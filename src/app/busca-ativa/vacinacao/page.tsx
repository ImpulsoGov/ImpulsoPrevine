import {
	tabelaVacinacaoAPS,
	tabelaVacinacaoEquipe,
} from "@services/busca_ativa/Vacinacao";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { Vacinacao } from "./Vacinacao";

const VacinacaoPage = async () => {
	const session = await getServerSession(nextAuthOptions);
	let VacinacaoTabelaDataAPS;
	if (session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8))
		VacinacaoTabelaDataAPS = await tabelaVacinacaoAPS(
			session?.user?.municipio_id_sus,
			session?.user?.access_token,
		);
	let VacinacaoTabelaDataEquipe;
	if (session?.user?.perfis.includes(9))
		VacinacaoTabelaDataEquipe = await tabelaVacinacaoEquipe(
			session?.user?.municipio_id_sus,
			session?.user?.equipe,
			session?.user?.access_token,
		);
	return (
		<Vacinacao
			tabelaDataAPS={VacinacaoTabelaDataAPS}
			tabelaDataEquipe={VacinacaoTabelaDataEquipe}
			session={session}
		/>
	);
};

export default VacinacaoPage;

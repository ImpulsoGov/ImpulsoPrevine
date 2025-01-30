import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import {
	tabelaVacinacaoAPS,
	tabelaVacinacaoEquipe,
} from "@services/busca_ativa/Vacinacao";
import type { TabelaResponse } from "@/services/busca_ativa/Cito";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
const Vacinacao = dynamic(() =>import("./Vacinacao").then((mod) => mod.Vacinacao));


const VacinacaoPage = async () => {
	const session = await getServerSession(nextAuthOptions);
	let vacinacaoTabelaDataAps: TabelaResponse | null = null;
	if (session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8))
		vacinacaoTabelaDataAps  = await tabelaVacinacaoAPS(
			session?.user?.municipio_id_sus,
			session?.user?.access_token,
		);
	let vacinacaoTabelaDataEquipe: TabelaResponse | null = null;
	if (session?.user?.perfis.includes(9))
		vacinacaoTabelaDataEquipe = await tabelaVacinacaoEquipe(
			session?.user?.municipio_id_sus,
			session?.user?.equipe,
			session?.user?.access_token,
		);
	return (
		<Vacinacao
			tabelaDataAPS={vacinacaoTabelaDataAps }
			tabelaDataEquipe={vacinacaoTabelaDataEquipe}
			session={session}
		/>
	);
};

export default VacinacaoPage;

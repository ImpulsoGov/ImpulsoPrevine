import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import {
	tabelaDiabetesAPS,
	tabelaDiabetesEquipe,
} from "@services/busca_ativa/Diabetes";
import type { TabelaResponse } from "@/services/busca_ativa/Cito";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
const Diabetes = dynamic(() =>import("./Diabetes").then((mod) => mod.Diabetes));

const DiabetesPage = async () => {
	const session = await getServerSession(nextAuthOptions);
	let diabetesTabelaDataAps: TabelaResponse | null = null;
	if (session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8))
		diabetesTabelaDataAps = await tabelaDiabetesAPS(
			session?.user?.municipio_id_sus,
			session?.user?.access_token,
		);
	let diabetesTabelaDataEquipe: TabelaResponse | null = null;
	if (session?.user?.perfis.includes(9))
		diabetesTabelaDataEquipe = await tabelaDiabetesEquipe(
			session?.user?.municipio_id_sus,
			session?.user?.equipe,
			session?.user?.access_token,
		);
	return (
		<Diabetes
			tabelaDataAPS={diabetesTabelaDataAps}
			tabelaDataEquipe={diabetesTabelaDataEquipe}
			session={session}
		/>
	);
};

export default DiabetesPage;

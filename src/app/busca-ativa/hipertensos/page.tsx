import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import {
	tabelaHipertensaoAPS,
	tabelaHipertensaoEquipe,
} from "@services/busca_ativa/Hipertensao";
import { getServerSession } from "next-auth";
import { Hipertensao } from "./Hipertensao";

const DiabetesPage = async () => {
	const session = await getServerSession(nextAuthOptions);
	let DiabetesTabelaDataAPS;
	if (session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8))
		DiabetesTabelaDataAPS = await tabelaHipertensaoAPS(
			session?.user?.municipio_id_sus,
			session?.user?.access_token,
		);
	let DiabetesTabelaDataEquipe;
	if (session?.user?.perfis.includes(9))
		DiabetesTabelaDataEquipe = await tabelaHipertensaoEquipe(
			session?.user?.municipio_id_sus,
			session?.user?.equipe,
			session?.user?.access_token,
		);
	return (
		<Hipertensao
			tabelaDataAPS={DiabetesTabelaDataAPS}
			tabelaDataEquipe={DiabetesTabelaDataEquipe}
			session={session}
		/>
	);
};

export default DiabetesPage;

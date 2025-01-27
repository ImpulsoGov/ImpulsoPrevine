<<<<<<< HEAD
import { tabelaCitoEquipe , tabelaCitoAps } from "@services/busca_ativa/Cito";
import type { TabelaCitoResponse } from "@services/busca_ativa/Cito";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import dynamic from 'next/dynamic';
const Cito = dynamic(() => import('./Cito').then(mod => mod.Cito));

const CitoPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    let citoTabelaDataAps : TabelaCitoResponse | null = null;
    if(session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8)) citoTabelaDataAps = await tabelaCitoAps(session?.user?.municipio_id_sus,session?.user?.access_token)
    let citoTabelaDataEquipe : TabelaCitoResponse | null = null;
    if(session?.user?.perfis.includes(9)) citoTabelaDataEquipe = await tabelaCitoEquipe(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
    return (citoTabelaDataAps || citoTabelaDataEquipe) && 
    <Cito 
        tabelaDataAPS={citoTabelaDataAps} 
        tabelaDataEquipe={citoTabelaDataEquipe} 
        session={session}
    />
}
=======
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { tabelaCitoAps, tabelaCitoEquipe } from "@services/busca_ativa/Cito";
import type { TabelaCitoResponse } from "@services/busca_ativa/Cito";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
const Cito = dynamic(() => import("./Cito").then((mod) => mod.Cito));

const CitoPage = async () => {
	const session = await getServerSession(nextAuthOptions);
	let citoTabelaDataAps: TabelaCitoResponse | null = null;
	if (session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8))
		citoTabelaDataAps = await tabelaCitoAps(
			session?.user?.municipio_id_sus,
			session?.user?.access_token,
		);
	let citoTabelaDataEquipe: TabelaCitoResponse | null = null;
	if (session?.user?.perfis.includes(9))
		citoTabelaDataEquipe = await tabelaCitoEquipe(
			session?.user?.municipio_id_sus,
			session?.user?.equipe,
			session?.user?.access_token,
		);
	return (
		(citoTabelaDataAps || citoTabelaDataEquipe) && (
			<Cito
				tabelaDataAPS={citoTabelaDataAps}
				tabelaDataEquipe={citoTabelaDataEquipe}
				session={session}
			/>
		)
	);
};
>>>>>>> 6f959a3 (feature/alog-280-executar-biome-check-em-todo-o-projeto (#310))
export default CitoPage;

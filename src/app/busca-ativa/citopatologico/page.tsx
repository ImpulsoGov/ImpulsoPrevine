import { tabelaCitoEquipe , tabelaCitoAPS } from "@services/busca_ativa/Cito";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { Cito } from "./Cito";

const CitoPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    let CitoTabelaDataAPS
    if(session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8)) CitoTabelaDataAPS = await tabelaCitoAPS(session?.user?.municipio_id_sus,session?.user?.access_token)
    let CitoTabelaDataEquipe
    if(session?.user?.perfis.includes(9)) CitoTabelaDataEquipe = await tabelaCitoEquipe(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
    return <Cito tabelaDataAPS={CitoTabelaDataAPS} tabelaDataEquipe={CitoTabelaDataEquipe} session={session}/>
}
export default CitoPage;

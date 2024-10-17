import {  tabelaGestantesAPS,tabelaGestantesEquipe } from "@services/busca_ativa/Gestantes";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { Gestantes } from "./Gestantes";

const GestantesPage = async() => {
  const session = await getServerSession(nextAuthOptions);
  let GestantesTabelaDataAPS
  if(session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8)) GestantesTabelaDataAPS = await tabelaGestantesAPS(session?.user?.municipio_id_sus, session?.user?.access_token)
  let GestantesTabelaDataEquipe
  if(session?.user?.perfis.includes(9)) GestantesTabelaDataEquipe = await tabelaGestantesEquipe(session?.user?.municipio_id_sus, session?.user?.equipe, session?.user?.access_token)
  return <Gestantes
    tabelaDataAPS={GestantesTabelaDataAPS}
    tabelaDataEquipe={GestantesTabelaDataEquipe}
    session={session}
  />
}

export default GestantesPage;
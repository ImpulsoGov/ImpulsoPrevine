import { tabelaDiabetesEquipe, tabelaDiabetesAPS } from "@services/busca_ativa/Diabetes";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { Diabetes } from "./Diabetes";

const DiabetesPage = async() => {
  const session = await getServerSession(nextAuthOptions);
  let DiabetesTabelaDataAPS
  if(session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8)) DiabetesTabelaDataAPS = await tabelaDiabetesAPS(session?.user?.municipio_id_sus,session?.user?.access_token)
  let DiabetesTabelaDataEquipe
  if(session?.user?.perfis.includes(9)) DiabetesTabelaDataEquipe = await tabelaDiabetesEquipe(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
  return <Diabetes
    tabelaDataAPS={DiabetesTabelaDataAPS}
    tabelaDataEquipe={DiabetesTabelaDataEquipe}
    session={session}
  />
}

export default DiabetesPage;

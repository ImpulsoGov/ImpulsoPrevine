import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import {
    tabelaHipertensaoAPS,
    tabelaHipertensaoEquipe,
} from "@services/busca_ativa/Hipertensao";
import type { TabelaResponse } from "@/services/busca_ativa/Cito";
import { getServerSession } from "next-auth";
import { Hipertensao } from "./Hipertensao";

const DiabetesPage = async () => {
    const session = await getServerSession(nextAuthOptions);
    let diabetesTabelaDataAps: TabelaResponse | null = null;
    if (session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8))
        diabetesTabelaDataAps = await tabelaHipertensaoAPS(
            session?.user?.municipio_id_sus,
            session?.user?.access_token,
        );
    let diabetesTabelaDataEquipe: TabelaResponse | null = null;
    if (session?.user?.perfis.includes(9))
        diabetesTabelaDataEquipe = await tabelaHipertensaoEquipe(
            session?.user?.municipio_id_sus,
            session?.user?.equipe,
            session?.user?.access_token,
        );
    return (
        <Hipertensao
            tabelaDataAPS={diabetesTabelaDataAps}
            tabelaDataEquipe={diabetesTabelaDataEquipe}
            session={session}
        />
    );
};

export default DiabetesPage;

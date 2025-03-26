import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import {
    tabelaGestantesAPS,
    tabelaGestantesEquipe,
} from "@services/busca_ativa/Gestantes";
import type { TabelaResponse } from "@/services/busca_ativa/Cito";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
const Gestantes = dynamic(() =>
    import("./Gestantes").then((mod) => mod.Gestantes),
);

const GestantesPage = async () => {
    const session = await getServerSession(nextAuthOptions);
    let gestantesTabelaDataAps: TabelaResponse | null = null;
    if (session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8))
        gestantesTabelaDataAps = await tabelaGestantesAPS(
            session?.user?.municipio_id_sus,
            session?.user?.access_token,
        );
    let gestantesTabelaDataEquipe: TabelaResponse | null = null;
    if (session?.user?.perfis.includes(9))
        gestantesTabelaDataEquipe = await tabelaGestantesEquipe(
            session?.user?.municipio_id_sus,
            session?.user?.equipe,
            session?.user?.access_token,
        );
    return (
        <Gestantes
            tabelaDataAPS={gestantesTabelaDataAps}
            tabelaDataEquipe={gestantesTabelaDataEquipe}
            session={session}
        />
    );
};

export default GestantesPage;

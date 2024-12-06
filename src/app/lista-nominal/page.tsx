import { buscarDadosLista } from "@services/lista-nominal/ListaNominal";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { ListaNominal } from "./ListaNominal";
import type { Ordenacao, Filtros } from "@services/lista-nominal/ListaNominal";

type searchParamsProps = {
    municipio_id_sus: string;
    token: string;
    lista: string;
    equipe?: string;
    ordenacao?: Ordenacao;
    filtros?: Filtros;
}

const ListaNominalPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    if (!session || !session.user) return <p>Usuário não autenticado</p>;
    const params: searchParamsProps = {
        municipio_id_sus: session.user.municipio_id_sus,
        token: session.user.access_token,
        lista: "lista-nominal", //esse valor inicial vai vir da url, assim como os filtros e ordenacao inicial
    }
    if(session.user.perfis.includes(9)) params.equipe = session.user.equipe
    const data = await buscarDadosLista(params)
    return <ListaNominal session={session} data={data.data}/>
}
export default ListaNominalPage;
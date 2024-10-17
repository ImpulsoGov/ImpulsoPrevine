import { getDataCapacitacao } from '@services/cms'
import { CONTEUDOS_TRILHAS } from '@utils/QUERYS'
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { progresso } from '@helpers/modulosDataTransform'
import { acessoTrilhasClient } from '@services/acessoTrilha'
import { Capacitacoes } from './Capacitacoes'

const CapacitacoesPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    const res: { trilhas?: any } | null = await getDataCapacitacao(CONTEUDOS_TRILHAS);
    if(!session) return <></>
    if(!res || !res.trilhas) return <></>
    const data = await progresso(res.trilhas,session?.user?.id,session?.user?.access_token);
    const TrilhasLiberadas = await acessoTrilhasClient(session.user.id,session.user.access_token);

    return <Capacitacoes res={res} data={data} TrilhasLiberadas={TrilhasLiberadas} session={session}/>
}

export default CapacitacoesPage;

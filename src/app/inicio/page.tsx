import { getDataCapacitacao } from '@services/cms'
import {  CONTEUDOS_TRILHAS } from '@utils/QUERYS'
import { progresso } from '@helpers/modulosDataTransform'
import { acessoTrilhasClient } from '@services/acessoTrilha'
import { cargoTransform } from '@helpers/cargoTransform'
import { Inicio } from './Inicio'
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";

const InicioPage = async() => {
    const res = await getDataCapacitacao(CONTEUDOS_TRILHAS) as { trilhas?: any } | null;
    if (!res || !res.trilhas) return <p>Erro ao carregar dados</p>;
    const session = await getServerSession(nextAuthOptions);
    if (!session || !session.user) return <p>Usuário não autenticado</p>;
    const ProgressoClient = await progresso(res.trilhas, session.user.id, session.user.access_token)
    const TrilhasLiberadas = await acessoTrilhasClient(session.user.id, session.user.access_token)
    const cargo = cargoTransform(session.user.cargo)
    return <Inicio
        cargo={cargo}
        data={ProgressoClient}
        TrilhasLiberadas={TrilhasLiberadas}
    />    
}
      
export default InicioPage;

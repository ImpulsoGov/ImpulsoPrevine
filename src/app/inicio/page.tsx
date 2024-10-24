import { getDataCapacitacao } from '@services/cms'
import {  CONTEUDOS_TRILHAS } from '@utils/QUERYS'
import { progresso } from '@helpers/modulosDataTransform'
import { InicioAPSRequest } from '@/services/inicio/inicioAPS'
import { InicioEquipeRequest } from '@/services/inicio/inicioEquipe'
import { cargoTransform } from '@helpers/cargoTransform'
import { Inicio } from './Inicio'
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";

const InicioPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    if (!session || !session.user) return <p>Usuário não autenticado</p>;
    let InicioAPS
    if(session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8)) InicioAPS = await InicioAPSRequest(session?.user?.municipio_id_sus,session?.user?.access_token)
    let InicioEquipe
    if(session?.user?.perfis.includes(9)) InicioEquipe = await InicioEquipeRequest(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
    const cargo = cargoTransform(session.user.cargo)
    return <h1> Adiconar aqui novos componente da pagina inicial</h1>  
}
      
export default InicioPage;

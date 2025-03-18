import { InicioAPSRequest } from '@/services/inicio/inicioAPS'
import { InicioEquipeRequest } from '@/services/inicio/inicioEquipe'

import dynamic from 'next/dynamic';
const Inicio = dynamic(() => import('./Inicio').then(mod => mod.Inicio));

import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { unificarSituacaoPorIndicadores } from '@/helpers/inicio/unificarSituacaoPorIndicadores';
import type { SituacaoPorIndicador } from '@/types/inicio';
import { ErrorPage } from './Error';


const InicioPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    let situacaoIndicadores = [];
    if(session?.user){ 
        if(session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8)) {
            situacaoIndicadores = await InicioAPSRequest(session?.user?.municipio_id_sus,session?.user?.access_token)
        }
    
        if(session?.user?.perfis.includes(9)) {
            situacaoIndicadores = await InicioEquipeRequest(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
        }
        const situacaoPorIndicador: SituacaoPorIndicador | null = await unificarSituacaoPorIndicadores(situacaoIndicadores);
        if(!situacaoPorIndicador) return <ErrorPage />
        if(Object.keys(situacaoPorIndicador).length === 0) return <ErrorPage />
        return <Inicio situacaoPorIndicador={situacaoPorIndicador} />
    }
    return <ErrorPage />
}

export default InicioPage;

import { getDataCapacitacao } from '@services/cms'
import { CONTEUDO_PROGRAMATICO } from '@utils/QUERYS'
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { headers } from 'next/headers';
import trilhas from '../../data/trilhas.json' assert { type: 'json' };
import { ConteudoProgramatico } from './ConteudoProgramatico';


const ConteudoProgramaticoPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    const header = headers();
    const url = header.get('x-current-url')
    if(!url) return <></>
    const trilhaID = url.split('=')[1]
    const siglaTrilha = trilhas.trilhas.find(item => item?.ID == trilhaID)?.sigla
    const res = [await getDataCapacitacao(CONTEUDO_PROGRAMATICO(trilhaID))]
    const inicio = url.split('&inicio=')[1]
    return <ConteudoProgramatico res={res} session={session} siglaTrilha={siglaTrilha} trilhaID={trilhaID} inicio={inicio}/>
}

export default ConteudoProgramaticoPage;

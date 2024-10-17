import { getDataCapacitacao } from '@services/cms'
import { CAPACITACAO } from '@utils/QUERYS'
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { conteudosDataTransform, modulosDataTransform } from '@helpers/modulosDataTransform'
import { headers } from 'next/headers';
import { Capacitacao } from './Capacitacao';
 
const CapacitacaoPage = async() => {
  const session = await getServerSession(nextAuthOptions);
  const header = headers();
  const url = header.get('x-current-url')
  const trilhaID = url?.split('=').length == 1 ? '' : (url?.split('=')[1] || '')

  const capacitacaoDataCMS = await getDataCapacitacao(CAPACITACAO(trilhaID)) as { trilhas: { conteudo: any }[] } | null;
  if (!capacitacaoDataCMS) return <></>
  const conteudosData = await conteudosDataTransform(capacitacaoDataCMS.trilhas[0].conteudo,trilhaID,session?.user?.id,session?.user?.access_token)
  const data = await modulosDataTransform(capacitacaoDataCMS.trilhas,trilhaID,session?.user?.id,session?.user?.access_token)
  
  return <Capacitacao 
    data={data} 
    capacitacaoDataCMS={capacitacaoDataCMS} 
    conteudosData={conteudosData} 
    trilhaID={trilhaID}
    url={url}
  />
}

export default CapacitacaoPage;

import { getData, getDataCapacitacao } from '../../services/cms'
import { LAYOUT, CONTEUDO_PROGRAMATICO } from '../../utils/QUERYS'
import { useSession,getSession } from "next-auth/react"
import { SobreTrilha } from '@impulsogov/design-system'
import { redirectHomeTrilha } from '../../helpers/redirectHome'
import { useRouter } from 'next/router';
import { concluirConteudo } from '../../services/capacitacao';
import trilhas from '../../data/trilhas.json' assert { type: 'json' };
import { useEffect } from 'react'


export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    const redirect = redirectHomeTrilha(ctx,session)
    const trilhaID = ctx?.req?.url.split('=').length < 1 ? '' : ctx?.req?.url.split('=')[1].split('&')[0]
    if(redirect) return redirect
    const res = [
        await getDataCapacitacao(CONTEUDO_PROGRAMATICO(trilhaID))
    ]
    return {
        props: {
            res : res
        }
    }
}


const Index = ({res}) => {
    const { data: session,status } = useSession()
    const router = useRouter()
    const trilhaID = router.query.trilha
    const siglaTrilha = trilhas.trilhas.find(item => item?.ID == trilhaID)?.sigla
    useEffect(()=>{
        session && router.query.inicio=='1' && concluirConteudo(session?.user?.id,`${siglaTrilha}-MOD0-C0`,session?.user?.access_token)
    },[session])
    return(
        <>
            {
                
                <SobreTrilha
                    tituloTrilha= {res[0]?.trilhas[0]?.titulo}
                    botaoVoltar= {{label: "VOLTAR",url : `/capacitacao?trilhaID=${trilhaID}`}}
                    botaoIniciar= { router.query.inicio=='1' ? {label: "INICIAR CAPACITAÇÃO",url : `/capacitacao?trilhaID=${trilhaID}`} : {url : `/capacitacao?trilhaID=${trilhaID}`} }
                    botaoWhatsapp= {{label: res[0]?.trilhas[0]?.sobre?.conteudo?.buttons[0]?.label, url : res[0]?.trilhas[0]?.sobre?.conteudo?.buttons[0]?.url}}
                    sobre= {{titulo: res[0]?.trilhas[0]?.sobre?.tituloTexto.titulo, texto:res[0]?.trilhas[0]?.sobre?.tituloTexto.texto.html}}
                    conteudo={{
                        titulo : "Cronograma",
                        texto : res[0]?.trilhas[0]?.sobre?.conteudo?.item?.map(item=>{ return {"texto" : item}})
                    }}
                    nossoTime={{
                        titulo: "Nosso Time",
                        membros: res[0]?.trilhas[0]?.sobre?.nossoTime?.map(item=>{
                            return {
                                foto : item?.foto?.url,
                                nome : item?.nome,
                                cargo : item?.cargo
                            }
                        })
                    }}
                />   
            }
        </>
    )
}

export default Index;

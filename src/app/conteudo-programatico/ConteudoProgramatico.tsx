'use client'
import { SobreTrilha } from '@impulsogov/design-system';
import { useEffect } from 'react';
import { concluirConteudo } from '@services/capacitacao';
import { Session } from 'next-auth';

interface ConteudoProgramaticoType {
    session : Session | null,
    res : any,
    siglaTrilha : string | undefined,
    trilhaID : string,
    inicio : string
}

export const ConteudoProgramatico: React.FC<ConteudoProgramaticoType> = ({
    session,
    res,
    siglaTrilha,
    trilhaID,
    inicio
}) => {
    useEffect(()=>{
        session && inicio=='1' && concluirConteudo(session?.user?.id,`${siglaTrilha}-MOD0-C0`,session?.user?.access_token)
    },[session])

    return <>
    {
        
        <SobreTrilha
            tituloTrilha= {res[0]?.trilhas[0]?.titulo}
            botaoVoltar= {{label: "VOLTAR",url : `/capacitacao?trilhaID=${trilhaID}`}}
            botaoIniciar= { inicio=='1' ? {label: "INICIAR CAPACITAÇÃO",url : `/capacitacao?trilhaID=${trilhaID}`} : {url : `/capacitacao?trilhaID=${trilhaID}`} }
            botaoWhatsapp= {{label: res[0]?.trilhas[0]?.sobre?.conteudo?.buttons[0]?.label, url : res[0]?.trilhas[0]?.sobre?.conteudo?.buttons[0]?.url}}
            sobre= {{titulo: res[0]?.trilhas[0]?.sobre?.tituloTexto.titulo, texto:res[0]?.trilhas[0]?.sobre?.tituloTexto.texto.html}}
            conteudo={{
                titulo : "Cronograma",
                texto : res[0]?.trilhas[0]?.sobre?.conteudo?.item?.map((item : any)=>{ return {"texto" : item}})
            }}
            nossoTime={{
                titulo: "Nosso Time",
                membros: res[0]?.trilhas[0]?.sobre?.nossoTime?.map((item : any)=>{
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

}
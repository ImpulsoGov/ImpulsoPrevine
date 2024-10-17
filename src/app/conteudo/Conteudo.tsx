'use client'
import { ConteudoTrilha } from '@impulsogov/design-system';
import { concluirConteudo,avaliarConteudo } from '@services/capacitacao';
import { Session } from 'next-auth';
import React, { useState } from 'react';

interface ConteudoType {
    res : any,
    ModulosLiberados : Array<number>,
    session : Session
    modulo : number,
    codigo_conteudo : string,
    trilhaID : string,
    avaliacaoConclusao : any,
    proximo : any
}

export const Conteudo : React.FC<ConteudoType> = ({
    res,
    ModulosLiberados,
    session,
    modulo,
    codigo_conteudo,
    trilhaID,
    avaliacaoConclusao,
    proximo
}) => {
    const [concluido,setConcluido] = useState(avaliacaoConclusao ? avaliacaoConclusao[0]?.concluido : false);
    const [Avaliacao,setAvaliacao] = useState(avaliacaoConclusao ? avaliacaoConclusao[0]?.avaliacao : null);
    const [starHover,setStarHover] = useState(avaliacaoConclusao ? avaliacaoConclusao[0]?.avaliacao : null)
    return <ConteudoTrilha
                avaliacao={{
                    botaoConcluido: {
                    label: 'CONCLUÍDA',
                    },
                    botaoConcluir: {
                    label: 'MARCAR COMO CONCLUÍDA',
                    submit: concluirConteudo,
                    arg:[session?.user?.id,codigo_conteudo,session?.user?.access_token]
                    },
                    req:avaliarConteudo,
                    chamadaAvaliacao: 'Como você avalia esse conteúdo?',
                    states : {
                        concluido : concluido,
                        setConcluido : setConcluido,
                        Avaliacao : Avaliacao,
                        setAvaliacao : setAvaliacao,
                        starHover : starHover,
                        setStarHover : setStarHover
                    },
                }}
                buttonBar={{
                    botaoDuvidas: {
                    icon: 'https://media.graphassets.com/yaYuyi0KS3WkqhKPUzro',
                    label: 'DÚVIDAS E SUGESTÕES',
                    url: '/duvidas'
                    },
                    botaoProximo: {
                    icon: 'https://media.graphassets.com/FopDhDizS82SqCD9vD36',
                    label: 'PRÓXIMA',
                    url: (ModulosLiberados.map((item : any) => item.modulos[0]).sort().includes(modulo+1)) ? proximo : false
                },
                    botaoVoltar: {
                    icon: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG',
                    label: 'VOLTAR',
                    url: `/capacitacao?trilhaID=${trilhaID}`
                    }
                }}
                descricao={{
                    modulo: 'MÓDULO '+modulo,
                    moduloTitulo: res?.trilhas[0]?.conteudo[modulo]?.titulo.toUpperCase(),
                    texto: res?.conteudos[0]?.tituloTexto?.texto?.html,
                    titulo: res?.conteudos[0]?.tituloTexto?.titulo,
                    trilha: res?.trilhas[0]?.titulo.toUpperCase()
                }}
                materialComplementar={
                    res?.conteudos[0]?.materialComplementar?.length>0 ?
                    {
                        titulo: 'Material Complementar',
                        card : res?.conteudos[0]?.materialComplementar?.map((item : any)=>{
                            return {
                                icon : 'https://media.graphassets.com/aFcM8jxSSyStgrfCL8Uw',
                                url : item?.url ? item?.url : '',
                                arquivo : item?.label,
                            }
                        })
                    }:undefined
                }
                conteudo={{
                    url : res?.conteudos[0]?.tipo == 'quizz' ? res?.conteudos[0]?.url+session?.user?.mail : res?.conteudos[0]?.url,
                    tipo : res?.conteudos[0]?.tipo
                }}
            />         
}
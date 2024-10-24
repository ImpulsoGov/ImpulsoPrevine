'use client'
import { Greeting, CardLarge, AtualizacaoCadastral, ModalAlert } from '@impulsogov/design-system'
import React from 'react';
import { useSession } from "next-auth/react"
import { Aps } from './Aps';


 interface InicioProps {
    cargo: string;
  }

export const Inicio : React.FC<InicioProps> = ({
    cargo,
    // data,
    // TrilhasLiberadas,
}) => {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <Greeting
                    cargo = {cargo}
                    greeting = "Bem-vindo(a)"
                    municipio_uf = {session?.user.municipio}
                    nome_usuario = {session?.user.nome}
                    texto = ""
                />

                <div style={{margin: "0 80px"}}>
                    {(session?.user.perfis.includes(5) || session?.user.perfis.includes(8)) &&
                        <Aps/>
                    }
                </div>

                {/* <div
                    style={
                        window.screen.width >= 1024 ?
                            {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                                columnGap: "24px",
                                gridRowGap: "24px",
                                marginLeft: "80px",
                                marginRight: "45px",
                                marginBottom: "20px"
                            } :
                            {
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                                marginLeft: "15px"
                            }
                    }>
                    {
                        (session?.user.perfis.includes(5) || session?.user.perfis.includes(8) || session?.user.perfis.includes(9)) &&
                        <>
                            <CardLarge
                                icon='https://media.graphassets.com/jo1S3VXcTCyTFw4Ke697'
                                links={[
                                    {
                                        label: 'Citopatológico',
                                        link: '/busca-ativa/citopatologico'
                                    },
                                    {
                                        label: 'Diabetes',
                                        link: '/busca-ativa/diabeticos?initialTitle=0&painel=0'
                                    },
                                    {
                                        label: 'Hipertensão',
                                        link: '/busca-ativa/hipertensos?initialTitle=0&painel=0'
                                    },
                                    {
                                        label: 'Pré-Natal',
                                        link: '/busca-ativa/gestantes?initialTitle=0&painel=0'
                                    },
                                    {
                                        label: 'Vacinação',
                                        link: '/busca-ativa/vacinacao'
                                    },
                                ]}
                                texto='Oferecemos listas nominais para monitoramento: gestantes, pessoas com hipertensão, pessoas com diabetes e coleta do citopatológico. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos.'
                                titulo='Listas Nominais'
                                obs="Para sair da área logada, basta ir no seu usuário no menu superior e clicar em ‘SAIR’."
                                theme="ColorIP"
                            />
                        </>
                    }
                </div>

                <div
                    style={
                        window.screen.width >= 1024 ?
                        {
                            display: "grid",
                            gridTemplateColumns: "auto auto auto",
                            columnGap: "24px",
                            gridRowGap: "24px",
                            marginLeft: "80px",
                            marginRight: "80px",
                            marginBottom: "20px"

                        } :
                        {
                            display: "grid",
                            flexDirection: "column",
                            gap: "15px",
                            marginLeft: "15px"
                        }
                }>

                    {data && session?.user.perfis.includes(7) && TrilhasLiberadas &&
                        data.map((trilha : any, index : any) => {
                            const GerarCertificado = () => {
                                // const carga_horaria = '10';
                                // generatePDF(trilha.titulo, session?.user?.nome, carga_horaria);
                                window.alert('Emissão de novos certificados não esta disponível');
                            }

                            return TrilhasLiberadas?.some((trilhaLiberada : any )=> trilhaLiberada.trilha_id == trilha.TrilhaID) &&
                                <CardTrilha
                                    titulo={trilha?.titulo}
                                    progressao={trilha.progresso}
                                    linkTrilha={trilha.progresso > 0 ? `/capacitacao?trilhaID=${trilha.TrilhaID}` : `/conteudo-programatico?trilha=${trilha.TrilhaID}&inicio=1`}
                                    Certificado={GerarCertificado}
                                    certificadoLiberado={trilha.progresso > 50}
                                    key={index}
                                />
                        })
                    }
                </div> */}
            </>
        )
    }
}
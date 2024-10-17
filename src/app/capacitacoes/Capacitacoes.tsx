'use client'
import { TituloTexto, CardTrilha } from '@impulsogov/design-system'
import React from "react"
import { Session } from "next-auth"

interface CapacitacoesType {
    res: any;
    TrilhasLiberadas: any;
    data: any;
    session : Session | null;
}

export const Capacitacoes : React.FC<CapacitacoesType> = ({
    TrilhasLiberadas,
    data,
}) => {
    return(
        <>
            <TituloTexto
                titulo="Trilhas de Capacitação"
                texto="Nossas trilhas de capacitação possuem materiais teóricos e práticos para ajudar profissionais da APS no processo de educação continuada em saúde. Comece já!"
                imagem = {{posicao: null,url: ''}}
            />
            {
                <div 
                    style={
                        window?.screen.width > 1024 ?
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
                    {
                        data.map((trilha : any,index : any)=>{
                            const GerarCertificado = () => {
                                // const carga_horaria = '10';
                                // generatePDF(trilha.titulo, session?.user?.nome, carga_horaria);
                                window.alert("Emissão de certificado não disponivel no momento")
                            }
                        
                            return TrilhasLiberadas?.some((trilhaLiberada : any)=>trilhaLiberada.trilha_id==trilha.TrilhaID) &&
                                <>
                                <CardTrilha
                                    titulo={trilha?.titulo}
                                    progressao={trilha.progresso }
                                    linkTrilha={trilha.progresso>0 ? `/capacitacao?trilhaID=${trilha.TrilhaID}` : `/conteudo-programatico?trilha=${trilha.TrilhaID}&inicio=1`}
                                    Certificado= {GerarCertificado} 
                                    certificadoLiberado= {trilha.progresso>50}
                                    key={index}
                                />
                                </>
                        })
                    }
                </div>
            }
        </>
    )
}


'use client'
import { ModulosTrilha } from '@impulsogov/design-system'
import React, { useEffect, useState } from 'react';

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth ] = useState<number | undefined>(undefined);
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
  
        window.addEventListener('resize', handleWindowResize);
        handleWindowResize()
        return () => window.removeEventListener('resize', handleWindowResize);
      
    },[]);
    return windowWidth;
  };

interface CapacitacaoType {
    data: any;
    capacitacaoDataCMS: any;
    conteudosData: any;
    trilhaID: string;
    url : string | null;
}
export const Capacitacao : React.FC<CapacitacaoType> = ({
    data,
    capacitacaoDataCMS,
    conteudosData,
    trilhaID,
    url
}) => {
    const width = useWindowWidth() || 1024;
    const modulo = url?.split("&")[1]?.split("=")[1]
    console.log('teste : ',modulo)
    return <>
    {
      capacitacaoDataCMS?.trilhas.length>0 && data &&
        <ModulosTrilha
            tituloTrilha= {capacitacaoDataCMS.trilhas[0].titulo}
            botaoVoltar= {{label: "VOLTAR",url:"/capacitacoes"}}
            botaoWhatsapp= {{label: "ENTRAR NO GRUPO DO WHATSAPP",url:"https://chat.whatsapp.com/Hx9x1fi1SiS7pn5XIq6pI1"}}
            modulos={data}
            modulo={conteudosData[0]}
            ultimoModulo = {modulo ? modulo : Number(conteudosData[1]) }
            mobile= {width < 1023}
            checkSobre={conteudosData[2]}
            trilhaID={trilhaID}
        />
    }
  </>
}

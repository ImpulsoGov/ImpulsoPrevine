'use client'
import React, { useEffect, useState } from 'react';
import { useRouter,usePathname } from 'next/navigation';
import { Session } from "next-auth";
import { Spinner } from "@impulsogov/design-system";    
import dynamic from 'next/dynamic';
const GestantesAPS = dynamic(() => import('./GestantesAPS').then(mod => mod.GestantesAPS), { 
    ssr: false,
    loading: () => <Spinner/>
});
const GestantesEquipe = dynamic(() => import('./GestantesEquipe').then(mod => mod.GestantesEquipe), { 
    ssr: false,
    loading: () => <Spinner/>
});

interface GestantesProps {
    session: Session | null;
    tabelaDataAPS: any;
    tabelaDataEquipe: any;
}

export const Gestantes : React.FC<GestantesProps> = ({
    session,
    tabelaDataAPS,
    tabelaDataEquipe,
}) => {
    const [showSnackBar, setShowSnackBar] = useState({
        open: false
      })
    const [voltarGatilho, setVoltarGatilho] = useState(0);
    const [tabelaData, setTabelaData] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
    const [filtros_aplicados, setFiltros_aplicados] = useState(false);
    const router = useRouter();
    const path = usePathname();
    const visao = session?.user.perfis.includes(5) || session?.user.perfis.includes(8) ? "aps" : "equipe"
    useEffect(() => {router.push(`${path}?visao=${visao}`)}, [visao]);
    const Voltar = () => window.history.go(voltarGatilho * (-2))
    useEffect(() => {setVoltarGatilho(voltarGatilho + 1)}, [path])
    if (!session) return <Spinner/>

    if (session.user.perfis.includes(9)) return <GestantesEquipe
    tabelaDataEquipe={tabelaDataEquipe}
    tabelaData={tabelaData}
    setTabelaData={setTabelaData}
    activeTabIndex={activeTabIndex}
    setActiveTabIndex={setActiveTabIndex}
    activeTitleTabIndex={activeTitleTabIndex}
    setActiveTitleTabIndex={setActiveTitleTabIndex}
    Voltar={Voltar}
    showSnackBar={showSnackBar}
    setShowSnackBar={setShowSnackBar}
    filtros_aplicados={filtros_aplicados}
    setFiltros_aplicados={setFiltros_aplicados}
    />
    if (session.user.perfis.includes(5) || session.user.perfis.includes(8)) return <GestantesAPS
    tabelaDataAPS={tabelaDataAPS}
    tabelaData={tabelaData}
    setTabelaData={setTabelaData}
    showSnackBar={showSnackBar}
    setShowSnackBar={setShowSnackBar}
    Voltar={Voltar}
    activeTabIndex={activeTabIndex}
    setActiveTabIndex={setActiveTabIndex}
    activeTitleTabIndex={activeTitleTabIndex}
    setActiveTitleTabIndex={setActiveTitleTabIndex}
    filtros_aplicados={filtros_aplicados}
    setFiltros_aplicados={setFiltros_aplicados}
    />
}


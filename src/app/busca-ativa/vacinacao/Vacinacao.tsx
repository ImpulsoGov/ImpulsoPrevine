'use client'
import React, { useState , useEffect} from 'react';
import { useRouter,usePathname } from 'next/navigation';
import { VacinacaoEquipe } from "./VacinacaoEquipe";
import { VacinacaoAPS } from "./VacinacaoAPS";
import { Session } from "next-auth";
import { Spinner } from "@impulsogov/design-system";    

interface VacinacaoProps {
    session: Session | null;
    tabelaDataAPS: any;
    tabelaDataEquipe: any;
}

export const Vacinacao : React.FC<VacinacaoProps> = ({
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
    useEffect(() => {router.push(`${path}?aba=${activeTitleTabIndex}&sub_aba=${activeTabIndex}&visao=${visao}`)}, [visao, activeTabIndex, activeTitleTabIndex]);
    const Voltar = () => window.history.go(voltarGatilho * (-1))
    useEffect(() => {setVoltarGatilho(voltarGatilho + 1)}, [path])
    if (!session) return <Spinner/>

    if (session.user.perfis.includes(9)) return <VacinacaoEquipe
    tabelaDataEquipe={tabelaDataEquipe}
    tabelaData={tabelaData}
    setTabelaData={setTabelaData}
    showSnackBar={showSnackBar}
    setShowSnackBar={setShowSnackBar}
    Voltar={Voltar}
    session={session}
    activeTabIndex={activeTabIndex}
    setActiveTabIndex={setActiveTabIndex}
    activeTitleTabIndex={activeTitleTabIndex}
    setActiveTitleTabIndex={setActiveTitleTabIndex}
    filtros_aplicados={filtros_aplicados}
    setFiltros_aplicados={setFiltros_aplicados}
    />
    if (session.user.perfis.includes(5) || session.user.perfis.includes(8)) return <VacinacaoAPS
    tabelaDataAPS={tabelaDataAPS}
    tabelaData={tabelaData}
    setTabelaData={setTabelaData}
    showSnackBar={showSnackBar}
    setShowSnackBar={setShowSnackBar}
    Voltar={Voltar}
    session={session}
    activeTabIndex={activeTabIndex}
    setActiveTabIndex={setActiveTabIndex}
    activeTitleTabIndex={activeTitleTabIndex}
    setActiveTitleTabIndex={setActiveTitleTabIndex}
    filtros_aplicados={filtros_aplicados}
    setFiltros_aplicados={setFiltros_aplicados}
    />
}


'use client'
import React, { useEffect, useState } from 'react';

import { HipertensaoAPS } from "./HipertensaoAPS";
import { HipertensaoEquipe } from "./HipertensaoEquipe";

import { useRouter,usePathname } from 'next/navigation';
import { Session } from "next-auth";
import { Spinner } from "@impulsogov/design-system"
import { dispararEventoAbrirImpressaoAPS, dispararEventoAbrirImpressaoEquipe } from "@helpers/eventosImpressaoHotjar";

interface HipertensaoProps {
    session: Session | null;
    tabelaDataAPS: any;
    tabelaDataEquipe: any;
}

export const Hipertensao : React.FC<HipertensaoProps> = ({
    session,
    tabelaDataAPS,
    tabelaDataEquipe,
}) => {
    const [showSnackBar, setShowSnackBar] = useState({
        open: false
      })
    const [filtros_aplicados, setFiltros_aplicados] = useState(false)
    const [voltarGatilho, setVoltarGatilho] = useState(0);
    const [tabelaData, setTabelaData] = useState([]);
    const router = useRouter();
    const path = usePathname();
    const visao = session?.user.perfis.includes(5) || session?.user.perfis.includes(8) ? "aps" : "equipe"
    useEffect(() => {router.push(`${path}?visao=${visao}&aba=${''}&sub_aba=${''}`)}, [visao]);
    const Voltar = () => window.history.go(voltarGatilho * (-1))
    useEffect(() => {setVoltarGatilho(voltarGatilho + 1)}, [path])
    if (!session) return <Spinner/>

    if (session.user.perfis.includes(9)) return <HipertensaoEquipe
    tabelaDataEquipe={tabelaDataEquipe}
    tabelaData={tabelaData}
    setTabelaData={setTabelaData}
    showSnackBar={showSnackBar}
    setShowSnackBar={setShowSnackBar}
    filtros_aplicados={filtros_aplicados}
    setFiltros_aplicados={setFiltros_aplicados}
    dispararEventoAbrirImpressaoEquipe={dispararEventoAbrirImpressaoEquipe}
    Voltar={Voltar}
    />
    if (session.user.perfis.includes(5) || session.user.perfis.includes(8)) return <HipertensaoAPS
    tabelaDataAPS={tabelaDataAPS}
    tabelaData={tabelaData}
    setTabelaData={setTabelaData}
    filtros_aplicados={filtros_aplicados}
    setFiltros_aplicados={setFiltros_aplicados}
    showSnackBar={showSnackBar}
    setShowSnackBar={setShowSnackBar}
    dispararEventoAbrirImpressaoAPS={dispararEventoAbrirImpressaoAPS}
    Voltar={Voltar}
    />
  
}


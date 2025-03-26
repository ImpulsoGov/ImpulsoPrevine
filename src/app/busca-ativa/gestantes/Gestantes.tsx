"use client";
import type { Session } from "next-auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import type { TabelaResponse } from "@/services/busca_ativa/Cito";

const Spinner = dynamic(() =>
    import("@impulsogov/design-system").then((mod) => mod.Spinner),
);

const GestantesAPS = dynamic(
    () => import("./GestantesAPS").then((mod) => mod.GestantesAPS),
    {
        ssr: false,
        loading: () => <Spinner />,
    },
);
const GestantesEquipe = dynamic(
    () => import("./GestantesEquipe").then((mod) => mod.GestantesEquipe),
    {
        ssr: false,
        loading: () => <Spinner />,
    },
);

interface GestantesProps {
    session: Session | null;
    tabelaDataAPS: TabelaResponse | null;
    tabelaDataEquipe: TabelaResponse | null;
}

export const Gestantes: React.FC<GestantesProps> = ({
    session,
    tabelaDataAPS,
    tabelaDataEquipe,
}) => {
    const [showSnackBar, setShowSnackBar] = useState({
        open: false,
    });
    const [tabelaData, setTabelaData] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
    const [filtrosAplicados, setFiltrosAplicados] = useState(false);
    const router = useRouter();
    const visao =
        session?.user.perfis.includes(5) || session?.user.perfis.includes(8)
            ? "aps"
            : "equipe";
    useEffect(() => {
        router.push(
            `?aba=${activeTitleTabIndex}&sub_aba=${activeTabIndex}&visao=${visao}`,
        );
    }, [visao, activeTabIndex, activeTitleTabIndex, router]);
    const Voltar = () => window.history.go(-1);
    if (!session) return <Spinner />;

    if (session.user.perfis.includes(9))
        return (
            <GestantesEquipe
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
                filtros_aplicados={filtrosAplicados}
                setFiltros_aplicados={setFiltrosAplicados}
            />
        );
    if (session.user.perfis.includes(5) || session.user.perfis.includes(8))
        return (
            <GestantesAPS
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
                filtros_aplicados={filtrosAplicados}
                setFiltros_aplicados={setFiltrosAplicados}
            />
        );
};

"use client";
import {
    dispararEventoAbrirImpressaoAPS,
    dispararEventoAbrirImpressaoEquipe,
} from "@helpers/eventosImpressaoHotjar";
import type { Session } from "next-auth";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import type { TabelaResponse } from "@/services/busca_ativa/Cito";
const Spinner = dynamic(() =>
    import("@impulsogov/design-system").then((mod) => mod.Spinner),
);

const DiabetesAPS = dynamic(
    () => import("./DiabetesAPS").then((mod) => mod.DiabetesAPS),
    {
        ssr: false,
        loading: () => <Spinner />,
    },
);
const DiabetesEquipe = dynamic(
    () => import("./DiabetesEquipe").then((mod) => mod.DiabetesEquipe),
    {
        ssr: false,
        loading: () => <Spinner />,
    },
);

interface DiabetesProps {
    session: Session | null;
    tabelaDataAPS: TabelaResponse | null;
    tabelaDataEquipe: TabelaResponse | null;
}

export const Diabetes: React.FC<DiabetesProps> = ({
    session,
    tabelaDataAPS,
    tabelaDataEquipe,
}) => {
    const [showSnackBar, setShowSnackBar] = useState({
        open: false,
    });
    const [filtrosAplicados, setFiltrosAplicados] = useState(false);
    const [tabelaData, setTabelaData] = useState([]);
    const router = useRouter();
    const path = usePathname();
    const Voltar = () => window.history.go(-1);
    useEffect(() => {
        if (!session) return;
        const visao =
            session?.user.perfis.includes(5) || session?.user.perfis.includes(8)
                ? "aps"
                : "equipe";
        const newUrl = `${path}?aba=${""}&sub_aba=${""}&visao=${visao}`;
        if (
            window.location.search !==
            new URL(newUrl, window.location.origin).search
        ) {
            router.replace(newUrl); // Usa replace ao invés de push para evitar loops
        }
    }, [path, session, router.replace]);

    if (!session) return <Spinner />;

    if (session.user.perfis.includes(9))
        return (
            <DiabetesEquipe
                tabelaDataEquipe={tabelaDataEquipe}
                tabelaData={tabelaData}
                setTabelaData={setTabelaData}
                showSnackBar={showSnackBar}
                setShowSnackBar={setShowSnackBar}
                setFiltros_aplicados={setFiltrosAplicados}
                dispararEventoAbrirImpressaoEquipe={
                    dispararEventoAbrirImpressaoEquipe
                }
                Voltar={Voltar}
            />
        );
    if (session.user.perfis.includes(5) || session.user.perfis.includes(8))
        return (
            <DiabetesAPS
                tabelaDataAPS={tabelaDataAPS}
                tabelaData={tabelaData}
                setTabelaData={setTabelaData}
                showSnackBar={showSnackBar}
                setShowSnackBar={setShowSnackBar}
                filtros_aplicados={filtrosAplicados}
                setFiltros_aplicados={setFiltrosAplicados}
                dispararEventoAbrirImpressaoAPS={
                    dispararEventoAbrirImpressaoAPS
                }
                Voltar={Voltar}
            />
        );
};

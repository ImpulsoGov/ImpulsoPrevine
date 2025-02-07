"use client";
import type { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react"
import dynamic from "next/dynamic";
import type { TabelaResponse } from "@/services/busca_ativa/Cito";

const Spinner = dynamic(() => import("@impulsogov/design-system").then((mod) => mod.Spinner));
const VacinacaoAPS = dynamic(
	() => import("./VacinacaoAPS").then((mod) => mod.VacinacaoAPS),
	{
		ssr: false,
		loading: () => <Spinner />,
	},
);
const VacinacaoEquipe = dynamic(
	() => import("./VacinacaoEquipe").then((mod) => mod.VacinacaoEquipe),
	{
		ssr: false,
		loading: () => <Spinner />,
	},
);

interface VacinacaoProps {
	session: Session | null;
	tabelaDataAPS: TabelaResponse | null;
	tabelaDataEquipe: TabelaResponse | null;
}

export const Vacinacao: React.FC<VacinacaoProps> = ({
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
	const path = usePathname();
	useEffect(() => {
		if (!session) return;
		const visao =
			session?.user.perfis.includes(5) || session?.user.perfis.includes(8)
				? "aps"
				: "equipe";
				const newUrl = `${path}?aba=${activeTitleTabIndex}&sub_aba=${activeTabIndex}&visao=${visao}`;
				if (window.location.search !== new URL(newUrl, window.location.origin).search) {
					router.replace(newUrl); // Usa replace ao invés de push para evitar loops
				}
	}, [activeTitleTabIndex,activeTabIndex, path, session, router.replace]);
	const Voltar = () => window.history.go(-1);
	console.log(tabelaDataAPS)
	if (!session) return <Spinner />;

	if (session.user.perfis.includes(9))
		return (
			<VacinacaoEquipe
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
				filtros_aplicados={filtrosAplicados}
				setFiltros_aplicados={setFiltrosAplicados}
			/>
		);
	if ((session.user.perfis.includes(5) || session.user.perfis.includes(8)))
		return (
			<VacinacaoAPS
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
				filtros_aplicados={filtrosAplicados}
				setFiltros_aplicados={setFiltrosAplicados}
			/>
		);
};

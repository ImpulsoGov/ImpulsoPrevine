"use client";
import {
	dispararEventoAbrirImpressaoAPS,
	dispararEventoAbrirImpressaoEquipe,
} from "@helpers/eventosImpressaoHotjar";
import mixpanel from "mixpanel-browser";
import type { Session } from "next-auth";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import type { TabelaResponse } from "@services/busca_ativa/Cito";
import { useEffect, useState } from "react";

const Spinner = dynamic(() => import("@impulsogov/design-system").then((mod) => mod.Spinner));
const CitoAps = dynamic(() => import("./CitoAPS").then((mod) => mod.CitoAPS), {
	ssr: false,
	loading: () => <Spinner />,
});
const CitoEquipe = dynamic(
	() => import("./CitoEquipe").then((mod) => mod.CitoEquipe),
	{
		ssr: false,
		loading: () => <Spinner />,
	},
);

interface CitoProps {
	tabelaDataAPS: TabelaResponse | null;
	tabelaDataEquipe: TabelaResponse | null;
	session: Session | null;
}
export const Cito: React.FC<CitoProps> = ({
	tabelaDataAPS,
	tabelaDataEquipe,
	session,
}) => {
	const [showSnackBar, setShowSnackBar] = useState({
		open: false,
	});
	const [filtrosAplicados, setFiltrosAplicados] = useState(false);
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
	const [tabelaData, setTabelaData] = useState([]);
	const router = useRouter();
	const path = usePathname();
	const Voltar = () => window.history.go(-1)
	useEffect(() => {
		if (!session) return;
		const visao =
			session?.user.perfis.includes(5) || session?.user.perfis.includes(8)
				? "aps"
				: "equipe";
				const newUrl = `${path}?aba=${""}&sub_aba=${activeTabIndex}&visao=${visao}`;
				if (window.location.search !== new URL(newUrl, window.location.origin).search) {
					router.replace(newUrl); // Usa replace ao invés de push para evitar loops
				}
	}, [activeTabIndex, path, session, router.replace]);

	if (!session) return <Spinner />;

	if (session.user.perfis.includes(9))
		return (
			<CitoEquipe
				tabelaDataEquipe={tabelaDataEquipe}
				tabelaData={tabelaData}
				setTabelaData={setTabelaData}
				mixpanel={mixpanel}
				showSnackBar={showSnackBar}
				setShowSnackBar={setShowSnackBar}
				setFiltros_aplicados={setFiltrosAplicados}
				dispararEventoAbrirImpressaoEquipe={dispararEventoAbrirImpressaoEquipe}
				Voltar={Voltar}
				activeTitleTabIndex={activeTitleTabIndex}
				activeTabIndex={activeTabIndex}
				setActiveTabIndex={setActiveTabIndex}
				setActiveTitleTabIndex={setActiveTitleTabIndex}
			/>
		);
	if (session.user.perfis.includes(5) || session.user.perfis.includes(8))
		return (
			<CitoAps
				tabelaDataAPS={tabelaDataAPS}
				tabelaData={tabelaData}
				setTabelaData={setTabelaData}
				mixpanel={mixpanel}
				showSnackBar={showSnackBar}
				setShowSnackBar={setShowSnackBar}
				filtros_aplicados={filtrosAplicados}
				setFiltros_aplicados={setFiltrosAplicados}
				dispararEventoAbrirImpressaoAPS={dispararEventoAbrirImpressaoAPS}
				Voltar={Voltar}
				activeTitleTabIndex={activeTitleTabIndex}
				activeTabIndex={activeTabIndex}
				setActiveTabIndex={setActiveTabIndex}
				setActiveTitleTabIndex={setActiveTitleTabIndex}
			/>
		);
	return <Spinner />;
};

"use client";
import type React from "react";
import { useEffect, useState } from "react";

import {
	dispararEventoAbrirImpressaoAPS,
	dispararEventoAbrirImpressaoEquipe,
} from "@helpers/eventosImpressaoHotjar";
import type { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import type { TabelaResponse } from "@/services/busca_ativa/Cito";
const Spinner = dynamic(() => import("@impulsogov/design-system").then((mod) => mod.Spinner));


import dynamic from "next/dynamic";
const HipertensaoAPS = dynamic(
	() => import("./HipertensaoAPS").then((mod) => mod.HipertensaoAPS),
	{
		ssr: false,
		loading: () => <Spinner />,
	},
);
const HipertensaoEquipe = dynamic(
	() => import("./HipertensaoEquipe").then((mod) => mod.HipertensaoEquipe),
	{
		ssr: false,
		loading: () => <Spinner />,
	},
);

interface HipertensaoProps {
	session: Session | null;
	tabelaDataAPS: TabelaResponse | null;
	tabelaDataEquipe: TabelaResponse | null;
}

export const Hipertensao: React.FC<HipertensaoProps> = ({
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
	const visao =
		session?.user.perfis.includes(5) || session?.user.perfis.includes(8)
			? "aps"
			: "equipe";
	useEffect(() => {
		router.push(`${path}?aba=${""}&sub_aba=${""}&visao=${visao}`);
	}, [visao, router, path]);
	const Voltar = () => window.history.go(-1);
	if (!session) return <Spinner />;

	if (session.user.perfis.includes(9))
		return (
			<HipertensaoEquipe
				tabelaDataEquipe={tabelaDataEquipe}
				tabelaData={tabelaData}
				setTabelaData={setTabelaData}
				showSnackBar={showSnackBar}
				setShowSnackBar={setShowSnackBar}
				filtros_aplicados={filtrosAplicados}
				setFiltros_aplicados={setFiltrosAplicados}
				dispararEventoAbrirImpressaoEquipe={dispararEventoAbrirImpressaoEquipe}
				Voltar={Voltar}
			/>
		);
	if (session.user.perfis.includes(5) || session.user.perfis.includes(8))
		return (
			<HipertensaoAPS
				tabelaDataAPS={tabelaDataAPS}
				tabelaData={tabelaData}
				setTabelaData={setTabelaData}
				filtros_aplicados={filtrosAplicados}
				setFiltros_aplicados={setFiltrosAplicados}
				showSnackBar={showSnackBar}
				setShowSnackBar={setShowSnackBar}
				dispararEventoAbrirImpressaoAPS={dispararEventoAbrirImpressaoAPS}
				Voltar={Voltar}
			/>
		);
};

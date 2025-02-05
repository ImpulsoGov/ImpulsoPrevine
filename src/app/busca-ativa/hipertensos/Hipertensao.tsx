"use client";
import type React from "react";
import { useEffect, useState } from "react";

import {
	dispararEventoAbrirImpressaoAPS,
	dispararEventoAbrirImpressaoEquipe,
} from "@helpers/eventosImpressaoHotjar";
import { Spinner } from "@impulsogov/design-system";
import type { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";

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
	tabelaDataAPS: any;
	tabelaDataEquipe: any;
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
	const [voltarGatilho, setVoltarGatilho] = useState(0);
	const [tabelaData, setTabelaData] = useState([]);
	const router = useRouter();
	const path = usePathname();
	const visao =
		session?.user.perfis.includes(5) || session?.user.perfis.includes(8)
			? "aps"
			: "equipe";
	useEffect(() => {
		router.push(`${path}?aba=${""}&sub_aba=${""}&visao=${visao}`);
	}, [visao]);
	const Voltar = () => window.history.go(voltarGatilho * -1);
	useEffect(() => {
		setVoltarGatilho(voltarGatilho + 1);
	}, [path]);
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

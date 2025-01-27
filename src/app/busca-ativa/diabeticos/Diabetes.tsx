"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Spinner } from "@impulsogov/design-system";
import {
	dispararEventoAbrirImpressaoAPS,
	dispararEventoAbrirImpressaoEquipe,
} from "@helpers/eventosImpressaoHotjar";
import dynamic from "next/dynamic";
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
	tabelaDataAPS: any;
	tabelaDataEquipe: any;
}

export const Diabetes: React.FC<DiabetesProps> = ({
	session,
	tabelaDataAPS,
	tabelaDataEquipe,
}) => {
	const [showSnackBar, setShowSnackBar] = useState({
		open: false,
	});
	const [filtros_aplicados, setFiltros_aplicados] = useState(false);
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
	const Voltar = () => window.history.go(voltarGatilho * -2);
	useEffect(() => {
		setVoltarGatilho(voltarGatilho + 1);
	}, [path]);

	if (!session) return <Spinner />;

	if (session.user.perfis.includes(9))
		return (
			<DiabetesEquipe
				tabelaDataEquipe={tabelaDataEquipe}
				tabelaData={tabelaData}
				setTabelaData={setTabelaData}
				showSnackBar={showSnackBar}
				setShowSnackBar={setShowSnackBar}
				setFiltros_aplicados={setFiltros_aplicados}
				dispararEventoAbrirImpressaoEquipe={dispararEventoAbrirImpressaoEquipe}
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
				filtros_aplicados={filtros_aplicados}
				setFiltros_aplicados={setFiltros_aplicados}
				dispararEventoAbrirImpressaoAPS={dispararEventoAbrirImpressaoAPS}
				Voltar={Voltar}
			/>
		);
};

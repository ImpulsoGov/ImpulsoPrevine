import { useSession } from "next-auth/react";
import React, { useMemo } from "react";
import {
	formatarQuadrimestres,
	obterDadosQuadrimestre,
} from "@utils/quadrimestre";
import styles from "./MunicipioQuadrimestre.module.css";

interface MunicipioQuadrimestreProps {
	data: Date | string | number;
}
const MunicipioQuadrimestre: React.FC<MunicipioQuadrimestreProps> = ({
	data,
}) => {
	const { data: session } = useSession();
	const quadrimestreFormatado = useMemo(() => {
		if (data) {
			const dadosQuadriAtual = obterDadosQuadrimestre(data);
			return ` - ${formatarQuadrimestres([dadosQuadriAtual])}`;
		}

		return "";
	}, [data]);
	if (!session) return null;
	return (
		<div className={styles.Container}>
			{session.user.municipio + quadrimestreFormatado}
		</div>
	);
};

export default MunicipioQuadrimestre;

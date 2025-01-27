import React from "react";

interface PainelComLegendaType {
	children?: React.ReactNode;
}

export const PainelComLegenda: React.FC<PainelComLegendaType> = ({
	children,
}) => {
	return (
		<div
			style={{
				margin: "0 80px 40px",
				backgroundColor: "#D7F2F6",
				padding: "30px 0",
				borderRadius: "10px",
				fontSize: "13px",
				paddingLeft: "30px",
			}}
		>
			{children}
			<div>
				<strong style={{ fontSize: "16px" }}>Legenda</strong>
				<br />
				<br />
				<b>Tipo de diagnóstico:</b>
				<br />
				<p>
					Autorreferido - a condição foi identificada como “autorreferida”
					quando é relatada pelo usuário na realização do Cadastro Individual.
				</p>
				<p>
					Diagnóstico Clínico - a condição foi identificada como “diagnóstico
					clínico” por haver atendimento individual confirmando o diagnóstico.
				</p>
			</div>
		</div>
	);
};

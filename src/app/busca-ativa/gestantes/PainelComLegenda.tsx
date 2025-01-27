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
				<b>IG: </b>Idade gestacional em semanas.
				<br />
				<br />
				<b>DPP: </b>Data provável do parto.
				<br />
				<br />
				<b>DUM: </b>Data da última menstruação informada pela paciente ou pela
				ultrassonografia.
			</div>
		</div>
	);
};

export const PainelComLegendaIndUm: React.FC<PainelComLegendaType> = ({
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
				<b>IG: </b>Idade gestacional em semanas.
				<br />
				<br />
				<b>DPP: </b>Data provável do parto.
			</div>
		</div>
	);
};
export const PainelComLegendaInd2e3: React.FC<PainelComLegendaType> = ({
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
				<b>DPP: </b>Data provável do parto.
			</div>
		</div>
	);
};

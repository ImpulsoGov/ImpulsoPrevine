import { Alert_v4, ModalAlertDisplay } from "@impulsogov/design-system";
import { useEffect, useState } from "react";

export const BannerWebinarMounted = () => {
	const [display, setDisplay] = useState(true);
	const [displayBannerWebinar, setDisplayBannerWebinar] = useState(true);
	useEffect(() => {
		if (!display) localStorage.setItem("DisplayBannerWebinar", "false");
		setDisplayBannerWebinar(!!localStorage.getItem("DisplayBannerWebinar"));
	}, [display]);

	return (
		!displayBannerWebinar && (
			<ModalAlertDisplay
				displayStates={{ display, setDisplay }}
				Child={Alert_v4}
				childProps={{
					titulos: {
						Titulo: "Gestão em Saúde",
						SubTitulo: "Desafios e Oportunidades:",
					},
					Info: [
						{
							icon: "https://media.graphassets.com/mK0XWA2qSyK3tSPER5SM",
							info: "12/02",
						},
						{
							icon: "https://media.graphassets.com/Bsq3OasQQxWNFuN0Ldhs",
							info: "19 horas",
						},
						{
							icon: "https://media.graphassets.com/wb3wQPKRQY6o1Mb7pLzE",
							info: "Online",
						},
						{
							icon: "https://media.graphassets.com/Ui2qHF9IR9WyqEQv8H1v",
							info: "Gratuito",
						},
					],
					cardProfissional_1: {
						profissional: "https://media.graphassets.com/vp07GR3SD2PyhHcdIBS0",
						logo: "https://media.graphassets.com/et6MBNobT9OA39JxsjNi",
						nome: "Verineida Lima",
						cargo: "Enfermeira e Mestre em Ensino na Saúde",
					},
					cardProfissional_2: {
						profissional: "https://media.graphassets.com/oqZ1IfJQT9yzzcjEWtL3",
						logo: "https://media.graphassets.com/et6MBNobT9OA39JxsjNi",
						nome: "Fernanda Soares",
						cargo: "Especialista em Saúde Coletiva",
					},
					botao: {
						label: "GARANTA JÁ SUA INSCRIÇÃO",
						url: "https://bit.ly/webinar-gestao-em-saude3",
					},
				}}
			/>
		)
	);
};

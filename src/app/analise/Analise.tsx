"use client";
import dynamic from 'next/dynamic';
import type React from "react";
import type { JSX } from "react";

const ButtonColor = dynamic<{
	label: string;
	link: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.ButtonColor));
const CardAlert = dynamic<{
	background: string;
	padding: string;
	margin: string;
	color: string;
	destaque: JSX.Element;
	msg: JSX.Element;
}>(() => import('@impulsogov/design-system').then(mod => mod.CardAlert));
const CardIP = dynamic<{
	titulo: string;
	indicador: JSX.Element;
	descricao: JSX.Element;
}>(() => import('@impulsogov/design-system').then(mod => mod.CardIP));
const Margem = dynamic<{
	componente: JSX.Element;
}>(() => import('@impulsogov/design-system').then(mod => mod.Margem));
const NovoTituloTexto = dynamic<{
	titulo: string;
	texto: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.NovoTituloTexto));


interface CardData {
	title: string;
	description: string;
	buttonText: string;
	link: string;
}

interface AnaliseProps {
	dadosPublicos?: Record<string, unknown>;
	cardsData: CardData[];
}
export const Analise: React.FC<AnaliseProps> = ({ cardsData }) => {
	return (
		<div style={{ backgroundColor: "#E6ECF0" }}>
			<Margem
				componente={
					<>
						<div style={{ paddingTop: 80 }}> </div>
						<Margem
							componente={
									<NovoTituloTexto
										titulo="Analise os resultados do Previne Brasil nos últimos quadrimestres"
										texto="Confira gratuitamente uma nova maneira de acompanhar o desempenho de qualquer município no Previne Brasil com informações comparativas a partir dos dados públicos do SISAB.</br>"
									/>
							}
						/>
						<div style={{ paddingTop: 75 }}> </div>
					</>
				}
			/>

			<div
				style={{
					lineHeight: "24px",
				}}
			>
				<CardAlert
					background="#91D3DB"
					padding="20px 30px"
					margin="0 40px"
					color="#1F1F1F"
					destaque={<span style={{ fontSize: "16px" }}>AVISO: </span>}
					msg={
						<span style={{ fontSize: "16px" }}>
							Os dados exibidos nessa página são referentes aos critérios do
							antigo Previne Brasil. As informações permanecem disponíveis para
							consulta, mas é importante ressaltar que, com o encerramento do
							programa, os resultados apresentados não devem ser considerados
							para o cofinanciamento da Atenção Primária à Saúde.
						</span>
					}
				/>
			</div>

			<div className="cardGrid">
				{cardsData.map((card) => (
					<div key={card.title} className="cardContainer">
						<CardIP
							titulo=""
							indicador={
								<span style={{ color: "#1F1F1F", fontSize: "32px" }}>
									{" "}
									<br/>
									{card.title}{" "}
								</span>
							}
							descricao={
								<span style={{ fontSize: "18px" }}>
									{card.description}
									<div style={{ marginBottom: '8em' }}> </div>
								</span>
							}
						/>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								marginTop: "-110px",
								marginLeft: "-20px",
							}}
						>
							<ButtonColor label={card.buttonText} link={card.link} />
						</div>
					</div>
				))}
			</div>

			<style jsx>{`
            .cardGrid {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              padding: 40px;
             
            }
    
            .cardContainer {
              width: calc(33.33% - 20px);
              position: relative;
              margin-bottom: 20px;
            }
    
            @media (max-width: 1050px) {
              .cardGrid {
                flex-direction: column;
                align-items: center;
              }
    
              .cardContainer {
                width: 100%;
                padding: 20px;
              }
            }
          `}</style>
			<div style={{ paddingBottom: "105px" }}> </div>
		</div>
	);
};

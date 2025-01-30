"use client";
import { sliderCardsDataTransform } from "@helpers/slidersDataTransform";
import dynamic from 'next/dynamic';
import type { JSX } from 'react';

const FormConsultoria = dynamic<{
	title: string;
	mail: string;
	link: string;
	button: string;
	theme: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.FormConsultoria));
const Grid12Col = dynamic<{
	items: (JSX.Element | null)[];
	proporcao: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.Grid12Col));
const ImagensFull2 = dynamic<{
	imagem: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.ImagensFull2));
const Margem = dynamic<{
	componente: JSX.Element;
}>(() => import('@impulsogov/design-system').then(mod => mod.Margem));
const NovoTituloTexto = dynamic<{
	titulo: string;
	texto: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.NovoTituloTexto));
const Slider = dynamic<{
	titulo: string;
	core: { title: string; imageUrl: string }[];
	chamada: string;
	link: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.Slider));
const TituloSmallTexto = dynamic<{
	supertitulo: string;
	titulo: string;
	texto: string;
	botao: { label: string; url: string };
	imagem: { posicao: boolean | null; url: string; width?: string };
}>(() => import('@impulsogov/design-system').then(mod => mod.TituloSmallTexto));

interface SliderData {
	titulo: string;
	button: string;
	buttonLink: string;
}
interface SliderCards {
	title: string;
	imageUrl: string;
}

interface ResData {
	sliders: SliderData[];
	sliderCards: SliderCards[];
}

interface ApoioProps {
	res?: ResData | null;
}
export const Apoio: React.FC<ApoioProps> = ({ res }) => {
	return (
		<div style={{ backgroundColor: "#E6ECF0" }}>
			<Margem
				componente={
					<>
						<Margem
							componente={
								<>
									<div style={{ paddingTop: 80 }}> </div>
									<NovoTituloTexto
										titulo="Seja um município parceiro para receber apoio especializado"
										texto="A cada 3 meses, selecionamos um grupo de municípios para um ciclo de mentorias gratuitas com nosso time de especialistas em saúde pública."
									/>
									<div style={{ paddingTop: 75 }}> </div>
									<ImagensFull2 imagem="https://media.graphassets.com/FfVjftkQ3SyAspy1BUaE" />
								</>
							}
						/>
						<div id="espaco150"> </div>
						<Margem
							componente={
									<NovoTituloTexto
										titulo="Melhore o desempenho do seu município na atenção primária"
										texto="Desenvolvemos formas de facilitar as atividades de rotina dos profissionais da gestão e da assistência que atuam na atenção básica do SUS."
									/>
							}
						/>
						<div style={{ paddingTop: 50 }}> </div>
						<Grid12Col
							proporcao="5-7"
							items={[
								<>
									<img 
										src="https://media.graphassets.com/jIO4zsZmQsOPprUPJyGi" 
										alt="nosOferecemosCard1Image"
										key="nosOferecemosCard1Image"
									/>
									<TituloSmallTexto
										key="nosOferecemosCard1"
										botao={{ label: "", url: "" }}
										imagem={{
											posicao: true,
											width: "45px",
											url: "https://media.graphassets.com/M7BvFZfZT62J6SnO3hlr",
										}}
										supertitulo="<b>Ferramentas de gestão para acelerar o monitoramento nominal e a busca ativa"
										titulo=""
										texto="Gere automaticamente a lista de pacientes com consultas e exames pendentes por equipe de referência para direcionar as visitas do seu agente comunitário de saúde."
									/>
									<div style={{ paddingTop: 30 }} key="space1"> </div>
									<img 
										src="https://media.graphassets.com/JLbMSywjQniTURPqAgep" 
										alt="nosOferecemosCard2Image"
										key="nosOferecemosCard2Image"
									/>
									<TituloSmallTexto
										key="nosOferecemosCard2"
										botao={{ label: "", url: "" }}
										imagem={{ posicao: null, url: "" }}
										supertitulo="<b>Encontros de capacitação com dicas e troca de experiências entre municípios"
										titulo=""
										texto="Participe de reuniões com nosso time de sanitaristas para revisar conteúdos importantes e converse com a rede de municípios parceiros do Impulso Previne."
									/>
									<div style={{ paddingTop: 15 }} key="space2"> </div>
									<img 
										src="https://media.graphassets.com/FEyQQyfR0aCU7XN5IvnJ"
										alt="nosOferecemosCard3Image"
										key="nosOferecemosCard3Image"
									/>
									<TituloSmallTexto
										key="nosOferecemosCard3"
										botao={{ label: "", url: "" }}
										imagem={{ posicao: null, url: "" }}
										supertitulo="<b>Treinamentos sobre as principais linhas de cuidado da atenção primária"
										titulo=""
										texto="Veja materiais de apoio sobre gestantes, doenças crônicas, exame citopatológico e cadastro com informações sobre regras, registros e estratégias de cuidado à disposição para consultar quantas vezes quiser."
									/>
								</>,
									<ImagensFull2 imagem="https://media.graphassets.com/aZ5H3ZMjSD88BUdxvMBq" key="ImagensFull2"/>,
							]}
						/>
						<div id="espaco150"> </div>
						{res && (
							<Slider
								titulo={res.sliders[0].titulo}
								core={sliderCardsDataTransform(res.sliderCards)}
								chamada={res.sliders[0].button}
								link={res.sliders[0].buttonLink}
							/>
						)}
						<div id="espaco150"> </div>
						<Margem
							componente={
								<>
									<NovoTituloTexto
										titulo="Siga o passo-a-passo e faça parte da nossa rede"
										texto="Confira as etapas necessárias para formalizar a sua parceria com o Impulso Previne."
									/>
									<div style={{ paddingTop: 50 }}> </div>
									<Grid12Col
										proporcao="6-6"
										items={[
												<Margem
													key="passo1"
													componente={
														<>
															<ImagensFull2 imagem="https://media.graphassets.com/r43ZVW6rQ3ekuItEUW9P" />
															<TituloSmallTexto
																key="passo1"
																botao={{ label: "", url: "" }}
																imagem={{
																	posicao: true,
																	url: "https://media.graphassets.com/RfAzQFuVRhsuaPFSaMHg",
																}}
																supertitulo="<b>1. Formulário de inscrição"
																titulo=""
																texto="O(a) Coordenador(a) de APS ou Secretário(a) de Saúde do município deve preenchê-lo com as principais informações sobre o município."
															/>
														</>
													}
												/>,											
												<Margem
													key="passo2"
													componente={
														<>
															<ImagensFull2 imagem="https://media.graphassets.com/CCWgGFBEQYugyOYPzPz3" />
															<TituloSmallTexto
																key="passo2"
																botao={{ label: "", url: "" }}
																imagem={{ posicao: null, url: "" }}
																supertitulo="<b>2. Convite para municípios"
																titulo=""
																texto="No próximo ciclo de mentorias, a equipe do Impulso Previne entra em contato com os municípios selecionados por e-mail."
															/>
														</>
													}
												/>
											,
												<Margem
													key="passo3"
													componente={
														<>
															<ImagensFull2 imagem="https://media.graphassets.com/ByrE2VoJQsOca0J7NorQ" />
															<TituloSmallTexto
																key="passo3"
																botao={{ label: "", url: "" }}
																imagem={{ posicao: null, url: "" }}
																supertitulo="<b>3. Reunião de apresentação"
																titulo=""
																texto="Realizamos um encontro inicial para apresentação do programa e detalhamento do nosso acordo de cooperação técnica."
															/>
														</>
													}
												/>,
												<Margem
													key="passo4"
													componente={
														<>
															<ImagensFull2 imagem="https://media.graphassets.com/EYTEyJkxS2yvOcWtDTKC" />
															<TituloSmallTexto
																key="passo4"
																botao={{ label: "", url: "" }}
																imagem={{ posicao: null, url: "" }}
																supertitulo="<b>4. Parceria formada"
																titulo=""
																texto="Pronto! Seu município é nosso parceiro e pode receber nosso apoio gratuito."
															/>
														</>
													}
												/>,
										]}
									/>
								</>
							}
						/>
						<div id="espaco150"> </div>
					</>
				}
			/>
			<FormConsultoria
				title="Inscreva-se e melhore o desempenho do seu município na atenção primária"
				mail=""
				link="https://bit.ly/interesse-apoio-IP"
				button="Preencher inscrição"
				theme="IPVerde"
			/>
		</div>
	);
};

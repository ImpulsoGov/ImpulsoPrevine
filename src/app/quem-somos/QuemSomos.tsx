"use client";
import dynamic from 'next/dynamic';
import type { JSX } from 'react';

const CardAlert = dynamic<{
	background: string;
	destaque: string;
	msg: JSX.Element;
}>(() => import('@impulsogov/design-system').then(mod => mod.CardAlert));
const CardImg = dynamic<{
	descricao: string;
	imagemSrc: string;
	indicador: string;
	imagemStyle: { width: string; margin: string };
}>(() => import('@impulsogov/design-system').then(mod => mod.CardImg));
const Grid12Col = dynamic<{
	items: (JSX.Element | null)[];
	proporcao: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.Grid12Col));
const ImagensFull2 = dynamic<{
	imagem: string;
	alt?: string;
	width?: number;
}>(() => import('@impulsogov/design-system').then(mod => mod.ImagensFull2));
const Margem = dynamic<{
	componente: JSX.Element;
}>(() => import('@impulsogov/design-system').then(mod => mod.Margem));
const NovoTituloTexto = dynamic<{
	titulo: string;
	texto: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.NovoTituloTexto));
const TituloSmallTexto = dynamic<{
	botao: { label: string; url: string };
	imagem?: { posicao: boolean | null; url: string };
	supertitulo: string;
	titulo: string;
	texto: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.TituloSmallTexto));

const Parceiros = (parceiros: Parceiro[]) =>
	parceiros.map((logo: Parceiro) => (
        <Margem
			key="logo.url"
            componente={
                <ImagensFull2 imagem={logo.url} alt={logo.fileName} width={300} />
            }
        />
    ));

interface Parceiro {
	url: string;
	fileName: string;
}

interface LogoParceiros {
	logoparceiro: Parceiro[];
}

interface ResData {
	logoParceiros: LogoParceiros[];
}

interface QuemSomosProps {
	res?: ResData | null; // A prop res é opcional, já que você verifica se ela existe antes de renderizar
}
export const QuemSomos: React.FC<QuemSomosProps> = ({
	res = { logoParceiros: [] } as ResData,
}) => {
	return (
		<div style={{ backgroundColor: "#E6ECF0" }}>
			<Margem
				componente={
					<>
						<div style={{ paddingTop: 80 }}> </div>
						<div style={{ textAlign: "center" }}>
							<NovoTituloTexto
								titulo="Ajudamos os profissionais da atenção primária de forma gratuita"
								texto="O Impulso Previne é um projeto da ImpulsoGov, uma organização sem fins lucrativos e recebemos apoio de entidades filantrópicas, organizações privadas e públicas para oferecer soluções e serviços ao SUS sem nenhum custo para municípios de todo o Brasil."
							/>

							<div style={{ paddingTop: 75 }}> </div>
							<ImagensFull2 imagem="https://media.graphassets.com/Lq3Tp6uTRZe1boQkBkRo" />
						</div>
					</>
				}
			/>
			<div style={{ paddingTop: 75 }}> </div>

			<Margem
				componente={
					<>
						<div style={{ paddingTop: 80 }}> </div>

						<NovoTituloTexto
							titulo="Apoio focado na Atenção Primária à Saúde"
							texto="Damos suporte para profissionais da gestão e da assistência sobre os indicadores da atenção básica."
						/>

						<Grid12Col
							proporcao="6-6"
							items={[
									<CardImg
										key="1"
										descricao="Semanalmente enviamos para o seu e-mail sugestões para melhorar sua rotina de trabalho e mantemos você informado sobre as atualizações da APS."
										imagemSrc="https://media.graphassets.com/7G4x3fHQBSAiOz1eHpyG"
										indicador="Conteúdos e materiais com dicas"
										imagemStyle={{ width: "65%", margin: "auto" }}
									/>
								,
									<CardImg
										key="2"
										imagemSrc="https://media.graphassets.com/RDN83YVAR6yBEpg8DOLE"
										indicador="Capacitações com especialistas"
										descricao="Realizamos eventos sobre temas específicos para todas as categorias de profissionais proporcionando uma troca com nossos especialistas."
										imagemStyle={{ width: "65%", margin: "auto" }}
									/>
								,
							]}
						/>
					</>
				}
			/>

			<Margem
				componente={
					<div style={{ textAlign: "center", paddingTop: 75 }}>
						<NovoTituloTexto
							titulo="Apoio especializado para parceiros"
							texto=""
						/>

						<ImagensFull2 imagem="https://media.graphassets.com/QZVVznaoQ6est0kbxLQO" />

						<TituloSmallTexto
							botao={{ label: "", url: "" }}
							supertitulo=""
							titulo=""
							texto="Periodicamente, selecionamos municípios para se tornarem parceiros e receberem mentorias personalizadas da nossa equipe de especialistas em saúde."
						/>
					</div>
				}
			/>

			<Grid12Col
				proporcao="4-4-4"
				items={[
						<Margem
							key="1"
							componente={
									<TituloSmallTexto
										key={"1"}
										botao={{ label: "", url: "" }}
										imagem={{ posicao: true, url: "" }}
										supertitulo="<br></br>"
										titulo=""
										texto="Ferramentas de gestão para busca ativa"
									/>
							}
						/>
					,
						<Margem
							key="2"
							componente={
									<div style={{ fontSize: "24px", textAlign: "center" }}>
										<TituloSmallTexto
											key={"2"}
											botao={{ label: "", url: "" }}
											imagem={{ posicao: null, url: "" }}
											supertitulo="<b>Nós oferecemos:</b><br></br>"
											titulo=""
											texto="Treinamentos sobre boas práticas dos indicadores"
										/>
									</div>
							}
						/>
					,
						<Margem
							key="3"
							componente={
									<TituloSmallTexto
										key={"3"}
										botao={{ label: "", url: "" }}
										imagem={{ posicao: null, url: "" }}
										supertitulo="<br></br>"
										titulo=""
										texto="Encontros de dúvidas com especialistas"
									/>
							}
						/>,
				]}
			/>

			<Margem
				componente={
						<div style={{ textAlign: "center" }}>
							<TituloSmallTexto
								botao={{
									label: "INSCRIÇÃO NA CONSULTORIA",
									url: "https://bit.ly/interesse-apoio-IP",
								}}
								supertitulo=""
								titulo=""
								texto=""
							/>
						</div>
				}
			/>

			<Margem
				componente={
					<>
						<div style={{ paddingTop: 75 }}> </div>

						<NovoTituloTexto
							titulo="O Impulso Previne é um dos projetos da ImpulsoGov"
							texto="A ImpulsoGov é uma organização não governamental sem fins lucrativos que nasceu com o propósito de ajudar a corrigir um gargalo: inúmeros dados são gerados na prestação dos serviços do SUS, mas poucos são transformados em informação útil para retroalimentar e aprimorar as políticas públicas de saúde. <br><br>"
						/>

						<CardAlert
							destaque=""
							msg={
								<span style={{ color: "white", fontSize: 22 }}>
									Nossa missão é impulsionar o uso inteligente de dados e
									tecnologia no SUS para que todas as pessoas no Brasil tenham
									acesso a serviços de saúde de qualidade.
								</span>
							}
							background="#1D856C"
						/>

						<NovoTituloTexto
							titulo=""
							texto="Por isso, trabalhamos para que todos os profissionais de saúde do SUS tenham, em suas mãos, as informações e ferramentas necessárias para agir de maneira preventiva e resolutiva. Nos unimos a eles para criar produtos e soluções digitais baseadas em dados que facilitam a compreensão e a identificação de riscos de saúde da população e facilitam a tomada de decisão baseada em evidências."
						/>

						<div style={{ paddingTop: 75 }}> </div>
					</>
				}
			/>

			<Grid12Col
				proporcao="4-4-4"
				items={[
						<Margem
							key="2019"
							componente={
								<>
									<ImagensFull2
										imagem="https://media.graphassets.com/7DmsKN6lQexti5JY4MPD"
										width={90}
									/>
									<TituloSmallTexto
										key={"2020"}
										botao={{ label: "", url: "" }}
										imagem={{ posicao: true, url: "" }}
										supertitulo="<b>2020"
										titulo=""
										texto="Estivemos à frente de iniciativas de apoio no combate à Covid-19: o CoronaCidades e o Farol Covid."
									/>
								</>
							}
						/>
					,
						<Margem
							key="2021"
							componente={
								<>
									<ImagensFull2
										imagem="https://media.graphassets.com/P2PbOfc1S7ybOwn1jQ8y"
										width={90}
									/>
									<TituloSmallTexto
										key={"2021"}
										botao={{ label: "", url: "" }}
										imagem={{ posicao: null, url: "" }}
										supertitulo="<b>2021"
										titulo=""
										texto="Expandimos nossa atuação para os serviços de Atenção Primária à Saúde e Saúde Mental do SUS."
									/>
								</>
							}
						/>,
						<Margem
							key="2023"
							componente={
								<>
									<ImagensFull2
										imagem="https://media.graphassets.com/k89fnJTSqGcGlsGCndy6"
										width={90}
									/>
									<TituloSmallTexto
										key={"2023"}
										botao={{ label: "", url: "" }}
										imagem={{ posicao: null, url: "" }}
										supertitulo="<b>2023"
										titulo=""
										texto="Já apoiamos diretamente 100 municípios onde vivem 6 milhões de pessoas que dependem exclusivamente do SUS para ter acesso a qualquer serviços de saúde."
									/>
								</>
							}
						/>
					,
				]}
			/>

			<Margem
				componente={
					<>
						<div style={{ paddingTop: 75 }}> </div>

						<NovoTituloTexto
							titulo="&nbsp;&nbsp;&nbsp;Tudo que criamos para o SUS está disponível sem custos"
							texto="Contamos com uma rede de apoio institucional e financiadores e por isso podemos oferecer nosso trabalho gratuitamente.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
						/>

						<div style={{ paddingTop: 75 }}> </div>
					</>
				}
			/>

			<Margem
				componente={
						<TituloSmallTexto
							key={"apoio_financeiro"}
							botao={{ label: "", url: "" }}
							imagem={{ posicao: null, url: "" }}
							supertitulo="<b>APOIO FINANCEIRO"
							titulo=""
							texto=""
						/>
				}
			/>

			{res?.logoParceiros && res?.logoParceiros.length > 0 && (
				<Grid12Col
					proporcao="4-4-4"
					items={Parceiros(res.logoParceiros[0].logoparceiro)}
				/>
			)}
			<Margem
				componente={
						<TituloSmallTexto
							key="apoio"
							botao={{ label: "", url: "" }}
							imagem={{ posicao: null, url: "" }}
							supertitulo="<b>APOIO INSTITUCIONAL"
							titulo=""
							texto=""
						/>
				}
			/>

			<Grid12Col
				proporcao="4-4-4"
				items={[
						<Margem
							key="apoio1"
							componente={
									<ImagensFull2
										imagem="https://media.graphassets.com/6vKKZ64yQO5d34YyfbU9"
										width={300}
									/>
							}
						/>,
				]}
			/>
			<div style={{ paddingTop: 75 }}> </div>
		</div>
	);
};

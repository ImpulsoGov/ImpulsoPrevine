'use client'
import dynamic from 'next/dynamic';
import type { JSX } from 'react';

const FormConsultoria = dynamic<{
  title: string;
  mail: string;
  link: string;
  button: string;
  theme: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.FormConsultoria));
const TituloSmallTexto = dynamic<{
  supertitulo: string;
  titulo: string;
  texto: string;
  botao: {label: string; url: string;};
  imagem: {posicao: string | null; url: string;};
}>(() => import('@impulsogov/design-system').then(mod => mod.TituloSmallTexto));
const ParceriasTexto = dynamic<{
  text: string;
  parceiros: { alt: string; src: string; }[];
}>(() => import('@impulsogov/design-system').then(mod => mod.ParceriasTexto));
const CardIP = dynamic<{
  titulo: string;
  indicador: string;
  descricao: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.CardIP));
const Grid12Col = dynamic<{
  items: (JSX.Element | null)[];
  proporcao: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.Grid12Col));
const NovoTituloTexto = dynamic<{
  titulo: string;
  texto: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.NovoTituloTexto));
const ImagensFull2 = dynamic<{
  imagem: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.ImagensFull2));
const Margem = dynamic<{
  componente: JSX.Element;
}>(() => import('@impulsogov/design-system').then(mod => mod.Margem));

export const Home = () => {
	return (
		<div style={{ backgroundColor: "#E6ECF0" }}>
			<Margem
				componente={
					<>
						<div style={{ paddingTop: 80 }}> </div>
						<Margem
							componente={
								<>
									<NovoTituloTexto
										titulo="Ajudamos profissionais do SUS na gestão da atenção primária"
										texto="O Impulso Previne é uma iniciativa realizada pela ImpulsoGov, uma organização não governamental sem fins lucrativos que apoia municípios na gestão da saúde pública <b>de forma totalmente gratuita.</b>"
									/>
									<div style={{ paddingTop: 75 }}> </div>
									<ImagensFull2 imagem="https://media.graphassets.com/FSgx9FUSP2wHnXGolx0D" />
								</>
							}
						/>
						<div style={{ paddingTop: 75 }}> </div>
					</>
				}
			/>
			<ParceriasTexto
				text="“O Impulso Previne é uma solução digital que centraliza em uma plataforma dados, análises e recomendações sobre o programa de financiamento federal da Atenção Primária, o antigo Previne Brasil, para apresentá-los de forma rápida e descomplicada aos gestores de saúde.”"
				parceiros={[
					{
						alt: "folha",
						src: "https://media.graphassets.com/gjPxnSNWTY6tbtK0UXk5",
					},
				]}
			/>

			<Margem
				componente={
					<>
						<div style={{ paddingTop: 75 }}> </div>
						<TituloSmallTexto
							botao={{ label: "", url: "" }}
							imagem={{ posicao: null, url: "" }}
							supertitulo=""
							titulo="<b>Suporte para coordenação e assistência da APS</b>"
							texto="Melhore a atuação da sua unidade de saúde e do seu município com:"
						/>
						<Grid12Col
							proporcao="5-7"
							items={[
								<TituloSmallTexto
									key="municipio_parceiro"
									botao={{
										label: "SER MUNICÍPIO PARCEIRO",
										url: "https://bit.ly/interesse-apoio-IP",
									}}
									imagem={{ posicao: null, url: "" }}
									supertitulo="<b>Mentorias exclusivas</b>"
									titulo=""
									texto="Seja nosso(a) parceiro(a) para receber apoio especializado da nossa equipe e treinamentos focados nos desafios do seu município.<br><br>"
								/>,
								<ImagensFull2
									key="municipio_parceiro_imagem"
									imagem="https://media.graphassets.com/cFi4nN5ROqfp8tmESY37"
								/>,
							]}
						/>
						<Grid12Col
							proporcao="7-5"
							items={[
								<ImagensFull2
									key="materiais_imagem"
									imagem="https://media.graphassets.com/ZK6SrsUoQZutmM4bJOpX"
								/>,
								<TituloSmallTexto
									key="materiais"
									botao={{
										label: "RECEBER MATERIAIS",
										url: "https://docs.google.com/forms/d/e/1FAIpQLSdMuW8LG3MB8RsR2B9GrjsPez4WPp7SqOaLiXb1kmMOuspmkw/viewform",
									}}
									imagem={{ posicao: null, url: "" }}
									supertitulo="<b>Conteúdos gratuitos</b>"
									titulo=""
									texto="Informações sempre atualizadas sobre atenção primária à saúde diretamente por e-mail, no nosso blog e em nossas capacitações.<br/><br/>"
								/>,
							]}
						/>

						<div id="espaco150"> </div>
					</>
				}
			/>

			<Margem
				componente={
					<>
						<Grid12Col
							proporcao="3-3-3-3"
							items={[
								<>
									<ImagensFull2
										key="rede_imagem"
										imagem="https://media.graphassets.com/0SldadgShetVZtLRwCpE"
									/>
									<TituloSmallTexto
										key="rede"
										botao={{ label: "", url: "" }}
										imagem={{ posicao: null, url: "" }}
										supertitulo=""
										titulo="<b>Nós somos uma rede!</b>"
										texto=""
									/>
								</>,
								<CardIP
									key="card_1"
									titulo=""
									indicador="+12 mil profissionais do SUS"
									descricao="recebem dicas semanais sobre APS"
								/>,
								<CardIP
									key="card_2"
									titulo=""
									indicador="+300 gestores"
									descricao="usam diariamente nossas ferramentas"
								/>,
								<CardIP
									key="card_3"
									titulo=""
									indicador="+70 municípios"
									descricao="são apoiados diretamente por especialistas"
								/>,
							]}
						/>
						<div style={{ paddingTop: 75 }}> </div>
						<Grid12Col
							proporcao="6-6"
							items={[
								<TituloSmallTexto
									key="card_4"
									botao={{ label: "", url: "" }}
									imagem={{ posicao: null, url: "" }}
									supertitulo=""
									titulo="<b>Estamos fazendo a diferença nos municípios</b>"
									texto=""
								/>,
								null,
								<CardIP
									key="card_5"
									titulo="PARCEIRO DESDE 2023"
									indicador="Jandaíra/BA"
									descricao="“Depois que começa a usar não vai querer parar mais. É maravilhoso porque a gente consegue seguir no trabalho da forma como tem que seguir porque a gente já tem tudo pronto. O Impulso Previne tá dando pra gente tudo mastigado... Coisa que a gente poderia sentar pra digitar, pra escrever, e já vem pra gente prontinho.”
                      Luana de Jesus, Coordenadora de Equipe"
								/>,
								<CardIP
									key="card_6"
									titulo="PARCEIRO DESDE 2023"
									indicador="Jandaíra/BA"
									descricao="“Eu trabalho com meu território, mas tem muitos pacientes que não vem pra unidade e são cadastrados como hipertensos e diabéticos só que eu não sei se são mesmo. Então com a lista eu consigo ir fazer a busca e capturar esse paciente pra gente aqui.”
                      Ananda Larissa, Coordenadora de Equipe"
								/>,
							]}
						/>
						<div id="espaco150"> </div>
					</>
				}
			/>

			<Margem
				componente={
					<>
						<Grid12Col
							proporcao="6-6"
							items={[
								<ImagensFull2
									key="conhecer_impulso_imagem"
									imagem="https://media.graphassets.com/TxOWmwUSBOO1fnpZfRlu"
								/>,
								<TituloSmallTexto
									key="conhecer_impulso"
									botao={{
										label: "CONHECER MAIS DA IMPULSOGOV",
										url: "https://impulsogov.org/",
									}}
									imagem={{ posicao: null, url: "" }}
									supertitulo=""
									titulo="<b>Impulsionamos o SUS com dados e tecnologia</b>"
									texto="Na ImpulsoGov, acreditamos que os dados são necessários para facilitar a tomada de decisões e a tecnologia deve facilitar o dia a dia da profissional do SUS para permitir que ela foque naquilo que importa: o cuidado oferecido às pessoas.<br/><br/>O Impulso Previne é um projeto da ImpulsoGov focado em promover o uso de dados relacionados aos indicadores da Atenção Primária à Saúde. <br/><br/>"
								/>,
							]}
						/>
						<div style={{ paddingTop: 75 }}> </div>
					</>
				}
			/>

			<FormConsultoria
				title="Faça parte da nossa lista de transmissão e receba toda semana em seu e-mail dicas e atualizações sobre indicadores, portarias, registro e boas práticas na APS."
				mail=""
				link="https://docs.google.com/forms/d/e/1FAIpQLSdMuW8LG3MB8RsR2B9GrjsPez4WPp7SqOaLiXb1kmMOuspmkw/viewform"
				button="Fazer inscrição na lista"
				theme="IPVerde"
			/>
		</div>
	);
};

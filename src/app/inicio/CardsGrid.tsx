import { Indicadores, type SituacaoPorIndicador } from "@/types/inicio";
import {
	Banner,
	CardClicavel,
	CardLista,
	DetailedInfo,
	Grid12Col,
} from "@impulsogov/design-system";
import mixpanel from "mixpanel-browser";
import type React from "react";
import { DetailInfoError } from "@componentes/unmounted/Inicio/DetailInfoError"

interface CardsGridProps {
	situacaoPorIndicador: SituacaoPorIndicador;
	visao: string;
}

export const CardsGrid: React.FC<CardsGridProps> = ({
	situacaoPorIndicador,
	visao,
}) => {
	return (
		<Grid12Col
			proporcao="3-3-3-3"
			items={[
				<div
					key="cardsDiabetesEVacinacao"
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "24px",
						height: "100%",
					}}
				>
					<CardLista
						icone={{
							src: "https://media.graphassets.com/wKizPRr0T2eZhDSOxZ4n",
							alt: "Ícone de um estômago",
						}}
						titulo="Diabetes"
						descricao="Cidadãos que possuem a condição e o status de consulta e solicitação de hemoglobina."
						height="50%"
						link={{
							url: `/busca-ativa/diabeticos?aba=${""}&sub_aba=${""}&visao=${visao}`,
							newTab: false,
						}}
						onHeaderClick={() =>
							mixpanel.track("card_click", {
								card_action: "acessar_lista_diabetes",
								card_page: "pg_inicio",
							})
						}
					>
						{	
							situacaoPorIndicador[Indicadores.DIABETES]?.total || situacaoPorIndicador[Indicadores.DIABETES]?.pendente ?
							<DetailedInfo
								descricao="Pessoas com consulta ou solicitação de hemoglobina a fazer"
								destaque={situacaoPorIndicador[Indicadores.DIABETES].pendente}
								complemento={`de ${situacaoPorIndicador[Indicadores.DIABETES].total}`}
							/> :
							<DetailInfoError error="Não foi possível carregar os dados do indicador" />
						}

					</CardLista>
					<CardLista
						icone={{
							src: "https://media.graphassets.com/hXdEtm9qRDm47poV0Udr",
							alt: "Ícone de uma seringa",
						}}
						titulo="Vacinação"
						descricao="Contempla os esquemas vacinais de poliomielite e pentavalente em crianças de zero a um ano e meio."
						height="50%"
						link={{
							url: `/busca-ativa/vacinacao?aba=0&sub_aba=0&visao=${visao}`,
							newTab: false,
						}}
						onHeaderClick={() =>
							mixpanel.track("card_click", {
								card_action: "acessar_lista_vacinacao",
								card_page: "pg_inicio",
							})
						}
					>	
						{
							situacaoPorIndicador[Indicadores.VACINACAO]?.total || situacaoPorIndicador[Indicadores.VACINACAO]?.pendente ?
							<DetailedInfo
								descricao="Crianças com pelo menos uma dose em atraso"
								destaque={situacaoPorIndicador[Indicadores.VACINACAO].pendente}
								complemento={`de ${situacaoPorIndicador[Indicadores.VACINACAO].total}*`}
							/> :
							<DetailInfoError error="Não foi possível carregar os dados do indicador" />
						}
					</CardLista>
				</div>,
				<div
					key="cardsHipertensaoECito"
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "24px",
						height: "100%",
					}}
				>
					<CardLista
						icone={{
							src: "https://media.graphassets.com/d2BJhIM2TVy2gTMqM4BC",
							alt: "Ícone de um estetoscópio",
						}}
						titulo="Hipertensão"
						descricao="Cidadãos que possuem a condição e o status de consulta e aferição de pressão."
						height="50%"
						link={{
							url: `/busca-ativa/hipertensos?aba=${""}&sub_aba=${""}&visao=${visao}`,
							newTab: false,
						}}
						onHeaderClick={() =>
							mixpanel.track("card_click", {
								card_action: "acessar_lista_hipertensao",
								card_page: "pg_inicio",
							})
						}
					>
						{
							situacaoPorIndicador[Indicadores.HIPERTENSOS]?.total || situacaoPorIndicador[Indicadores.HIPERTENSOS]?.pendente ?
							<DetailedInfo
								descricao="Pessoas com consulta ou aferição de pressão a fazer"
								destaque={situacaoPorIndicador[Indicadores.HIPERTENSOS].pendente}
								complemento={`de ${situacaoPorIndicador[Indicadores.HIPERTENSOS].total}`}
							/> :
							<DetailInfoError error="Não foi possível carregar os dados do indicador" />
						}
					</CardLista>
					<CardLista
						icone={{
							src: "https://media.graphassets.com/6H2CeiquR0KEiDAee4iz",
							alt: "Ícone de um tubo de ensaio meio cheio",
						}}
						titulo="Citopatológico"
						descricao="Mostra o status todas as pessoas entre 25 e 64 anos que têm a coleta em dia, em atraso ou que nunca a realizaram."
						height="50%"
						link={{
							url: `/busca-ativa/citopatologico?aba=${""}&sub_aba=0&visao=${visao}`,
							newTab: false,
						}}
						onHeaderClick={() =>
							mixpanel.track("card_click", {
								card_action: "acessar_lista_citopatologico",
								card_page: "pg_inicio",
							})
						}
					>
						{
							situacaoPorIndicador[Indicadores.CITOPATOLOGICO]?.total || situacaoPorIndicador[Indicadores.CITOPATOLOGICO]?.pendente ?
							<DetailedInfo
								descricao="Pessoas com coleta de citopatológico a fazer"
								destaque={
									situacaoPorIndicador[Indicadores.CITOPATOLOGICO].pendente
								}
								complemento={`de ${situacaoPorIndicador[Indicadores.CITOPATOLOGICO].total}`}
							/> :
							<DetailInfoError error="Não foi possível carregar os dados do indicador" />
						}

					</CardLista>
				</div>,
				<div
					key="cardsPreNatalESuporte"
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "24px",
						height: situacaoPorIndicador[Indicadores.PRE_NATAL_6_CONSULTAS]?.total && situacaoPorIndicador[Indicadores.PRE_NATAL_6_CONSULTAS]?.pendente &&
						situacaoPorIndicador[Indicadores.PRE_NATAL_SIFILIS_HIV]?.total && situacaoPorIndicador[Indicadores.PRE_NATAL_SIFILIS_HIV]?.pendente &&
						situacaoPorIndicador[Indicadores.PRE_NATAL_ODONTO]?.total && situacaoPorIndicador[Indicadores.PRE_NATAL_ODONTO]?.pendente ? "100%" : "fit-content",
					}}
				>
					<CardLista
						icone={{
							src: "https://media.graphassets.com/YQYyv3URTiNRGv6kWsfg",
							alt: "Ícone de um carrinho de bebê",
						}}
						titulo="Pré-Natal"
						descricao="Considera o status dos exames de sífilis e HIV, atendimento odontológico e número de consultas das gestantes."
						link={{
							url: `/busca-ativa/gestantes?aba=0&sub_aba=0&visao=${visao}`,
							newTab: false,
						}}
						onHeaderClick={() =>
							mixpanel.track("card_click", {
								card_action: "acessar_lista_pre_natal",
								card_page: "pg_inicio",
							})
						}
					>
						{
							situacaoPorIndicador[Indicadores.PRE_NATAL_6_CONSULTAS]?.total && situacaoPorIndicador[Indicadores.PRE_NATAL_6_CONSULTAS]?.pendente &&
							situacaoPorIndicador[Indicadores.PRE_NATAL_SIFILIS_HIV]?.total && situacaoPorIndicador[Indicadores.PRE_NATAL_SIFILIS_HIV]?.pendente &&
							situacaoPorIndicador[Indicadores.PRE_NATAL_ODONTO]?.total && situacaoPorIndicador[Indicadores.PRE_NATAL_ODONTO]?.pendente ?
							<>
							<DetailedInfo
								descricao="Gestantes com menos de 6 consultas de pré-natal**"
								destaque={
									situacaoPorIndicador[Indicadores?.PRE_NATAL_6_CONSULTAS].pendente
								}
								complemento={`de ${situacaoPorIndicador[Indicadores?.PRE_NATAL_6_CONSULTAS].total}`}
							/>
							<DetailedInfo
								descricao="Gestantes sem o exame de Sífilis ou de HIV identificados"
								destaque={
									situacaoPorIndicador[Indicadores.PRE_NATAL_SIFILIS_HIV].pendente
								}
								complemento={`de ${situacaoPorIndicador[Indicadores.PRE_NATAL_SIFILIS_HIV].total}`}
							/>
							<DetailedInfo
								descricao="Gestantes sem o atendimento odontológico identificado"
								destaque={
									situacaoPorIndicador[Indicadores.PRE_NATAL_ODONTO].pendente
								}
								complemento={`de ${situacaoPorIndicador[Indicadores.PRE_NATAL_ODONTO].total}`}
							/>
							</> :
							<DetailInfoError error="Não foi possível carregar os dados do indicador" />
						}
					</CardLista>
					<CardClicavel
						descricao={{
							content: "Clique aqui para falar com o suporte",
							contentOnHover: "<u>Clique aqui</u> para falar com o suporte",
						}}
						icone={{
							alt: "Ícone do whatsapp",
							src: "https://media.graphassets.com/eyhtI9x1RIiXOyUgnD8K",
							srcOnHover: "https://media.graphassets.com/GBWxV5tTQjK8RKcvee3z",
						}}
						link={{
							newTab: true,
							url: "https://bit.ly/atendimento-impulso-previne-site",
						}}
						titulo="Falar com o suporte"
						onClick={() =>
							mixpanel.track("card_click", {
								card_action: "solicitar_suporte_wpp",
								card_page: "pg_inicio",
							})
						}
					/>
				</div>,
				<Banner
					key="bannerGuiasEDicas"
					descricao={{
						content:
							"Em breve esse espaço poderá ter uma novidade! Conte pra gente o que você gostaria de ver aqui!",
					}}
					icone={{
						alt: "Ícone de uma lâmpada",
						src: "https://media.graphassets.com/NuB8Kdi2ThW19WzQg52z",
						width: "21px",
					}}
					link={{
						newTab: true,
						url: "https://bit.ly/pg-inicial-pesquisa-interesse",
					}}
					botao={{
						label: "CONTA PRA GENTE",
					}}
					titulo={{
						content: "O que você gostaria de ver aqui?",
					}}
					onClick={() =>
						mixpanel.track("card_click", {
							card_action: "enviar_feedback_novidade",
							card_page: "pg_inicio",
						})
					}
					backgroundColor="#8F9BA3"
				/>,
			]}
		/>
	);
};

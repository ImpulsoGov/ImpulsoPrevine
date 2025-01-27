import { ScoreCardGrid, Spinner } from "@impulsogov/design-system";
const CardsEquipe = ({ tabelaDataEquipe }) =>
	tabelaDataEquipe ? (
		<ScoreCardGrid
			valores={[
				{
					descricao: "Total de gestantes",
					valor: [
						...new Set(tabelaDataEquipe.map((item) => item.chave_id_gestacao)),
					].length,
				},
				{
					descricao: "Total de gestantes ativas",
					valor: tabelaDataEquipe.filter((item) => item.id_status_usuario == 8)
						.length,
				},
				{
					descricao:
						"Total de getantes ativas contabilizando para os 3 indicadores",
					valor: tabelaDataEquipe.filter((item) => {
						return (
							item.id_status_usuario == 8 &&
							item.consultas_pre_natal_validas >= 6 &&
							item.gestacao_idade_gestacional_primeiro_atendimento <= 12 &&
							item.id_exame_hiv_sifilis == 4 &&
							item.id_atendimento_odontologico == 1
						);
					}).length,
				},
				{
					descricao:
						"Gestantes ativas, com 6 ou mais consultas, com a 1ª consulta realizada até a 12ª semana de gestação",
					valor: tabelaDataEquipe.filter((item) => {
						return (
							item.id_status_usuario == 8 &&
							item.consultas_pre_natal_validas >= 6 &&
							item.gestacao_idade_gestacional_primeiro_atendimento <= 12
						);
					}).length,
				},
				{
					descricao: "Gestantes ativas, com atendimento odontológico realizado",
					valor: tabelaDataEquipe.filter((item) => {
						return (
							item.id_status_usuario == 8 &&
							item.id_atendimento_odontologico == 1
						);
					}).length,
				},
				{
					descricao:
						"Gestantes ativas, com os 2 exames realizados e identificados",
					valor: tabelaDataEquipe.filter((item) => {
						return (
							item.id_status_usuario == 8 && item.id_exame_hiv_sifilis == 4
						);
					}).length,
				},
			]}
		/>
	) : (
		<Spinner />
	);

export { CardsEquipe };

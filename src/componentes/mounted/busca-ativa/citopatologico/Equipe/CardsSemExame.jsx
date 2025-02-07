import { ScoreCardGrid, Spinner } from "@impulsogov/design-system";

export const CardsSemExame = ({ tabelaDataEquipe }) =>
	tabelaDataEquipe ? (
		<ScoreCardGrid
			valores={[
				{
					descricao: "Total de pessoas",
					valor: tabelaDataEquipe.length,
				},
				{
					descricao:
						"Total de pessoas que nunca relizaram a coleta de citopatológico",
					valor: tabelaDataEquipe.reduce((acumulador, item) => {
						return item.id_status_usuario == 13 ? acumulador + 1 : acumulador;
					}, 0),
				},
				{
					descricao:
						"Total de pessoas com a coleta vencida ou a vencer até o fim do quadrimestre",
					valor: tabelaDataEquipe.reduce((acumulador, item) => {
						return item.id_status_usuario == 15 || item.id_status_usuario == 16
							? acumulador + 1
							: acumulador;
					}, 0),
				},
			]}
		/>
	) : (
		<Spinner />
	);

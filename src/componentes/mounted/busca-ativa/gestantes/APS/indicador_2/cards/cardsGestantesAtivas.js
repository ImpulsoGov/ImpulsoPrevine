import { ScoreCardGrid, Spinner } from "@impulsogov/design-system";
const IndicadorDoisCardsGestantesAtivas = ({ tabelaDataAPS }) => {
	return tabelaDataAPS ? (
		<ScoreCardGrid
			valores={[
				{
					descricao: "Gestantes com os dois exames realizados e identificados",
					valor: tabelaDataAPS.reduce((acumulador, item) => {
						return item.id_status_usuario == 8 && item.id_exame_hiv_sifilis == 4
							? acumulador + 1
							: acumulador;
					}, 0),
				},
				{
					descricao:
						"Gestantes com apenas um dos exames realizados e identificados",
					valor: tabelaDataAPS.reduce((acumulador, item) => {
						return item.id_status_usuario == 8 &&
							(item.id_exame_hiv_sifilis == 1 || item.id_exame_hiv_sifilis == 2)
							? acumulador + 1
							: acumulador;
					}, 0),
				},
				{
					descricao:
						"Gestantes com nenhum dos exames realizados e identificados",
					valor: tabelaDataAPS.reduce((acumulador, item) => {
						return (item.id_status_usuario == 8) &
							(item.id_exame_hiv_sifilis == 3)
							? acumulador + 1
							: acumulador;
					}, 0),
				},
			]}
		/>
	) : (
		<Spinner />
	);
};

export { IndicadorDoisCardsGestantesAtivas };

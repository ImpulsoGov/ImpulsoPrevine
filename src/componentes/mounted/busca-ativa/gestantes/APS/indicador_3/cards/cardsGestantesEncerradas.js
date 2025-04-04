import { ScoreCardGrid, Spinner } from "@impulsogov/design-system";
const IndicadorTresCardsGestantesEncerradas = ({ tabelaDataAPS }) =>
    tabelaDataAPS ? (
        <ScoreCardGrid
            valores={[
                {
                    descricao:
                        "Gestantes com atendimento odontológico realizado",
                    valor: tabelaDataAPS.reduce((acumulador, item) => {
                        return item.id_status_usuario == 9 &&
                            item.id_atendimento_odontologico == 1
                            ? acumulador + 1
                            : acumulador;
                    }, 0),
                },
                {
                    descricao:
                        "Gestantes sem atendimento odontológico realizado",
                    valor: tabelaDataAPS.reduce((acumulador, item) => {
                        return item.id_status_usuario == 9 &&
                            item.id_atendimento_odontologico == 2
                            ? acumulador + 1
                            : acumulador;
                    }, 0),
                },
            ]}
        />
    ) : (
        <Spinner />
    );

export { IndicadorTresCardsGestantesEncerradas };

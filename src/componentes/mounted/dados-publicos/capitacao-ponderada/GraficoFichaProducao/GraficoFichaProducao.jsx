import { Spinner } from "@impulsogov/design-system";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import styles from "./GraficoFichaProducao.module.css";

function formatar(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
        return (value / 1000).toFixed(0) + "K";
    }
    return value;
}

const formatarData = (data) => {
    const meses = [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez",
    ];

    const [ano, mes] = data.split("-");
    return `${meses[Number.parseInt(mes) - 1]} ${ano}`;
};

const GraficoFichaProducaocomSeletor = ({
    selectedIndicadores,
    setSelectedIndicadores,
    selectedNovoIndicador,
    setSelectedNovoIndicador,
    selectedNovoIndicadorapli,
    setSelectedNovoIndicadorapli,
    selectedNovoIndicadorvalidacao,
    setSelectedNovoIndicadorvalidacao,
    GrafFicha,
    option,
}) => {
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [showNovoCheckboxescnes, setShowNovoCheckboxescnes] = useState(false);
    const [showNovoCheckboxesaplicacao, setShowNovoCheckboxesaplicacao] =
        useState(false);
    const [showNovoCheckboxesvalidacao, setShowNovoCheckboxesvalidacao] =
        useState(false);

    const handleCheckboxChange = (value) => {
        let updatedSelectedIndicadores;
        if (selectedIndicadores.includes(value)) {
            updatedSelectedIndicadores = selectedIndicadores.filter(
                (indicador) => indicador !== value,
            );
        } else {
            updatedSelectedIndicadores = [...selectedIndicadores, value];
        }

        const filteredCnes = GrafFicha.filter((item) =>
            updatedSelectedIndicadores.includes(item.equipe_nome),
        ).map((item) => item.cnes_nome);

        setSelectedIndicadores(updatedSelectedIndicadores);
        setSelectedNovoIndicador(filteredCnes);

        if (updatedSelectedIndicadores.length === 0) {
            // Se sim, marque todos automaticamente
            setSelectedIndicadores([
                ...new Set(GrafFicha.map((item) => item.equipe_nome)),
            ]);
            setSelectedNovoIndicador([
                ...new Set(GrafFicha.map((item) => item.cnes_nome)),
            ]);
        }
    };
    const handleExclusiveCheckboxChange = (value) => {
        const updatedSelectedIndicadores = [value];

        const filteredCnes = GrafFicha.filter((item) =>
            updatedSelectedIndicadores.includes(item.equipe_nome),
        ).map((item) => item.cnes_nome);

        setSelectedIndicadores(updatedSelectedIndicadores);
        setSelectedNovoIndicador(filteredCnes);
    };

    const handleNovoCheckboxChangecnes = (value) => {
        let updatedSelectedNovoIndicador;
        if (selectedNovoIndicador.includes(value)) {
            updatedSelectedNovoIndicador = selectedNovoIndicador.filter(
                (indicador) => indicador !== value,
            );
        } else {
            updatedSelectedNovoIndicador = [...selectedNovoIndicador, value];
        }

        const teamsForSelectedCnes = GrafFicha.filter((item) =>
            updatedSelectedNovoIndicador.includes(item.cnes_nome),
        ).map((item) => item.equipe_nome);

        setSelectedNovoIndicador(updatedSelectedNovoIndicador);
        setSelectedIndicadores(teamsForSelectedCnes);

        if (updatedSelectedNovoIndicador.length === 0) {
            // Se sim, marque todos automaticamente
            setSelectedIndicadores([
                ...new Set(GrafFicha.map((item) => item.equipe_nome)),
            ]);
            setSelectedNovoIndicador([
                ...new Set(GrafFicha.map((item) => item.cnes_nome)),
            ]);
        }
    };
    const handleExclusiveNovoCheckboxChangecnes = (value) => {
        const updatedSelectedNovoIndicador = [value];

        const teamsForSelectedCnes = GrafFicha.filter((item) =>
            updatedSelectedNovoIndicador.includes(item.cnes_nome),
        ).map((item) => item.equipe_nome);

        setSelectedNovoIndicador(updatedSelectedNovoIndicador);
        setSelectedIndicadores(teamsForSelectedCnes);
    };

    const handleNovoCheckboxChangeaplicacao = (value) => {
        let updatedSelectedNovoIndicadorapli;
        if (selectedNovoIndicadorapli.includes(value)) {
            updatedSelectedNovoIndicadorapli = selectedNovoIndicadorapli.filter(
                (indicador) => indicador !== value,
            );
        } else {
            updatedSelectedNovoIndicadorapli = [
                ...selectedNovoIndicadorapli,
                value,
            ];
        }

        const teamsForSelectedApli = GrafFicha.filter((item) =>
            updatedSelectedNovoIndicadorapli.includes(item.validacao_aplicacao),
        ).map((item) => item.validacao_nome);

        setSelectedNovoIndicadorapli(updatedSelectedNovoIndicadorapli);
        setSelectedNovoIndicadorvalidacao(teamsForSelectedApli);

        if (updatedSelectedNovoIndicadorapli.length === 0) {
            // Se sim, marque todos automaticamente
            setSelectedNovoIndicadorvalidacao([
                ...new Set(GrafFicha.map((item) => item.validacao_nome)),
            ]);
            setSelectedNovoIndicadorapli([
                ...new Set(GrafFicha.map((item) => item.validacao_aplicacao)),
            ]);
        }
    };
    const handleExclusiveNovoCheckboxChangesapli = (value) => {
        const updatedSelectedNovoIndicadorapli = [value];

        const teamsForSelectedApli = GrafFicha.filter((item) =>
            updatedSelectedNovoIndicadorapli.includes(item.validacao_aplicacao),
        ).map((item) => item.validacao_nome);

        setSelectedNovoIndicadorapli(updatedSelectedNovoIndicadorapli);
        setSelectedNovoIndicadorvalidacao(teamsForSelectedApli);
    };

    const handleNovoCheckboxChangevalidacao = (value) => {
        let updatedSelectedNovoIndicadorvalidacao;
        if (selectedNovoIndicadorvalidacao.includes(value)) {
            updatedSelectedNovoIndicadorvalidacao =
                selectedNovoIndicadorvalidacao.filter(
                    (indicador) => indicador !== value,
                );
        } else {
            updatedSelectedNovoIndicadorvalidacao = [
                ...selectedNovoIndicadorvalidacao,
                value,
            ];
        }

        const teamsForSelectedValidacao = GrafFicha.filter((item) =>
            updatedSelectedNovoIndicadorvalidacao.includes(item.validacao_nome),
        ).map((item) => item.validacao_aplicacao);

        setSelectedNovoIndicadorvalidacao(
            updatedSelectedNovoIndicadorvalidacao,
        );
        setSelectedNovoIndicadorapli(teamsForSelectedValidacao);

        if (updatedSelectedNovoIndicadorvalidacao.length === 0) {
            // Se sim, marque todos automaticamente
            setSelectedIndicadores([
                ...new Set(GrafFicha.map((item) => item.validacao_nome)),
            ]);
            setSelectedNovoIndicadorapli([
                ...new Set(GrafFicha.map((item) => item.validacao_aplicacao)),
            ]);
        }
    };
    const handleExclusiveNovoCheckboxChangesvalidacao = (value) => {
        const updatedSelectedNovoIndicadorvalidacao = [value];

        const teamsForSelectedValidacao = GrafFicha.filter((item) =>
            updatedSelectedNovoIndicadorvalidacao.includes(item.validacao_nome),
        ).map((item) => item.validacao_aplicacao);

        setSelectedNovoIndicadorvalidacao(
            updatedSelectedNovoIndicadorvalidacao,
        );
        setSelectedNovoIndicadorapli(teamsForSelectedValidacao);
    };

    const selectAllTeams = () => {
        setSelectedIndicadores([
            ...new Set(GrafFicha.map((item) => item.equipe_nome)),
        ]);
        setSelectedNovoIndicador([
            ...new Set(GrafFicha.map((item) => item.cnes_nome)),
        ]);
        setSelectedNovoIndicadorapli([
            ...new Set(GrafFicha.map((item) => item.validacao_aplicacao)),
        ]);
        setSelectedNovoIndicadorvalidacao([
            ...new Set(GrafFicha.map((item) => item.validacao_nome)),
        ]);
    };

    return (
        <div>
            <div className={styles.textContainer}>
                <div
                    className={`${styles.selectorBox} ${styles.equipeSelector}`}
                >
                    <div
                        className={styles.selectorHeader}
                        onClick={() => setShowCheckboxes(!showCheckboxes)}
                    >
                        <span>Equipe</span>
                        <div className={styles.arrowIcon}>
                            {showCheckboxes ? "▼" : "▼"}
                        </div>
                    </div>
                    {showCheckboxes && (
                        <div className={styles.checkboxes}>
                            <button
                                className={styles.button}
                                onClick={selectAllTeams}
                            >
                                Selecionar Todos
                            </button>
                            {selectedIndicadores
                                .filter(
                                    (indicador, index, self) =>
                                        self.indexOf(indicador) === index,
                                )
                                .map((indicador, index) => (
                                    <div
                                        key={index}
                                        className={styles.checkboxItem}
                                    >
                                        <label>
                                            <button
                                                className={styles.button}
                                                onClick={() =>
                                                    handleExclusiveCheckboxChange(
                                                        indicador,
                                                    )
                                                }
                                            >
                                                Apenas
                                            </button>
                                            <input
                                                type="checkbox"
                                                value={indicador}
                                                checked={selectedIndicadores.includes(
                                                    indicador,
                                                )}
                                                onChange={(e) =>
                                                    handleCheckboxChange(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {indicador}
                                        </label>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                <div
                    className={`${styles.selectorBox} ${styles.estabelecimentoSelector}`}
                >
                    <div
                        className={styles.selectorHeader}
                        onClick={() =>
                            setShowNovoCheckboxescnes(!showNovoCheckboxescnes)
                        }
                    >
                        <span>Estabelecimento </span>
                        <div className={styles.arrowIcon}>
                            {showNovoCheckboxescnes ? "▼" : "▼"}
                        </div>
                    </div>
                    {showNovoCheckboxescnes && (
                        <div className={styles.checkboxes}>
                            <button
                                className={styles.button}
                                onClick={selectAllTeams}
                            >
                                Selecionar Todos
                            </button>
                            {selectedNovoIndicador
                                .filter(
                                    (indicador, index, self) =>
                                        self.indexOf(indicador) === index,
                                )
                                .map((indicador, index) => (
                                    <div
                                        key={index}
                                        className={styles.checkboxItem}
                                    >
                                        <label>
                                            <button
                                                className={styles.button}
                                                onClick={() =>
                                                    handleExclusiveNovoCheckboxChangecnes(
                                                        indicador,
                                                    )
                                                }
                                            >
                                                Apenas
                                            </button>
                                            <input
                                                type="checkbox"
                                                value={indicador}
                                                checked={selectedNovoIndicador.includes(
                                                    indicador,
                                                )}
                                                onChange={(e) =>
                                                    handleNovoCheckboxChangecnes(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {indicador}
                                        </label>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                <div
                    className={`${styles.selectorBox} ${styles.AplicacaoSelector}`}
                >
                    <div
                        className={styles.selectorHeader}
                        onClick={() =>
                            setShowNovoCheckboxesaplicacao(
                                !showNovoCheckboxesaplicacao,
                            )
                        }
                    >
                        <span>Aplicação </span>
                        <div className={styles.arrowIcon}>
                            {showNovoCheckboxesaplicacao ? "▼" : "▼"}
                        </div>
                    </div>
                    {showNovoCheckboxesaplicacao && (
                        <div className={styles.checkboxes}>
                            <button
                                className={styles.button}
                                onClick={selectAllTeams}
                            >
                                Selecionar Todos
                            </button>
                            {selectedNovoIndicadorapli
                                .filter(
                                    (indicador, index, self) =>
                                        self.indexOf(indicador) === index,
                                )
                                .map((indicador, index) => (
                                    <div
                                        key={index}
                                        className={styles.checkboxItem}
                                    >
                                        <label>
                                            <button
                                                className={styles.button}
                                                onClick={() =>
                                                    handleExclusiveNovoCheckboxChangesapli(
                                                        indicador,
                                                    )
                                                }
                                            >
                                                Apenas
                                            </button>
                                            <input
                                                type="checkbox"
                                                value={indicador}
                                                checked={selectedNovoIndicadorapli.includes(
                                                    indicador,
                                                )}
                                                onChange={(e) =>
                                                    handleNovoCheckboxChangeaplicacao(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {indicador}
                                        </label>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                <div
                    className={`${styles.selectorBox} ${styles.Validacaoelector}`}
                >
                    <div
                        className={styles.selectorHeader}
                        onClick={() =>
                            setShowNovoCheckboxesvalidacao(
                                !showNovoCheckboxesvalidacao,
                            )
                        }
                    >
                        <span>Validação </span>
                        <div className={styles.arrowIcon}>
                            {showNovoCheckboxesvalidacao ? "▼" : "▼"}
                        </div>
                    </div>
                    {showNovoCheckboxesvalidacao && (
                        <div className={styles.checkboxes}>
                            <button
                                className={styles.button}
                                onClick={selectAllTeams}
                            >
                                Selecionar Todos
                            </button>
                            {selectedNovoIndicadorvalidacao
                                .filter(
                                    (indicador, index, self) =>
                                        self.indexOf(indicador) === index,
                                )
                                .map((indicador, index) => (
                                    <div
                                        key={index}
                                        className={styles.checkboxItem}
                                    >
                                        <label>
                                            <button
                                                className={styles.button}
                                                onClick={() =>
                                                    handleExclusiveNovoCheckboxChangesvalidacao(
                                                        indicador,
                                                    )
                                                }
                                            >
                                                Apenas
                                            </button>
                                            <input
                                                type="checkbox"
                                                value={indicador}
                                                checked={selectedNovoIndicadorvalidacao.includes(
                                                    indicador,
                                                )}
                                                onChange={(e) =>
                                                    handleNovoCheckboxChangevalidacao(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {indicador}
                                        </label>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <ReactEcharts
                key={Math.random()}
                option={option}
                style={{ height: "450px" }}
            />
        </div>
    );
};

const GraficoFichaProducao = ({ GrafFicha }) => {
    const [selectedIndicadores, setSelectedIndicadores] = useState([
        ...new Set(GrafFicha.map((item) => item.equipe_nome)),
    ]);

    const [selectedNovoIndicador, setSelectedNovoIndicador] = useState([
        ...new Set(GrafFicha.map((item) => item.cnes_nome)),
    ]);

    const [selectedNovoIndicadorapli, setSelectedNovoIndicadorapli] = useState([
        ...new Set(GrafFicha.map((item) => item.validacao_aplicacao)),
    ]);

    const [selectedNovoIndicadorvalidacao, setSelectedNovoIndicadorvalidacao] =
        useState([...new Set(GrafFicha.map((item) => item.validacao_nome))]);

    const [filteredSeries, setFilteredSeries] = useState([]);
    const [graphLoading, setGraphLoading] = useState(true);

    const GrafFichaFiltrado = GrafFicha.filter((item) => {
        const dataInicio = new Date(item.periodo_data_inicio);
        return dataInicio;
    });

    const datasFiltradas = [
        ...new Set(
            GrafFichaFiltrado.map((item) => {
                const dataFormatada = formatarData(item.periodo_data_inicio);
                return dataFormatada;
            }),
        ),
    ];

    const datasOrdenadas = datasFiltradas;

    useEffect(() => {
        const selectedData = GrafFichaFiltrado.filter(
            (item) =>
                selectedIndicadores.includes(item.equipe_nome) &&
                selectedNovoIndicador.includes(item.cnes_nome) &&
                selectedNovoIndicadorapli.includes(item.validacao_aplicacao) &&
                selectedNovoIndicadorvalidacao.includes(item.validacao_nome),
        );

        const periodos = [
            ...new Set(selectedData.map((item) => item.periodo_data_inicio)),
        ].sort();

        const uniqueValidationNames = [
            ...new Set(selectedData.map((item) => item.validacao_nome)),
        ];

        const newSeries = uniqueValidationNames.map((validacaoNome) => {
            const dadosPorIndicador = periodos.map((periodo) => {
                const dataForPeriodAndValidation = selectedData.filter(
                    (item) =>
                        item.periodo_data_inicio === periodo &&
                        item.validacao_nome === validacaoNome,
                );
                const soma = dataForPeriodAndValidation.reduce(
                    (acc, curr) => acc + curr.validacao_quantidade,
                    0,
                );
                return soma;
            });

            return {
                name: validacaoNome,
                type: "bar",
                stack: "stack",
                data: dadosPorIndicador,
            };
        });

        setFilteredSeries(newSeries);
        setGraphLoading(false);
    }, [
        GrafFicha,
        selectedIndicadores,
        selectedNovoIndicador,
        selectedNovoIndicadorapli,
        selectedNovoIndicadorvalidacao,
    ]);

    useEffect(
        () =>
            setSelectedIndicadores([
                ...new Set(GrafFicha.map((item) => item.equipe_nome)),
            ]),
        [GrafFicha],
    );
    useEffect(
        () =>
            setSelectedNovoIndicador([
                ...new Set(GrafFicha.map((item) => item.cnes_nome)),
            ]),
        [GrafFicha],
    );
    useEffect(
        () =>
            setSelectedNovoIndicadorapli([
                ...new Set(GrafFicha.map((item) => item.validacao_aplicacao)),
            ]),
        [GrafFicha],
    );
    useEffect(
        () =>
            setSelectedNovoIndicadorvalidacao([
                ...new Set(GrafFicha.map((item) => item.validacao_nome)),
            ]),
        [GrafFicha],
    );

    const option = {
        tooltip: {
            trigger: "axis",
        },
        legend: {},
        grid: {
            left: "4%",
            right: "6%",
            bottom: "0%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: datasOrdenadas,
            axisLabel: {
                rotate: 45,
            },
        },
        yAxis: {
            type: "value",
            splitLine: {
                show: false,
            },
            axisLabel: {
                formatter: formatar,
            },
        },
        series: filteredSeries.map((serie) => {
            return {
                ...serie,
                type: "bar",
            };
        }),
    };

    return (
        <div>
            {graphLoading || selectedIndicadores.length === 0 ? (
                <Spinner />
            ) : (
                <div>
                    <GraficoFichaProducaocomSeletor
                        selectedIndicadores={selectedIndicadores}
                        setSelectedIndicadores={setSelectedIndicadores}
                        GrafFicha={GrafFicha}
                        option={option}
                        selectedNovoIndicador={selectedNovoIndicador}
                        setSelectedNovoIndicador={setSelectedNovoIndicador}
                        selectedNovoIndicadorapli={selectedNovoIndicadorapli}
                        setSelectedNovoIndicadorapli={
                            setSelectedNovoIndicadorapli
                        }
                        selectedNovoIndicadorvalidacao={
                            selectedNovoIndicadorvalidacao
                        }
                        setSelectedNovoIndicadorvalidacao={
                            setSelectedNovoIndicadorvalidacao
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default GraficoFichaProducao;

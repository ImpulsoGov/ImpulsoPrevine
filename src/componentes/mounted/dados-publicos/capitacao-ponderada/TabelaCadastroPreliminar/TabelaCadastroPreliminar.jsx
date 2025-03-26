import { CardAlert, Spinner } from "@impulsogov/design-system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import styles from "./TabelaCadastroPreliminar.module.css";

const TabelaCadastroPreliminarcomSeletor = ({
    selectedIndicadores,
    setSelectedIndicadores,
    selectedNovoIndicador,
    setSelectedNovoIndicador,
    TabCadPreliminar,
}) => {
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [showNovoCheckboxes, setShowNovoCheckboxes] = useState(false);

    const handleCheckboxChange = (value) => {
        let updatedSelectedIndicadores;
        if (selectedIndicadores.includes(value)) {
            updatedSelectedIndicadores = selectedIndicadores.filter(
                (indicador) => indicador !== value,
            );
        } else {
            updatedSelectedIndicadores = [...selectedIndicadores, value];
        }

        setSelectedIndicadores(updatedSelectedIndicadores);

        if (updatedSelectedIndicadores.length === 0) {
            // Se sim, marque todos automaticamente
            setSelectedIndicadores([
                ...new Set(
                    TabCadPreliminar.filter(
                        (item) =>
                            item.validacao_nome ===
                            "Preliminar>Reprovado(PROF)",
                    ).map((item) => item.equipe_nome),
                ),
            ]);
            setSelectedNovoIndicador([
                ...new Set(
                    TabCadPreliminar.filter(
                        (item) =>
                            item.validacao_nome ===
                            "Preliminar>Reprovado(PROF)",
                    ).map((item) => item.periodo_data_inicio),
                ),
            ]);
        }
    };

    const handleExclusiveCheckboxChange = (value) => {
        const updatedSelectedIndicadores = [value];

        setSelectedIndicadores(updatedSelectedIndicadores);
    };

    const handleNovoCheckboxChange = (value) => {
        let updatedSelectedNovoIndicador;
        if (selectedNovoIndicador.includes(value)) {
            updatedSelectedNovoIndicador = selectedNovoIndicador.filter(
                (indicador) => indicador !== value,
            );
        } else {
            updatedSelectedNovoIndicador = [...selectedNovoIndicador, value];
        }

        setSelectedNovoIndicador(updatedSelectedNovoIndicador);

        if (updatedSelectedNovoIndicador.length === 0) {
            setSelectedIndicadores([
                ...new Set(
                    TabCadPreliminar.filter(
                        (item) =>
                            item.validacao_nome ===
                            "Preliminar>Reprovado(PROF)",
                    ).map((item) => item.equipe_nome),
                ),
            ]);
            setSelectedNovoIndicador([
                ...new Set(
                    TabCadPreliminar.filter(
                        (item) =>
                            item.validacao_nome ===
                            "Preliminar>Reprovado(PROF)",
                    ).map((item) => item.periodo_data_inicio),
                ),
            ]);
        }
    };

    const handleExclusiveNovoCheckboxChange = (value) => {
        const updatedSelectedNovoIndicador = [value];

        setSelectedNovoIndicador(updatedSelectedNovoIndicador);
    };

    const selectAllTeams = () => {
        setSelectedIndicadores([
            ...new Set(
                TabCadPreliminar.filter(
                    (item) =>
                        item.validacao_nome === "Preliminar>Reprovado(PROF)",
                ).map((item) => item.equipe_nome),
            ),
        ]);
        setSelectedNovoIndicador([
            ...new Set(
                TabCadPreliminar.filter(
                    (item) =>
                        item.validacao_nome === "Preliminar>Reprovado(PROF)",
                ).map((item) => item.periodo_data_inicio),
            ),
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
                    className={`${styles.selectorBox} ${styles.periodoSelector}`}
                >
                    <div
                        className={styles.selectorHeader}
                        onClick={() =>
                            setShowNovoCheckboxes(!showNovoCheckboxes)
                        }
                    >
                        <span>Período </span>
                        <div className={styles.arrowIcon}>
                            {showNovoCheckboxes ? "▼" : "▼"}
                        </div>
                    </div>
                    {showNovoCheckboxes && (
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
                                                    handleExclusiveNovoCheckboxChange(
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
                                                    handleNovoCheckboxChange(
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
        </div>
    );
};

const TabelaCadastroPreliminar = ({ TabCadPreliminar }) => {
    const [selectedIndicadores, setSelectedIndicadores] = useState([
        ...new Set(
            TabCadPreliminar.filter(
                (item) => item.validacao_nome === "Preliminar>Reprovado(PROF)",
            ).map((item) => item.equipe_nome),
        ),
    ]);

    const [selectedNovoIndicador, setSelectedNovoIndicador] = useState([
        ...new Set(
            TabCadPreliminar.filter(
                (item) => item.validacao_nome === "Preliminar>Reprovado(PROF)",
            ).map((item) => item.periodo_data_inicio),
        ),
    ]);

    const calculateQuantidade = (equipeNomes) => {
        if (equipeNomes && Array.isArray(equipeNomes)) {
            const filteredData = TabCadPreliminar.filter(
                (item) =>
                    equipeNomes.includes(item.equipe_nome) &&
                    item.validacao_nome === "Preliminar>Reprovado(PROF)",
            );

            const quantidade = filteredData.reduce((acc, item) => {
                return acc + item.validacao_quantidade;
            }, 0);

            return quantidade;
        } else {
            return 0; // Retorne um valor padrão ou trate o caso em que equipeNomes não é um array válido.
        }
    };

    const colunas = useMemo(() => [
        {
            field: "validacao_nome",
            headerName: "Validação",
            flex: 3,
            renderCell: (params) => (
                <div
                    style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        padding: "15px",
                    }}
                >
                    {params.value}
                </div>
            ),
            cellClassName: "multi-line-cell",
            align: "center",
            headerAlign: "center",
            headerClassName: styles.cabecalho,
        },
        {
            field: "recomendacao",
            headerName: "Recomendação",
            flex: 4,
            renderCell: (params) => (
                <div
                    style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        padding: "15px",
                    }}
                >
                    {params.value}
                </div>
            ),
            align: "center",
            headerAlign: "center",
            headerClassName: styles.cabecalho,
        },
        {
            field: "validacao_quantidade",
            headerName: "Quantidade Dinâmica",
            flex: 2,
            renderCell: () => (
                <div
                    style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        padding: "15px",
                    }}
                >
                    {calculateQuantidade(selectedIndicadores)}
                </div>
            ),
            align: "center",
            headerAlign: "center",
            headerClassName: styles.cabecalho,
        },
    ]);

    const linhas = useMemo(() => {
        if (!Array.isArray(TabCadPreliminar)) {
            return [];
        }

        const linhasUnicas = new Set();

        const linhasFiltradas = TabCadPreliminar.filter(
            (item) => item.validacao_nome === "Preliminar>Reprovado(PROF)",
        )
            .map((item) => {
                const chave = `${item.validacao_nome}-${item.recomendacao}`;
                if (!linhasUnicas.has(chave)) {
                    linhasUnicas.add(chave);
                    return {
                        id: uuidV4(),
                        validacao_nome: item.validacao_nome,
                        recomendacao: item.recomendacao,
                        equipe_nome: item.equipe_nome,
                        validacao_quantidade: calculateQuantidade(
                            item.equipe_nome,
                        ),
                    };
                }
                return null;
            })
            .filter((item) => item !== null);

        return linhasFiltradas;
    }, [TabCadPreliminar, selectedIndicadores]);

    useEffect(
        () =>
            setSelectedIndicadores([
                ...new Set(
                    TabCadPreliminar.filter(
                        (item) =>
                            item.validacao_nome ===
                            "Preliminar>Reprovado(PROF)",
                    ).map((item) => item.equipe_nome),
                ),
            ]),
        [TabCadPreliminar],
    );
    useEffect(
        () =>
            setSelectedNovoIndicador([
                ...new Set(
                    TabCadPreliminar.filter(
                        (item) =>
                            item.validacao_nome ===
                            "Preliminar>Reprovado(PROF)",
                    ).map((item) => item.periodo_data_inicio),
                ),
            ]),
        [TabCadPreliminar],
    );

    return (
        <div>
            {selectedIndicadores.length === 0 &&
                TabCadPreliminar.length === 0 && <Spinner />}
            {selectedIndicadores.length === 0 &&
                TabCadPreliminar.length !== 0 && (
                    <CardAlert
                        destaque=""
                        msg="Não há cadastros reprovados em análise preliminar."
                        background="#96D8BF"
                    />
                )}
            {selectedIndicadores.length !== 0 &&
                TabCadPreliminar.length !== 0 && (
                    <div>
                        <TabelaCadastroPreliminarcomSeletor
                            selectedIndicadores={selectedIndicadores}
                            setSelectedIndicadores={setSelectedIndicadores}
                            TabCadPreliminar={TabCadPreliminar}
                            selectedNovoIndicador={selectedNovoIndicador}
                            setSelectedNovoIndicador={setSelectedNovoIndicador}
                        />
                        <DataGrid
                            sx={{
                                "& .MuiDataGrid-columnHeaderTitle": {
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    lineHeight: "1rem",
                                    whiteSpace: "normal",
                                    textAlign: "center",
                                },
                                "& .MuiDataGrid-toolbarContainer": {
                                    backgroundColor: "#1B1C1E",
                                },
                                "& .MuiDataGrid-cell": {
                                    fontSize: "14px",
                                    lineHeight: "1rem",
                                    whiteSpace: "normal",
                                },
                                "& .MuiButton-root": {
                                    color: "#D4DBE7",
                                },
                                "& .MuiButton-outlined": {
                                    borderColor: "#D4DBE7",
                                },
                            }}
                            rows={linhas}
                            columns={colunas}
                            autoHeight
                            hideFooter
                            disableColumnMenu
                            getRowHeight={() => "auto"}
                            headerHeight={150}
                        />
                    </div>
                )}
        </div>
    );
};

export default TabelaCadastroPreliminar;

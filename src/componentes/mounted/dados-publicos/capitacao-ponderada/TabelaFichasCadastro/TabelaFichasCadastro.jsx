import { Spinner } from "@impulsogov/design-system";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import styles from "./TabelaFichasCadastro.module.css";

const TabelaFichasCadastro = ({ TabFichas }) => {
    const obterNomeMes = (numeroMes) => {
        const nomesMeses = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ];
        return nomesMeses[numeroMes - 1];
    };

    const dadosAgrupados = useMemo(() => {
        if (!Array.isArray(TabFichas)) {
            return [];
        }
        const dadosOrdenados = [...TabFichas].sort((a, b) => {
            const dataA = new Date(a.periodo_data_inicio);
            const dataB = new Date(b.periodo_data_inicio);
            return dataB - dataA;
        });

        const agrupados = {};

        dadosOrdenados.forEach(
            ({
                periodo_data_inicio,
                validacao_nome,
                validacao_aplicacao,
                validacao_quantidade,
            }) => {
                const [ano, mes, dia] = periodo_data_inicio.split("-");
                const chaveMes = `${ano}-${mes}-${dia}`;
                if (!agrupados[chaveMes]) {
                    agrupados[chaveMes] = {
                        periodo_data_inicio: `${dia} ${obterNomeMes(Number(mes))} ${ano}`,
                        validacao: {},
                    };
                }

                if (!agrupados[chaveMes].validacao[validacao_nome]) {
                    agrupados[chaveMes].validacao[validacao_nome] = {
                        aplicacao: {},
                    };
                }

                if (
                    !agrupados[chaveMes].validacao[validacao_nome].aplicacao[
                        validacao_aplicacao
                    ]
                ) {
                    agrupados[chaveMes].validacao[validacao_nome].aplicacao[
                        validacao_aplicacao
                    ] = 0;
                }

                agrupados[chaveMes].validacao[validacao_nome].aplicacao[
                    validacao_aplicacao
                ] += validacao_quantidade;
            },
        );

        const valoresAgrupados = Object.values(agrupados);

        return valoresAgrupados;
    }, [TabFichas]);

    const colunas = useMemo(() => [
        {
            field: "periodo_data_inicio",
            headerName: "Data",
            flex: 3,
            align: "left",
            headerAlign: "left",
            headerClassName: styles.cabecalho,
        },
        {
            field: "validacao",
            headerName: "Validação",
            flex: 3,
            align: "left",
            headerAlign: "left",
            headerClassName: styles.cabecalho,
        },
        {
            field: "aplicacao",
            headerName: "Aplicação",
            flex: 3,
            align: "left",
            headerAlign: "left",
            headerClassName: styles.cabecalho,
        },
        {
            field: "quantidade",
            headerName: "Quantidade",
            flex: 1,
            align: "right",
            headerAlign: "right",
            headerClassName: styles.cabecalho,
            valueFormatter: (params) => {
                return params.value?.toLocaleString();
            },
        },
    ]);

    const linhas = useMemo(() => {
        const linhasData = [];

        dadosAgrupados.forEach((agrupado) => {
            const { periodo_data_inicio, validacao } = agrupado;
            Object.keys(validacao).forEach((validacaoNome) => {
                const validacaoData = validacao[validacaoNome];
                Object.keys(validacaoData.aplicacao).forEach((aplicacao) => {
                    const quantidade = validacaoData.aplicacao[aplicacao];
                    linhasData.push({
                        id: uuidV4(),
                        periodo_data_inicio,
                        validacao: validacaoNome,
                        aplicacao,
                        quantidade,
                    });
                });
            });
        });

        return linhasData;
    }, [dadosAgrupados]);

    return (
        <div style={{ maxHeight: "800px", overflowY: "auto" }}>
            <div>
                {dadosAgrupados.length === 0 ? (
                    <Spinner />
                ) : (
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
                        hideFooter
                        disableColumnMenu
                        getRowHeight={() => "auto"}
                        autoHeight
                        paginationMode="server"
                    />
                )}
            </div>
        </div>
    );
};

export default TabelaFichasCadastro;

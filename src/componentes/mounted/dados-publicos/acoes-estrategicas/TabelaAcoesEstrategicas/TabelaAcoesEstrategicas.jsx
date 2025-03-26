import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import styles from "./Tabelas.module.css";

const TabelaAcoesEstrategicas = ({ TabAcoes }) => {
    const colunas = useMemo(() => [
        {
            field: "acao_nome",
            headerName: "Ação Estratégica",
            flex: 1.8,
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
            align: "justify",
            headerAlign: "center",
            headerClassName: styles.cabecalho,
        },
        {
            field: "periodicidade",
            headerName: "Periodicidade do Repasse",
            flex: 2.5,
            align: "center",
            headerAlign: "center",
            headerClassName: styles.cabecalho,
        },
        {
            field: "nivel_repasse",
            headerName: "Nível do Repasse",
            flex: 2,
            align: "center",
            headerAlign: "center",
            headerClassName: styles.cabecalho,
        },
        {
            field: "requisitos",
            headerName: "Critérios de Manutenção do Repasse",
            flex: 3.7,
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
            align: "justify",
            headerAlign: "center",
            headerClassName: styles.cabecalho,
        },
    ]);

    const linhas = useMemo(() => {
        if (!Array.isArray(TabAcoes)) {
            return []; // Retorna um array vazio se TabAcoes não for um array
        }

        return TabAcoes.map(
            ({ acao_nome, periodicidade, nivel_repasse, requisitos }) => ({
                id: uuidV4(),
                acao_nome,
                periodicidade,
                nivel_repasse,
                requisitos,
            }),
        );
    }, [TabAcoes]);

    return (
        <div style={{ height: "100%", width: "100%" }}>
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
                density="comfortable"
                autoHeight
                hideFooter
                disableColumnMenu
                getRowHeight={() => "auto"} // altura das linhas
                headerHeight={150}
            />
        </div>
    );
};

export default TabelaAcoesEstrategicas;

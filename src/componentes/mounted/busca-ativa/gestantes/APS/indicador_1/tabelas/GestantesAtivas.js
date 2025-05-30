import { PainelBuscaAtiva, Spinner } from "@impulsogov/design-system";
import { colunasGestantesIndicadorUm } from "../../../../../../../helpers/colunasGestantesIndicadorUm";
import { colunasImpressaoGestantesIndicador1 } from "../../../../../../../helpers/colunasImpressaoGestantesIndicador1";
import { labelsModalImpressaoAPS } from "../../../../../../../helpers/labelsModalImpressao";
import {
    larguraColunasGestantesIndicador1Paisagem,
    larguraColunasGestantesIndicador1Retrato,
} from "../../../../../../../helpers/larguraColunasGestantesIndicador1";

const IntFiltros = [];
const datefiltrosGestantes = [
    "gestacao_data_dpp",
    "consulta_prenatal_ultima_data",
];
const rotulosfiltrosGestantes = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "DPP MAIS PRÓXIMA",
];
const IDFiltrosGestantes = {
    "NOMES DE A-Z": "cidadao_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z": "acs_nome",
    "DPP MAIS PRÓXIMA": "gestacao_data_dpp",
};
const IDFiltrosOrdenacaoGestantes = {
    cidadao_nome: "asc",
    acs_nome: "asc",
    gestacao_data_dpp: "asc",
};

const IndicadorUmTabelaGestantesAtivas = ({
    tabelaDataAPS,
    tabelaData,
    setTabelaData,
    trackObject,
    aba,
    sub_aba,
    liberarPesquisa,
    showSnackBar,
    setShowSnackBar,
    filtros_aplicados,
    setFiltros_aplicados,
}) => {
    const tabelaDataAPSGestantesAtivas = tabelaDataAPS
        ?.filter((item) => item.id_status_usuario == 8)
        .map((item) => ({
            ...item,
            equipe_nome_e_ine: `${item.equipe_nome} - ${item.equipe_ine}`,
        }));
    return tabelaDataAPS ? (
        <PainelBuscaAtiva
            key="tabelaDataAPSGestantesAtivas"
            painel="aps"
            lista="<span>PRÉ-NATAL INDICADOR 1 (6 CONSULTAS)<span/><span style='display: block;'>GESTANTES ATIVAS<span/>s"
            divisorVertical={[1, 4]}
            largura_colunas_impressao={{
                paisagem: larguraColunasGestantesIndicador1Paisagem,
                retrato: larguraColunasGestantesIndicador1Retrato,
            }}
            dadosFiltros={[
                {
                    data: ["Maior ou igual a 6", "Menor que 6"],
                    filtro: "consultas_pre_natal_validas",
                    rotulo: "Filtrar por número de consultas",
                },
                {
                    data: [
                        ...new Set(
                            tabelaDataAPSGestantesAtivas.map(
                                (item) => item.equipe_nome_e_ine
                            )
                        ),
                    ],
                    filtro: "equipe_nome_e_ine",
                    rotulo: "Filtrar por nome e INE da equipe",
                },
                {
                    data: [
                        ...new Set(
                            tabelaDataAPSGestantesAtivas.map(
                                (item) => item.gestacao_quadrimestre
                            )
                        ),
                    ],
                    filtro: "gestacao_quadrimestre",
                    rotulo: "Filtrar por quadrimestre",
                },
            ]}
            tabela={{
                colunas: colunasGestantesIndicadorUm,
                data: tabelaDataAPSGestantesAtivas,
            }}
            colunasImpressao={colunasImpressaoGestantesIndicador1}
            datefiltros={datefiltrosGestantes}
            IntFiltros={IntFiltros}
            IDFiltros={IDFiltrosGestantes}
            rotulosfiltros={rotulosfiltrosGestantes}
            IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
            trackObject={trackObject}
            atualizacao={new Date(
                tabelaDataAPSGestantesAtivas.reduce((maisRecente, objeto) => {
                    const dataAtual = new Date(
                        objeto.dt_registro_producao_mais_recente
                    );
                    const dataMaisRecenteAnterior = new Date(maisRecente);
                    return dataAtual > dataMaisRecenteAnterior
                        ? objeto.dt_registro_producao_mais_recente
                        : maisRecente;
                }, "2000-01-01")
            ).toLocaleString("pt-BR", {
                timeZone: "UTC",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })}
            aba={aba}
            sub_aba={sub_aba}
            data={tabelaData}
            setData={setTabelaData}
            showSnackBar={showSnackBar}
            setShowSnackBar={setShowSnackBar}
            liberarPesquisa={liberarPesquisa}
            lista_mixpanel="pre_natal"
            propAgrupamentoImpressao="equipe_nome"
            propImpressaoSemPersonalizacao="equipe_nome_e_ine"
            propOrdenacaoImpressao="acs_nome"
            labelsModalImpressao={labelsModalImpressaoAPS}
            filtros_aplicados={filtros_aplicados}
            setFiltros_aplicados={setFiltros_aplicados}
        />
    ) : (
        <Spinner />
    );
};
export { IndicadorUmTabelaGestantesAtivas };

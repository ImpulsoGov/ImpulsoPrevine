"use client";
import {
    CardsGraficoAPSQuadrimestreProximo,
    GraficoAPSQuadrimestreProximo,
} from "@componentes/mounted/busca-ativa/vacinacao/aps/proximo_quadrimestre/graficoQuadrimestreProximo";
import { TabelaAPSQuadrimestreProximo } from "@componentes/mounted/busca-ativa/vacinacao/aps/proximo_quadrimestre/tabelaQuadrimestreProximo";
import {
    CardsGraficoAPSQuadrimestreAtual,
    GraficoAPSQuadrimestreAtual,
} from "@componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_atual/graficoQuadrimestreAtual";
import { TabelaAPSQuadrimestreAtual } from "@componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_atual/tabelaQuadrimestreAtual";
import {
    CardsGraficoAPSQuadrimestreFuturo,
    GraficoAPSQuadrimestreFuturo,
} from "@componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_futuro/graficoQuadrimestreFuturo";
import { TabelaAPSQuadrimestreFuturo } from "@componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_futuro/tabelaQuadrimestreFuturo";
import { dispararEventoAbrirImpressaoAPS } from "@helpers/eventosImpressaoHotjar";
import {
    ButtonLightSubmit,
    CardAlert,
    PanelSelector,
    TituloTexto,
} from "@impulsogov/design-system";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";

interface VacinacaoAPSProps {
    tabelaDataAPS: any;
    tabelaData: any;
    setTabelaData: Dispatch<SetStateAction<any>>;
    showSnackBar: any;
    setShowSnackBar: Dispatch<SetStateAction<any>>;
    Voltar: () => void;
    session: any;
    activeTabIndex: number;
    setActiveTabIndex: Dispatch<SetStateAction<any>>;
    activeTitleTabIndex: number;
    setActiveTitleTabIndex: Dispatch<SetStateAction<any>>;
    filtros_aplicados: any;
    setFiltros_aplicados: Dispatch<SetStateAction<any>>;
}

export const VacinacaoAPS: React.FC<VacinacaoAPSProps> = ({
    tabelaDataAPS,
    tabelaData,
    setTabelaData,
    showSnackBar,
    setShowSnackBar,
    Voltar,
    session,
    activeTabIndex,
    setActiveTabIndex,
    activeTitleTabIndex,
    setActiveTitleTabIndex,
    filtros_aplicados,
    setFiltros_aplicados,
}) => {
    const Children = [
        [
            [
                <CardsGraficoAPSQuadrimestreAtual
                    tabelaDataAPS={tabelaDataAPS}
                    key="CardsGraficoAPSQuadrimestreAtual"
                />,
                <GraficoAPSQuadrimestreAtual
                    tabelaDataAPS={tabelaDataAPS}
                    key="GraficoAPSQuadrimestreAtual"
                />,
            ],
            [
                <TabelaAPSQuadrimestreAtual
                    tabelaDataAPS={tabelaDataAPS}
                    tabelaData={tabelaData}
                    setTabelaData={setTabelaData}
                    liberarPesquisa={dispararEventoAbrirImpressaoAPS}
                    showSnackBar={showSnackBar}
                    setShowSnackBar={setShowSnackBar}
                    aba={activeTitleTabIndex}
                    subAba={activeTabIndex}
                    filtros_aplicados={filtros_aplicados}
                    setFiltros_aplicados={setFiltros_aplicados}
                    key="TabelaAPSQuadrimestreAtual"
                />,
            ],
        ],
        [
            [
                <CardsGraficoAPSQuadrimestreProximo
                    tabelaDataAPS={tabelaDataAPS}
                    key="CardsGraficoAPSQuadrimestreProximo"
                />,
                <GraficoAPSQuadrimestreProximo
                    tabelaDataAPS={tabelaDataAPS}
                    key="GraficoAPSQuadrimestreProximo"
                />,
            ],
            [
                <TabelaAPSQuadrimestreProximo
                    tabelaDataAPS={tabelaDataAPS}
                    tabelaData={tabelaData}
                    setTabelaData={setTabelaData}
                    liberarPesquisa={dispararEventoAbrirImpressaoAPS}
                    showSnackBar={showSnackBar}
                    setShowSnackBar={setShowSnackBar}
                    aba={activeTitleTabIndex}
                    subAba={activeTabIndex}
                    filtros_aplicados={filtros_aplicados}
                    setFiltros_aplicados={setFiltros_aplicados}
                    key="TabelaAPSQuadrimestreProximo"
                />,
            ],
        ],
        [
            [
                <CardsGraficoAPSQuadrimestreFuturo
                    tabelaDataAPS={tabelaDataAPS}
                    key="CardsGraficoAPSQuadrimestreFuturo"
                />,
                <GraficoAPSQuadrimestreFuturo
                    tabelaDataAPS={tabelaDataAPS}
                    key="GraficoAPSQuadrimestreFuturo"
                />,
            ],
            [
                <TabelaAPSQuadrimestreFuturo
                    tabelaDataAPS={tabelaDataAPS}
                    tabelaData={tabelaData}
                    setTabelaData={setTabelaData}
                    liberarPesquisa={dispararEventoAbrirImpressaoAPS}
                    showSnackBar={showSnackBar}
                    setShowSnackBar={setShowSnackBar}
                    aba={activeTitleTabIndex}
                    subAba={activeTabIndex}
                    filtros_aplicados={filtros_aplicados}
                    setFiltros_aplicados={setFiltros_aplicados}
                    key="TabelaAPSQuadrimestreFuturo"
                />,
            ],
        ],
    ];

    return (
        <>
            <div style={{ padding: "30px 80px 30px 80px", display: "flex" }}>
                <ButtonLightSubmit
                    icon="https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG"
                    label="VOLTAR"
                    submit={Voltar}
                />
            </div>
            <TituloTexto
                titulo="Lista Nominal de Vacinação"
                texto=""
                imagem={{ posicao: null, url: "" }}
            />
            <CardAlert
                destaque="IMPORTANTE: "
                msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
            />

            <div
                style={{
                    marginLeft: window.screen.width > 1024 ? "80px" : "20px",
                    marginTop: "30px",
                    color: "#1F1F1F",
                    fontSize: "22px",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    lineHeight: "130%",
                }}
            >
                {session.user.municipio}
            </div>
            <PanelSelector
                components={Children}
                conteudo="components"
                states={{
                    activeTabIndex: Number(activeTabIndex),
                    setActiveTabIndex: setActiveTabIndex,
                    activeTitleTabIndex: activeTitleTabIndex,
                    setActiveTitleTabIndex: setActiveTitleTabIndex,
                }}
                list={[
                    [
                        {
                            label: "GRÁFICO",
                        },
                        {
                            label: "LISTA NOMINAL",
                        },
                    ],
                    [
                        {
                            label: "GRÁFICO",
                        },
                        {
                            label: "LISTA NOMINAL",
                        },
                    ],
                    [
                        {
                            label: "GRÁFICO",
                        },
                        {
                            label: "LISTA NOMINAL",
                        },
                    ],
                ]}
                titles={[
                    {
                        label: "QUADRIMESTRE ATUAL",
                    },
                    {
                        label: "PRÓXIMO QUADRIMESTRE",
                    },
                    {
                        label: "QUADRIMESTRES FUTUROS",
                    },
                ]}
            />
        </>
    );
};

import {
    GraficoBuscaAtiva,
    ScoreCardGrid,
    Spinner,
} from "@impulsogov/design-system";
import { obterDadosQuadrimestre } from "../../../../../../utils/quadrimestre";
const dataAtual = Date.now();
const dadosQuadriAtual = dataAtual ? obterDadosQuadrimestre(dataAtual) : null;
const quadriAtualFormatado = dadosQuadriAtual
    ? `Q${Object.values(dadosQuadriAtual).join("/")}`
    : "";

const CardsGraficoIndicadorTresQuadriAtual = ({ tabelaDataAPS }) => {
    const dataQuadriAtual = tabelaDataAPS.filter(
        (item) =>
            item.gestacao_quadrimestre ==
            `${dadosQuadriAtual.ano}.Q${dadosQuadriAtual.quadrimestre}`,
    );
    return dataQuadriAtual ? (
        <>
            <h2
                style={{
                    marginTop: "30px",
                    marginLeft: "120px",
                    color: "#1F1F1F",
                    fontSize: "22px",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    lineHeight: "130%",
                }}
            >
                {quadriAtualFormatado && `${quadriAtualFormatado} -`} Gestantes
                com DUM preenchida por atendimento odontológico identificado por
                equipe de saúde
            </h2>
            <ScoreCardGrid
                valores={[
                    {
                        descricao:
                            "Gestantes com atendimento odontológico realizado",
                        valor: dataQuadriAtual.reduce((acumulador, item) => {
                            return (item.id_status_usuario == 8 ||
                                item.id_status_usuario == 9) &&
                                item.id_atendimento_odontologico == 1
                                ? acumulador + 1
                                : acumulador;
                        }, 0),
                    },
                    {
                        descricao:
                            "Gestantes sem atendimento odontológico realizado",
                        valor: dataQuadriAtual.reduce((acumulador, item) => {
                            return (item.id_status_usuario == 8 ||
                                item.id_status_usuario == 9) &&
                                item.id_atendimento_odontologico == 2
                                ? acumulador + 1
                                : acumulador;
                        }, 0),
                    },
                ]}
            />
        </>
    ) : (
        <Spinner />
    );
};

const GraficoIndicadorTresQuadriAtual = ({ tabelaDataAPS }) => {
    const dataQuadriAtual = tabelaDataAPS.filter(
        (item) =>
            item.gestacao_quadrimestre ==
            `${dadosQuadriAtual.ano}.Q${dadosQuadriAtual.quadrimestre}`,
    );
    return dataQuadriAtual ? (
        <>
            <GraficoBuscaAtiva
                dataBarra={{
                    title: {
                        text: "Distribuição por equipe",
                        subtext: "",
                        left: "80",
                    },
                    color: ["#2EB280", "#EF565D"],
                    grid: {
                        containLabel: true,
                        top: "20%",
                    },
                    legend: {
                        data: [
                            "Gestantes com atendimento odontológico realizado",
                            "Gestantes sem atendimento odontológico realizado",
                        ],
                        top: "60",
                        left: "80",
                    },
                    series: [
                        {
                            data: Object.entries(
                                dataQuadriAtual.reduce((acumulador, item) => {
                                    if (
                                        (item.id_status_usuario == 8 ||
                                            item.id_status_usuario == 9) &&
                                        item.id_atendimento_odontologico == 1
                                    )
                                        acumulador[item.equipe_nome] =
                                            (acumulador[item.equipe_nome] ||
                                                0) + 1;
                                    return acumulador;
                                }, {}),
                            ),
                            name: "Gestantes com atendimento odontológico realizado",
                            stack: "stack",
                            type: "bar",
                        },
                        {
                            data: Object.entries(
                                dataQuadriAtual.reduce((acumulador, item) => {
                                    if (
                                        (item.id_status_usuario == 8 ||
                                            item.id_status_usuario == 9) &&
                                        item.id_atendimento_odontologico == 2
                                    )
                                        acumulador[item.equipe_nome] =
                                            (acumulador[item.equipe_nome] ||
                                                0) + 1;
                                    return acumulador;
                                }, {}),
                            ),
                            name: "Gestantes sem atendimento odontológico realizado",
                            stack: "stack",
                            type: "bar",
                        },
                    ],
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        data: [
                            ...new Set(
                                dataQuadriAtual.map((item) => item.equipe_nome),
                            ),
                        ],
                        type: "category",
                        axisLabel: {
                            rotate: 45,
                        },
                    },
                    yAxis: {
                        type: "value",
                        axisLabel: {
                            formatter: (value) => value.toLocaleString("pt-BR"),
                        },
                    },
                }}
                dataRosca={{
                    title: {
                        text: "Consolidado Municipal",
                        left: "80",
                    },
                    color: ["#2EB280", "#EF565D"],
                    series: [
                        {
                            avoidLabelOverlap: false,
                            data: [
                                {
                                    name: "Gestantes com atendimento odontológico realizado",
                                    value: (
                                        (dataQuadriAtual.reduce(
                                            (acumulador, item) => {
                                                return (item.id_status_usuario ==
                                                    8 ||
                                                    item.id_status_usuario ==
                                                        9) &&
                                                    item.id_atendimento_odontologico ==
                                                        1
                                                    ? acumulador + 1
                                                    : acumulador;
                                            },
                                            0,
                                        ) *
                                            100) /
                                        dataQuadriAtual.filter(
                                            (item) =>
                                                item.id_status_usuario == 8 ||
                                                item.id_status_usuario == 9,
                                        ).length
                                    ).toFixed(1),
                                },
                                {
                                    name: "Gestantes sem atendimento odontológico realizado",
                                    value: (
                                        (dataQuadriAtual.reduce(
                                            (acumulador, item) => {
                                                return (item.id_status_usuario ==
                                                    8 ||
                                                    item.id_status_usuario ==
                                                        9) &&
                                                    item.id_atendimento_odontologico ==
                                                        2
                                                    ? acumulador + 1
                                                    : acumulador;
                                            },
                                            0,
                                        ) *
                                            100) /
                                        dataQuadriAtual.filter(
                                            (item) =>
                                                item.id_status_usuario == 8 ||
                                                item.id_status_usuario == 9,
                                        ).length
                                    ).toFixed(1),
                                },
                            ],
                            emphasis: {
                                label: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    show: true,
                                },
                            },
                            label: {
                                formatter: "{c}%",
                                position: "inside",
                                show: true,
                                textStyle: {
                                    color: "white",
                                    fontSize: 12,
                                },
                            },
                            labelLine: {
                                show: false,
                            },
                            name: "Gráfico de rosca",
                            radius: ["35%", "70%"],
                            type: "pie",
                        },
                    ],
                    tooltip: {
                        formatter: "{b}",
                        trigger: "item",
                    },
                }}
            />
        </>
    ) : (
        <Spinner />
    );
};
export {
    GraficoIndicadorTresQuadriAtual,
    CardsGraficoIndicadorTresQuadriAtual,
};

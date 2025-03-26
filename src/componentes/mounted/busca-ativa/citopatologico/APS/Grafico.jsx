import { GraficoBuscaAtiva, Spinner } from "@impulsogov/design-system";

export const Grafico = ({ tabelaDataAPS }) =>
    tabelaDataAPS ? (
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
                Pessoas dentro da faixa etaria de 25 a 64 anos
            </h2>
            <GraficoBuscaAtiva
                dataBarra={{
                    title: {
                        text: "Distribuição por equipe",
                        subtext: "",
                        left: "80",
                    },
                    color: [
                        "#2EB280",
                        "#E95F3A",
                        "#EABF2E",
                        "#57C7DC",
                        "#7579EA",
                    ],
                    grid: {
                        containLabel: true,
                        top: "20%",
                    },
                    legend: {
                        data: [
                            "Coleta em dia",
                            "Nunca realizou coleta",
                            "Coleta antes dos 25 anos de idade",
                            "Vence neste quadrimestre",
                            "Coleta vencida",
                        ],
                        top: "60",
                        left: "80",
                    },
                    series: [
                        {
                            data: Object.entries(
                                tabelaDataAPS.reduce((acumulador, item) => {
                                    if (item.id_status_usuario == 12)
                                        acumulador[item.equipe_nome] =
                                            (acumulador[item.equipe_nome] ||
                                                0) + 1;
                                    return acumulador;
                                }, {}),
                            ),
                            name: "Coleta em dia",
                            stack: "stack",
                            type: "bar",
                        },
                        {
                            data: Object.entries(
                                tabelaDataAPS.reduce((acumulador, item) => {
                                    if (item.id_status_usuario == 13)
                                        acumulador[item.equipe_nome] =
                                            (acumulador[item.equipe_nome] ||
                                                0) + 1;
                                    return acumulador;
                                }, {}),
                            ),
                            name: "Nunca realizou coleta",
                            stack: "stack",
                            type: "bar",
                        },
                        {
                            data: Object.entries(
                                tabelaDataAPS.reduce((acumulador, item) => {
                                    if (item.id_status_usuario == 14)
                                        acumulador[item.equipe_nome] =
                                            (acumulador[item.equipe_nome] ||
                                                0) + 1;
                                    return acumulador;
                                }, {}),
                            ),
                            name: "Coleta antes dos 25 anos de idade",
                            stack: "stack",
                            type: "bar",
                        },
                        {
                            data: Object.entries(
                                tabelaDataAPS.reduce((acumulador, item) => {
                                    if (item.id_status_usuario == 15)
                                        acumulador[item.equipe_nome] =
                                            (acumulador[item.equipe_nome] ||
                                                0) + 1;
                                    return acumulador;
                                }, {}),
                            ),
                            name: "Vence neste quadrimestre",
                            stack: "stack",
                            type: "bar",
                        },
                        {
                            data: Object.entries(
                                tabelaDataAPS.reduce((acumulador, item) => {
                                    if (item.id_status_usuario == 16)
                                        acumulador[item.equipe_nome] =
                                            (acumulador[item.equipe_nome] ||
                                                0) + 1;
                                    return acumulador;
                                }, {}),
                            ),
                            name: "Coleta vencida",
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
                                tabelaDataAPS.map((item) => item.equipe_nome),
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

                    color: [
                        "#2EB280",
                        "#E95F3A",
                        "#EABF2E",
                        "#57C7DC",
                        "#7579EA",
                    ],
                    series: [
                        {
                            avoidLabelOverlap: false,
                            data: [
                                {
                                    name: "Coleta em dia",
                                    value: (
                                        (tabelaDataAPS.reduce(
                                            (acumulador, item) => {
                                                return item.id_status_usuario ==
                                                    12
                                                    ? acumulador + 1
                                                    : acumulador;
                                            },
                                            0,
                                        ) *
                                            100) /
                                        tabelaDataAPS.length
                                    ).toFixed(1),
                                },
                                {
                                    name: "Nunca realizou coleta",
                                    value: (
                                        (tabelaDataAPS.reduce(
                                            (acumulador, item) => {
                                                return item.id_status_usuario ==
                                                    13
                                                    ? acumulador + 1
                                                    : acumulador;
                                            },
                                            0,
                                        ) *
                                            100) /
                                        tabelaDataAPS.length
                                    ).toFixed(1),
                                },
                                {
                                    name: "Coleta com menos de 25 anos",
                                    value: (
                                        (tabelaDataAPS.reduce(
                                            (acumulador, item) => {
                                                return item.id_status_usuario ==
                                                    14
                                                    ? acumulador + 1
                                                    : acumulador;
                                            },
                                            0,
                                        ) *
                                            100) /
                                        tabelaDataAPS.length
                                    ).toFixed(1),
                                },
                                {
                                    name: "Vence no final do quadrimestre",
                                    value: (
                                        (tabelaDataAPS.reduce(
                                            (acumulador, item) => {
                                                return item.id_status_usuario ==
                                                    15
                                                    ? acumulador + 1
                                                    : acumulador;
                                            },
                                            0,
                                        ) *
                                            100) /
                                        tabelaDataAPS.length
                                    ).toFixed(1),
                                },
                                {
                                    name: "Coleta vencida",
                                    value: (
                                        (tabelaDataAPS.reduce(
                                            (acumulador, item) => {
                                                return item.id_status_usuario ==
                                                    16
                                                    ? acumulador + 1
                                                    : acumulador;
                                            },
                                            0,
                                        ) *
                                            100) /
                                        tabelaDataAPS.length
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

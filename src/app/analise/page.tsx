import dynamic from "next/dynamic";

const Analise = dynamic(() => import("./Analise").then((mod) => mod.Analise));

const DadosPublicos = () => {
    const cardsData = [
        {
            title: " Indicadores de Desempenho",
            description:
                "Compare resultados dos 7 indicadores entre um quadrimestre e outro.",
            buttonText: "INDICADORES DE DESEMPENHO",
            link: "/dadoPublicos",
        },
        {
            title: "Capitação Ponderada - Cadastros",
            description:
                "Acompanhe a evolução nos cadastros de cada equipe do seu município.",
            buttonText: "CAPITAÇÃO PONDERADA",
            link: "/dadoPublicos?painel=1",
        },
        {
            title: "Incentivos a Ações Estratégicas",
            description:
                "Confira o histórico de repasses e as ações que se enquadram no seu perfil.",
            buttonText: "AÇÕES ESTRATÉGICAS",
            link: "/dadoPublicos?painel=2",
        },
    ];
    return <Analise cardsData={cardsData} />;
};

export default DadosPublicos;

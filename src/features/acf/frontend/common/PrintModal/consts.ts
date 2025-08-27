import type { ModalLabels } from "./model";

// TODO: rever se esse cara deveria viver aqui e se esses valores ainda fazem sentido
export type GroupedValuesType = { yes: "sim"; no: "não" };

export const groupedValues: GroupedValuesType = { yes: "sim", no: "não" };

export const apsLabelsModal: ModalLabels = {
    title: "IMPRESSÃO POR EQUIPES",
    primaryCustomOption: {
        title: "Deseja imprimir as listas divididas por Equipes?",
        description:
            "Essa impressão agrupa os cidadãos de acordo com as Equipes correspondentes. Qualquer filtro ou ordenação selecionados anteriormente serão mantidos e aplicados dentro desses grupos.",
        splitTeam: "Sim, dividir listas por equipes.",
        noSplit: "Não, imprimir a lista como ela está.",
    },
    secondaryCustomOption: {
        title: "Outras opções de impressão por equipes:",
        recommendation:
            "Ideal para distribuir listas para coordenadoras de equipe",
        splitGroupPerPage: "Também dividir equipes em folhas separadas",
        ordering: "Também ordenar listas por profissional responsável",
    },
    button: "IMPRIMIR LISTA",
};

export const coeqLabelsModal = {
    titulo: "IMPRESSÃO POR PROFISSIONAL RESPONSÁVEL",
    personalizacaoPrincipal: {
        titulo: "Deseja imprimir as listas divididas por profissional responsável?",
        descricao:
            "Essa impressão agrupa os cidadãos de acordo com os profissionais responsáveis correspondentes. Qualquer filtro ou ordenação selecionados anteriormente serão mantidos e aplicados dentro desses grupos.",
        agrupamentoSim: "Sim, dividir listas por profissional responsável.",
        agrupamentoNao: "Não, imprimir a lista como ela está.",
    },
    personalizacaoSecundaria: {
        titulo: "Outras opções de impressão por profissional responsável:",
        recomendacao:
            "Ideal para distribuir listas para agentes comunitários de saúde",
        separacaoGrupoPorFolha:
            "Também dividir a lista impressa com um profissional responsável por folha",
    },
    botao: "IMPRIMIR LISTA",
};

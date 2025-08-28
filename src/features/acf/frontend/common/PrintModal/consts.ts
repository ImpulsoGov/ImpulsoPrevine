import type { ModalLabels } from "./model";

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

export const coeqLabelsModal: ModalLabels = {
    title: "IMPRESSÃO POR PROFISSIONAL RESPONSÁVEL",
    primaryCustomOption: {
        title: "Deseja imprimir as listas divididas por profissional responsável?",
        description:
            "Essa impressão agrupa os cidadãos de acordo com os profissionais responsáveis correspondentes. Qualquer filtro ou ordenação selecionados anteriormente serão mantidos e aplicados dentro desses grupos.",
        splitTeam: "Sim, dividir listas por profissional responsável.",
        noSplit: "Não, imprimir a lista como ela está.",
    },
    secondaryCustomOption: {
        title: "Outras opções de impressão por profissional responsável:",
        recommendation:
            "Ideal para distribuir listas para agentes comunitários de saúde",
        splitGroupPerPage:
            "Também dividir a lista impressa com um profissional responsável por folha",
    },
    button: "IMPRIMIR LISTA",
};

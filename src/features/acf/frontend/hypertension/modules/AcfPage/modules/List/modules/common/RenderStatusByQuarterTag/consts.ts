import type { StatusByQuarter, TagDetails } from "./model";

const attentionTagDetails: TagDetails = {
    icon: {
        src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx6gsg007s07kn5oa1q3vs",
        alt: "Indicador de status a vencer no quadrimestre",
        width: 18,
        height: 10,
    },
    theme: "attention",
};

export const tagDetailsByStatus: Record<StatusByQuarter, TagDetails> = {
    "Em dia": {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8q006007lpwtiggqe3",
            alt: "Indicador de status em dia",
        },
        theme: "success",
    },
    Atrasada: {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8z006507lpwb1nwogs",
            alt: "Indicador de status atrasado",
            width: 18,
            height: 10,
        },
        theme: "warning",
    },
    "Vence dentro do Q1": attentionTagDetails,
    "Vence dentro do Q2": attentionTagDetails,
    "Vence dentro do Q3": attentionTagDetails,
    "Nunca realizado": {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h9e006a07lpnnvguact",
            alt: "Indicador de status nunca realizado",
            width: 18,
            height: 10,
        },
        theme: "danger",
    },
};

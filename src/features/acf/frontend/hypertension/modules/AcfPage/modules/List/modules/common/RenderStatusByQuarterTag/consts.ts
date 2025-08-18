import type { StatusByQuarter, TagDetails } from "./model";

export const tagDetailsByStatus: Record<StatusByQuarter, TagDetails> = {
    "Em dia": {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8q006007lpwtiggqe3",
            alt: "Ícone de uma marca de verificação",
        },
        theme: "success",
    },
    Atrasada: {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8z006507lpwb1nwogs",
            alt: "Ícone com símbolo da letra x",
            width: 18,
            height: 10,
        },
        theme: "warning",
    },
    "Vence dentro do quadri": {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx6gsg007s07kn5oa1q3vs",
            alt: "Ícone de uma exclamação",
            width: 18,
            height: 10,
        },
        theme: "attention",
    },
    "Nunca realizado": {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h9e006a07lpnnvguact",
            alt: "Ícone de uma ampulheta",
            width: 18,
            height: 10,
        },
        theme: "danger",
    },
};

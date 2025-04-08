import dataJson from "@app/api/lista-nominal/data.json";
import type { Session } from "next-auth";

export const filtersBuilder = (user?: Session["user"])=> user ? [
    {
        options: [
            { value: "Autorreferido", label: "Autorreferido" },
            { value: "Diagnostico clínico", label: "Diagnostico clínico" },
        ],
        label: "Identificação da Condição",
        id: "identificacao_condicao",
        isMultiSelect: true,
        width: "240px",
    },
    {
        options: dataJson
            .filter((item) => {
                const notFilterByTeam = user?.perfis.includes(9)
                    ? item.ine === user.equipe
                    : true;
                return (
                    item.municipio_id_sus === user?.municipio_id_sus &&
                    notFilterByTeam
                );
            })
            .map((item) => ({
                value: item.acs_nome_cadastro,
                label: item.acs_nome_cadastro,
            }))
            .sort((a, b) => a.label.localeCompare(b.label)),
        label: "ACS Responsável",
        id: "acs_nome_cadastro",
        isMultiSelect: true,
        width: "240px",
    },
    {
        options: [
            { value: "em dia", label: "Em dia" },
            { value: "atrasado", label: "Atrasado" },
        ],
        label: "Status",
        id: "status",
        isMultiSelect: false,
        width: "240px",
    },
] : []

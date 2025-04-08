import {
    renderDateTagCell,
    renderStatusTagCell,
} from "@/helpers/lista-nominal/renderCell";
import type { GridColDef } from "@mui/x-data-grid";
import { iconDetailsMap } from "./iconDetailsMap";

export const columns: GridColDef[] = [
    {
        field: "nome",
        headerName: "Nome",
        width: 260,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "cpf",
        headerName: "CPF",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "identificacao_condicao",
        headerName: "Identificação da Condição",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "dt_consulta_mais_recente",
        headerName: "Data da consulta mais recente",
        width: 180,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderDateTagCell(value, iconDetailsMap);
        },
    },
    {
        field: "prazo_proxima_consulta",
        headerName: "Prazo para próxima consulta",
        width: 180,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderStatusTagCell(value, iconDetailsMap);
        },
    },
    {
        field: "dt_afericao_pressao_mais_recente",
        headerName: "Data de aferição de PA mais recente",
        width: 200,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderDateTagCell(value, iconDetailsMap);
        },
    },
    {
        field: "prazo_proxima_afericao_pa",
        headerName: "Prazo para próx. aferição de PA",
        width: 200,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderStatusTagCell(value, iconDetailsMap);
        },
    },
    {
        field: "acs_nome_cadastro",
        headerName: "ACS responsável",
        width: 250,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "status",
        headerName: "Status",
        width: 150,
        headerAlign: "left",
        align: "left",
    },
] as GridColDef[];

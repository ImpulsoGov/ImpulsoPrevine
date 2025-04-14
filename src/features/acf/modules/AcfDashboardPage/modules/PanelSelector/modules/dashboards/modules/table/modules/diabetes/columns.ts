import {
    renderDateTagCell,
    renderStatusTagCell,
} from "@/helpers/lista-nominal/renderCell";
import type { GridColDef } from "@mui/x-data-grid";
import { iconDetailsMap } from "./iconDetailsMap";

export const diabetesColumns: GridColDef[] = [
    {
        field: "patientName",
        headerName: "Nome",
        width: 260,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "patientCpfOrBirthday",
        headerName: "CPF/Data de nascimento",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "conditionIndentifiedBy",
        headerName: "Tipo de diagnóstico",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "patientAge",
        headerName: "Idade (ano)",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "mostRecentAppointmentDate",
        headerName: "Data da última consulta",
        width: 180,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderDateTagCell(value, iconDetailsMap);
        },
    },
    {
        field: "nextAppointmentDueDate",
        headerName: "Prazo para próxima consulta",
        width: 180,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderStatusTagCell(value, iconDetailsMap);
        },
    },
    {
        field: "latestExamRequestDate",
        headerName: "Data da última solicitação de hemoglobina glicada",
        width: 200,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderDateTagCell(value, iconDetailsMap);
        },
    },
    {
        field: "hemoglobinTestDueDate",
        headerName: "Prazo p/ próxima solicitação de hemoglobina glicada",
        width: 200,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderStatusTagCell(value, iconDetailsMap);
        },
    },
    {
        field: "visitantCommunityHealthWorker",
        headerName: "Profissional responsável",
        width: 250,
        headerAlign: "left",
        align: "left",
    },
] as GridColDef[];

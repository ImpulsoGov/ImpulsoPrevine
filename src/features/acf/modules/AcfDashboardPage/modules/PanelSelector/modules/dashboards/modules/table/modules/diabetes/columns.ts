import {
    renderStatusTagCell,
} from "@/helpers/lista-nominal/renderCell";
import type { GridColDef } from "@mui/x-data-grid";
import { cpfOrBirthdayFormatter } from "./cpfOrBirthdayFormatter";
import { dateRenderCell } from "./dateFormatter";
import { iconDetailsMap } from "./iconDetailsMap";

export const diabetesColumns: GridColDef[] = [
    {
        field: "patientName",
        headerName: "Nome",
        width: 240,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "patientCpfOrBirthday",
        headerName: "CPF/Data de nascimento",
        width: 150,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return cpfOrBirthdayFormatter(value);
        },
    },
    {
        field: "conditionIndentifiedBy",
        headerName: "Tipo de diagnóstico",
        width: 160,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "patientAge",
        headerName: "Idade (ano)",
        width: 112,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "mostRecentAppointmentDate",
        headerName: "Data da última consulta",
        width: 164,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return dateRenderCell(value);
        },
    },
    {
        field: "nextAppointmentDueDate",
        headerName: "Prazo p/ próxima consulta",
        width: 181,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderStatusTagCell(value, iconDetailsMap);
        },
    },
    {
        field: "latestExamRequestDate",
        headerName: "Data da última solicitação de hemoglobina glicada",
        width: 205,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return dateRenderCell(value);
        },
    },
    {
        field: "hemoglobinTestDueDate",
        headerName: "Prazo p/ próxima solicitação de hemoglobina glicada",
        width: 196,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderStatusTagCell(value, iconDetailsMap);
        },
    },
    {
        field: "visitantCommunityHealthWorker",
        headerName: "Profissional responsável",
        width: 230,
        headerAlign: "left",
        align: "left",
    },
] as GridColDef[];

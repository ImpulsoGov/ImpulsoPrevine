import type { GridColDef } from "@mui/x-data-grid";
import { CpfOrBirthdayFormatter } from "./modules/CpfOrBirthdayFormatter";
import { DateRenderCell } from "./modules/DateRenderCell";
import { NameFormatter } from "./modules/NameFormatter";
import { RenderStatusTagCell } from "./modules/RenderStatusTagCell";

type IconDetails = {
    src: string;
    alt: string;
};

export type TagIconDetailsMap = Record<string, IconDetails>;

export const iconDetailsMap: TagIconDetailsMap = {
    danger: {
        src: "https://media.graphassets.com/TWH6Oby6QuTFyq0wH9QK",
        alt: "Ícone com símbolo da letra x",
    },
    warning: {
        src: "https://media.graphassets.com/o0OkjNboRCqy2bYrRNnb",
        alt: "Ícone de uma exclamação",
    },
    success: {
        src: "https://media.graphassets.com/4qKuRCxHSySL23zxLd9b",
        alt: "Ícone de uma marca de verificação",
    },
    pending: {
        src: "https://media.graphassets.com/IdqIxy4LQAeIZfe9hWZK",
        alt: "Ícone de uma ampulheta",
    },
};

export const coeqColumns: Array<GridColDef> = [
    {
        field: "patientName",
        headerName: "Nome",
        width: 240,
        headerAlign: "left",
        align: "left",
        renderCell: NameFormatter,
    },
    {
        field: "patientCpfOrBirthday",
        headerName: "CPF/Data de nascimento",
        width: 150,
        headerAlign: "left",
        align: "left",
        renderCell: CpfOrBirthdayFormatter,
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                CPF/Data de <br />
                nascimento
            </span>
        ),
    },
    {
        field: "conditionIdentifiedBy",
        width: 160,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Tipo de <br />
                diagnóstico
            </span>
        ),
    },
    {
        field: "patientAge",
        headerName: "Idade (anos)",
        width: 95,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "mostRecentAppointmentDate",
        width: 164,
        headerAlign: "left",
        align: "left",
        renderCell: DateRenderCell,
        renderHeader: () => (
            <span
                className="MuiDataGrid-columnHeaderTitle"
                style={{ marginRight: "10px" }}
            >
                Data da última
                <br />
                consulta
            </span>
        ),
    },
    {
        field: "nextAppointmentDueDate",
        width: 181,
        headerAlign: "left",
        align: "left",
        renderCell: RenderStatusTagCell,
        renderHeader: () => (
            <span
                className="MuiDataGrid-columnHeaderTitle"
                style={{ marginRight: "10px" }}
            >
                Prazo p/ próxima
                <br />
                consulta
            </span>
        ),
    },
    {
        field: "latestExamRequestDate",
        width: 205,
        headerAlign: "left",
        align: "left",
        renderCell: DateRenderCell,
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data da última
                <br />
                solicitação de
                <br />
                hemoglobina glicada
            </span>
        ),
    },
    {
        field: "hemoglobinTestDueDate",
        width: 196,
        headerAlign: "left",
        align: "left",
        renderCell: RenderStatusTagCell,
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Prazo p/ próxima
                <br />
                solicitação de
                <br />
                hemoglobina glicada
            </span>
        ),
    },
    {
        field: "visitantCommunityHealthWorker",
        headerName: "Profissional responsável",
        width: 230,
        headerAlign: "left",
        align: "left",
        renderCell: NameFormatter,
    },
] as Array<GridColDef>;

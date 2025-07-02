import type { GridColDef } from "@mui/x-data-grid";
import { NameFormatter } from "../common/NameFormatter";
import { CpfOrBirthdayFormatter } from "../common/CpfOrBirthdayFormatter";
import { DateRenderCell } from "../common/DateRenderCell";
import { RenderStatusTagCell } from "../common/RenderStatusTagCell";

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
        field: "communityHealthWorker",
        headerName: "Profissional responsável",
        width: 230,
        headerAlign: "left",
        align: "left",
        renderCell: NameFormatter,
    },
] as Array<GridColDef>;

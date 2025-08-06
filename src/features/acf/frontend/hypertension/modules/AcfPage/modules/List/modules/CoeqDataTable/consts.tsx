import type { GridColDef } from "@mui/x-data-grid";
// import { NameFormatter } from "../common/NameFormatter";
import { CpfOrBirthdayFormatter } from "../common/CpfOrBirthdayFormatter";
import { DateRenderCell } from "../common/DateRenderCell";

export const coeqColumns: Array<GridColDef> = [
    {
        field: "patientName",
        headerName: "Nome e CPF/CNS",
        width: 211,
        headerAlign: "left",
        align: "left",
        //TODO: Implementar funcao que une nome, cpf e cns
        // renderCell: NameFormatter,
    },
    {
        field: "latestAppointmentDate",
        width: 135,
        headerAlign: "left",
        align: "left",
        renderCell: CpfOrBirthdayFormatter,
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data última <br />
                consulta
            </span>
        ),
    },
    {
        field: "appointmentStatusByQuarter",
        width: 207,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que renderiza tags
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação consulta <br />
                em Q2
            </span>
        ),
    },
    {
        field: "latestExamRequestDate",
        width: 135,
        headerAlign: "left",
        align: "left",
        renderCell: DateRenderCell,
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data da última
                <br />
                aferição de PA
            </span>
        ),
    },
    {
        field: "latestExamRequestStatusByQuarter",
        width: 209,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que renderiza tags
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação aferição de
                <br />
                PA em Q2
            </span>
        ),
    },
    {
        field: "microAreaName",
        width: 144,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que checa valores nulos
        // renderCell: RenderStatusTagCell,
        headerName: "Microárea",
    },
    {
        field: "patientPhoneNumber",
        headerName: "Telefone",
        width: 136,
        headerAlign: "left",
        align: "left",
        // TODO: Implementar funcao que formata o telefone
        // renderCell: NameFormatter,
    },
    {
        field: "patientAge",
        headerName: "Idade",
        width: 103,
        headerAlign: "left",
        align: "left",
    },
] as Array<GridColDef>;

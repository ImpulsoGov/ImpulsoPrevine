import type { GridColDef } from "@mui/x-data-grid";
import { CpfOrBirthdayFormatter } from "../common/CpfOrBirthdayFormatter";
import { DateRenderCell } from "../common/DateRenderCell";

export const coapsColumns: Array<GridColDef> = [
    {
        field: "patientName",
        headerName: "Nome e CPF/CNS",
        width: 240,
        headerAlign: "left",
        align: "left",
        //TODO: Implementar funcao que une nome, cpf e cns
    },
    {
        field: "latestAppointmentDate",
        width: 150,
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
        width: 160,
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
        width: 164,
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
        width: 160,
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
        field: "careTeamName",
        width: 196,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que checa valores nulos
        headerName: "Equipe",
    },
    {
        field: "microAreaName",
        width: 196,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que checa valores nulos
        headerName: "Microárea",
    },
    {
        field: "patientPhoneNumber",
        headerName: "Telefone",
        width: 230,
        headerAlign: "left",
        align: "left",
        // TODO: Implementar funcao que formata o telefone
    },
    {
        field: "patientAge",
        headerName: "Idade",
        width: 230,
        headerAlign: "left",
        align: "left",
    },
] as Array<GridColDef>;

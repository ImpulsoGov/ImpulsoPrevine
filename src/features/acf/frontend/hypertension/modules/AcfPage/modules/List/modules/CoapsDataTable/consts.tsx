import type { GridColDef } from "@mui/x-data-grid";
import { RenderPatientNameCpfCns } from "../common/RenderPatientNameCpfCns";
import { RenderDate } from "../common/RenderDate/RenderDate";

export const coapsColumns: Array<GridColDef> = [
    // TODO: entender se precisamos lidar com a possibilidade de os campos cpf e cns não chegarem com o formato certo e como ficaria a ordenação desse campo no backend
    {
        field: "patientName",
        headerName: "Nome e CPF/CNS",
        width: 211,
        headerAlign: "left",
        align: "left",
        renderCell: RenderPatientNameCpfCns,
    },
    {
        field: "latestAppointmentDate",
        width: 135,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data última <br />
                consulta
            </span>
        ),
        renderCell: RenderDate,
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
        width: 156,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data da última
                <br />
                aferição de PA
            </span>
        ),
        renderCell: RenderDate,
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
        field: "careTeamName",
        width: 134,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que checa valores nulos
        headerName: "Equipe",
    },
    {
        field: "microAreaName",
        width: 144,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que checa valores nulos
        headerName: "Microárea",
    },
    {
        field: "patientPhoneNumber",
        headerName: "Telefone",
        width: 136,
        headerAlign: "left",
        align: "left",
        // TODO: Implementar funcao que formata o telefone
    },
    {
        field: "patientAge",
        headerName: "Idade",
        width: 103,
        headerAlign: "left",
        align: "left",
    },
] as Array<GridColDef>;
